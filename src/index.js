(function () {


    module.exports = function (onCreate, onAppend) {
        var baseApp, api;

        return api = {
            /**
             * Array of properties to be copied from main app to sub app
             */
            merged: ['view engine', 'views'],

            /**
             * Array of properties to be copied from main app to sub app locals
             */
            locals: [],

            /**
             * Register the main express application, the source of merged/locals properties
             *
             * @param app
             */
            create: function (app) {
                baseApp = app;
                onCreate && onCreate(app);
                onAppend && onAppend(app);

                return app;
            },

            /**
             * Register a sub application, when the root is supplied the app is also bound to the main app.
             *
             * @param {string} [root]
             * @param app
             */
            route: function(root, app) {
                if (arguments.length === 1) {
                    app = root;
                    root = null;
                }

                api.merged.forEach(function (merged) {
                    var baseAppValue = baseApp.get(merged);
                    if (baseAppValue !== undefined) {
                        app.set(merged, baseAppValue);
                    }
                });

                api.locals.forEach(function (local) {
                    app.locals[local] = baseApp.locals[local];
                });

                onAppend && onAppend(app, baseApp);

                if (root > 1) {
                    baseApp.use(root, app);
                }

                return app;
            }
        };
    };

}());
