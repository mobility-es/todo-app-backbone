/*global define*/
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        // Make the model compatible with AIQ Data Sync
        idAttribute: '_id',

        // Default attributes for the todo
        // and ensure that each todo created has `title` and `completed` keys
        defaults: {
            title: '',
            completed: false
        },

        // Toggle the `completed` state of this todo item
        toggle: function () {
            this.save({
                completed: !this.get('completed')
            }, {
                wait: true
            });
        }
    });
});
