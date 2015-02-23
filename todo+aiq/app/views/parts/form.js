/*global define*/
define([
    'underscore',
    'backbone',
    'collections/todos',
    'text!templates/form.ejs'
], function (_, Backbone, todos, template) {
    'use strict';

    return Backbone.View.extend({
        template: _.template(template),

        events: {
            'submit form': 'submit'
        },

        render: function () {
            this.$el.html(this.template());

            // Cache jQuery object
            this.$input = this.$('input[name="todo"]');

            return this;
        },

        submit: function (e) {
            e.preventDefault();

            var val = this.$input.val().trim();

            // Ignore empty todos
            if (val) {
                // Send request to the platform and wait for the response
                todos.create({title: val, createAt: Date.now()}, {wait: true});
                // Reset input field
                this.$input.val('');
            }
        }
    });
});
