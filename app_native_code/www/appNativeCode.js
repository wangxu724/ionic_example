var exec = require("cordova/exec");

module.exports = {
    /**
     * @name initialize
     * @param  {Function} success callback
     * @param  {Function} error callback
     *
     * @return {Promise}
     */
    initialize: function (success, error) {
        return execPromise(success, error, "AppNativeCodePlugin", "initialize", []);
    }
};

function execPromise(success, error, pluginName, method, args) {
    return new Promise(function (resolve, reject) {
        exec(function (result) {
                resolve(result);
                if (typeof success === "function") {
                    success(result);
                }
            },
            function (reason) {
                reject(reason);
                if (typeof error === "function") {
                    error(reason);
                }
            },
            pluginName,
            method,
            args);
    });
}
