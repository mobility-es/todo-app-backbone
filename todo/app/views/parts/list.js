/*global define*/
define([
    'underscore',
    'backbone',
    'collections/todos',
    'text!templates/list.ejs',
    'text!templates/item.ejs'
], function (_, Backbone, todos, template, itemTemplate) {
    'use strict';

    return Backbone.View.extend({
        template: _.template(template),
        itemTemplate: _.template(itemTemplate),

        events: {
            'click li': 'toggleComplete'
        },

        initialize: function () {
            // Update DOM on Collection changes
            this.listenTo(todos, 'add', this.addOne);
            this.listenTo(todos, 'change', this.updateOne);
            this.listenTo(todos, 'remove', this.removeOne);

            // Re-render view only for Collection 'reset'
            // to prevent losing of scroll's position on Data changes
            this.listenTo(todos, 'reset', this.render);
        },

        render: function () {

            this.$el.html(this.template({
                itemsHTML: todos.map(this.getItemHtml, this).join('')
            }));

            // Cache jQuery object
            this.$list = this.$('ul');

            return this;
        },

        getItemHtml: function (model) {
            return this.itemTemplate({item: model});
        },

        findElementById: function (id) {
            return this.$list.find('[data-id="' + id + '"]');
        },

        addOne: function (model) {
            if (!this.$list.length) {
                this.render();
            } else {
                this.$list.append(this.getItemHtml(model));
            }
        },

        removeOne: function (model) {
            var $el = this.findElementById(model.id);

            // Add removing animation and wait until it is finished then remove DOM element
            $el.addClass('removed').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
                $el.remove();
            });
        },

        updateOne: function (model) {
            this.findElementById(model.id)
                .toggleClass('completed', model.get('completed'));
        },

        toggleComplete: function (e) {
            var id = $(e.currentTarget).data('id');
            todos.get(id).toggle();
        }
    });
});
