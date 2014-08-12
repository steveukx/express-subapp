(function () {

    var baseApp, onCreate, onAppend;

    module.exports = function (_onCreate, _onAppend) {
        onCreate = _onCreate;
        onAppend = _onAppend;
    };

    module.exports.merged = ['view engine', 'views'];

    module.exports.create = function (app) {
        baseApp = app;
        onCreate && onCreate(app);
        onAppend && onAppend(app);

        return app;
    };

    module.exports.append = function(app, root) {

        module.exports.merged.forEach(function (merged) {
            var baseAppValue = baseApp.get(merged);
            if (baseAppValue !== undefined) {
                app.set(merged, baseAppValue);
            }
        });

        onAppend && onAppend(app);

        if (arguments.length > 1) {
            baseApp.use(root, app);
        }

        return app;
    };

}());
