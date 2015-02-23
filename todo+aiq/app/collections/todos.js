/*global define*/
define([
    'underscore',
    'backbone',
    'backbone.aiq-datasync',
    'models/todo'
], function (_, Backbone, DataSyncCollection, TODO) {
    'use strict';

    var TodoCollection = DataSyncCollection.extend({
        // Save all of the todo items under the `"todo.model.TODO"` document type
        type: 'todo.model.TODO',

        // Reference to this collection's model
        model: TODO,

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
        },

        comparator: 'createdAt'
    });

    return new TodoCollection();
});
