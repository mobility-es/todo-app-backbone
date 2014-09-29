/*global define*/
define([
    'underscore',
    'backbone',
    'backbone.localStorage',
    'models/todo'
], function (_, Backbone, LocalStorage, TODO) {
    'use strict';

    var TodoCollection = Backbone.Collection.extend({
        // Reference to this collection's model
        model: TODO,

        localStorage: new LocalStorage('todo.model.TODO'),

        // Filter down the list of all todo items that are finished
        completed: function () {
            return this.where({completed: true});
        },

        // Filter down the list to only todo items that are still not finished
        remaining: function () {
            return this.where({completed: false});
        },

        deleteCompleted: function () {
            _.invoke(this.completed(), 'destroy', {wait: true});
        }
    });

    return new TodoCollection();
});
