/*global define*/
define([
    'underscore',
    'backbone',
    'collections/todos',
    'text!templates/info.ejs'
], function (_, Backbone, todos, template) {
    'use strict';

    return Backbone.View.extend({
        template: _.template(template),

        events: {
            'click .js-clear': 'deleteCompleted'
        },

        initialize: function () {
            // Re-render statistic on Collection change
            this.listenTo(todos, 'reset add remove change', this.render);
        },

        render: function () {
            this.$el.html(this.template({
                numLeft: todos.remaining().length,
                numCompleted: todos.completed().length
            }));

            return this;
        },

        deleteCompleted: function (e) {
            e.preventDefault();
            todos.deleteCompleted();
        }
    });
});
