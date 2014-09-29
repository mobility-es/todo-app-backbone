/*global define*/
define([
    'underscore',
    'backbone',
    'collections/todos',
    'views/parts/form',
    'views/parts/list',
    'views/parts/info',
    'text!templates/page.ejs'
], function (_, Backbone, todos, FormView, ListView, InfoView, template) {
    'use strict';

    return Backbone.View.extend({
        template: _.template(template),

        render: function () {
            // Render layout
            this.$el.html(this.template());

            // Inject sub-views
            this.listView = new ListView({el: this.$('.js-list')});
            this.formView = new FormView({el: this.$('.js-form')});
            this.infoView = new InfoView({el: this.$('.js-info')});

            this.listView.render();
            this.formView.render();
            this.infoView.render();

            return this;
        },

        run: function (elConstainer) {
            var $container = $(elConstainer);

            if (!$container.length) {
                throw new Error('Application container must be specified');
            }

            // Init & render application
            this.render();

            // Append rendered App to the DOM
            this.$el.appendTo($container);

            // Request Data
            todos.fetch({reset: true});
        }
    });
});
