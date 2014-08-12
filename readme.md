
express-subapp
==============

Utility to wrap the properties from a master express app into any number of route based sub apps.

Usage
=====

Basic usage gives the ability to set up route-based sub applications:

    var express = require('express');
    var subApp = require('express-subapp')(
        function onCreate(app) {
            // optionally, set up the main application
        },
        
        function onSubApp(subApp, app) {
            // optionally, set up any other application
        }
    );
    
    // make and return an app
    var app = subApp.create(express());
    
    // attach paths as normal
    app.get('/path', routeHandler);
    
    // name a context root with a required in app.
    // module.exports for some-context.js should be an express app
    subApp.route('/some-context', require('./routes/some-context.js'));
    
    // alternatively don't set the root in the subApp, do it manually instead
    app.use('/context', subApp.route(require('./routes/context.js')));

More commonly, you would use the following properties to name the properties to copy from the main application
into the sub apps:

    var subApp = require('express-subapp')(onCreate, onSubApp);
    
    // add the names of any keys in the locals of the main application that should be added to the sub apps
    subApp.locals.push('some-key', 'another-key');
    
    // add the names of any 'app.get' properties in the main application to be set on the sub apps 
    subApp.locals.push('some-key', 'another-key');

License
=======

MIT, use it, play with it, fork it, make pull requests at will.

