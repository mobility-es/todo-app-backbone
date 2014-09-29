define([
    'fastclick',
    'views/app'
], function (FastClick, App) {
    'use strict';

    // Make it touch-friendly
    FastClick.attach(document.body);

    Backbone.history.start();

    var app = new App();
    // Use <body> as a container of an App
    app.run('body');
});
