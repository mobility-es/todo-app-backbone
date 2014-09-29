/*global define*/
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    return Backbone.Collection.extend({
        _createHandler: function(options, deferred, success) {
            return function(data) {
                var method = success ? 'success' : 'error';
                if (options[method]) {
                    options[method](data);
                }
                if (options.complete) {
                    options.complete(data);
                }
                if (deferred) {
                    deferred[success ? 'resolve' : 'reject'](data);
                }
            };
        },

        _bindAIQEvents: function() {
            var me = this;
            var update = function(id) {
                // Request relevat document
                aiq.datasync.getDocument(id, {
                    success: function(document) {
                        // Update the existing model or create a new one
                        // depending on the presence of the document in
                        // the collection
                        me.add(document, { merge: true });
                    }
                });
            };

            aiq.datasync.bind('document-created', {
                _type: this.type,
                callback: update
            });
            aiq.datasync.bind('document-updated', {
                _type: this.type,
                callback: update
            });
            aiq.datasync.bind('document-deleted', {
                _type: this.type,
                callback: this.remove.bind(this)
            });
        },

        _read: function(model, options) {
            if (model.id) {
                aiq.datasync.getDocument(model.id, options);
            } else {
                aiq.datasync.getDocuments(this.type, options);
            }
        },

        _create: function(model, options) {
            aiq.datasync.createDocument(this.type, model.attributes, options);
        },

        _update: function(model, options) {
            aiq.datasync.updateDocument(model.id, model.attributes, options);
        },

        _delete: function(model, options) {
            if (! model.isNew()) {
                aiq.datasync.deleteDocument(model.id, options);
            }
        },
        
        initialize: function() {
            if (! this.type) {
                throw new Error('Type not specified');
            }

            _.extend(this.model.prototype, {
                sync: this.sync.bind(this)
            });

            Backbone.Collection.prototype.initialize.apply(this, arguments);

            this._bindAIQEvents();
        },

        // Redefine existing Sync
        sync: function(method, model, options) {
            options = options || {};

            var deferred = Backbone.$.Deferred && Backbone.$.Deferred();

            this['_' + method](model, {
                success: this._createHandler(options, deferred, true),
                failure: this._createHandler(options, deferred, false)
            });

            // Send a notification that the request was sent
            model.trigger('request', model, deferred, options);

            // Use promises if they are available
            return deferred && deferred.promise();
        }
    });
});
