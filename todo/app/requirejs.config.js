/*global requirejs*/
requirejs.config({
    //urlArgs: "_=" + (new Date()).getTime(), // Prevent caching
    baseUrl: 'app',
    deps: ['bootstrap'],
    paths: {
        'fastclick': '../libs/fastclick',
        'text': '../libs/require.text',
        'jquery': '../libs/jquery',
        'backbone': '../libs/backbone',
        'backbone.localStorage': '../libs/backbone.localStorage',
        'underscore': '../libs/lodash'
    },
    shim: {
        'backbone': ['jquery', 'underscore']
    }
});
