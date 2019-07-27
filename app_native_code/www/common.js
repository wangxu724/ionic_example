var exec = require("cordova/exec");

module.exports = {
    execPromise: function (success, error, pluginName, method, args) {
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
}
