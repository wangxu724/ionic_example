
module.exports = {
    TransitionType: {
        ENTER: 1,
        EXIT: 2,
        BOTH: 3,
    },

    /**
     * Initializing geofence plugin
     *
     * @name initialize
     * @param  {Function} success callback
     * @param  {Function} error callback
     *
     * @return {Promise}
     */
    initialize: function (success, error) {
        return window.AppNativeCodeCommon.execPromise(success, error, "GeofencePlugin", "initialize", []);
    },
    /**
     * Adding new geofence to monitor.
     * Geofence could override the previously one with the same id.
     *
     * @name addOrUpdate
     * @param {Geofence|Array} geofences
     * @param {Function} success callback
     * @param {Function} error callback
     *
     * @return {Promise}
     */
    addOrUpdate: function (geofences, success, error) {
        if (!Array.isArray(geofences)) {
            geofences = [geofences];
        }
        geofences.forEach(coerceProperties);

        if (cordova.platformId === "ios") {
            let promises = geofences.map(function (geofence) {
                return window.AppNativeCodeCommon.execPromise(null, null, "GeofencePlugin", "addOrUpdate", [geofence]);
            });

            return Promise
                .all(promises)
                .then(function (results) {
                    if (typeof success === "function") {
                        success(results);
                    }
                    return results;
                })
                .catch(function (reason) {
                    if (typeof error === "function") {
                        error(reason);
                    }
                    throw reason;
                });
        } else {
            return window.AppNativeCodeCommon.execPromise(success, error, "GeofencePlugin", "addOrUpdate", geofences);
        }
    },
    /**
     * Removing geofences with given ids
     *
     * @name  remove
     * @param  {Number|Array} ids
     * @param  {Function} success callback
     * @param  {Function} error callback
     * @return {Promise}
     */
    remove: function (ids, success, error) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        return window.AppNativeCodeCommon.execPromise(success, error, "GeofencePlugin", "remove", ids);
    },
    /**
     * removing all stored geofences on the device
     *
     * @name  removeAll
     * @param  {Function} success callback
     * @param  {Function} error callback
     * @return {Promise}
     */
    removeAll: function (success, error) {
        return window.AppNativeCodeCommon.execPromise(success, error, "GeofencePlugin", "removeAll", []);
    },
    /**
     * Getting all watched geofences from the device
     *
     * @name  getWatched
     * @param  {Function} success callback
     * @param  {Function} error callback
     * @return {Promise} if successful returns geofences array stringify to JSON
     */
    getWatched: function (success, error) {
        return window.AppNativeCodeCommon.execPromise(success, error, "GeofencePlugin", "getWatched", []);
    },
};

function coerceProperties(geofence) {
    if (geofence.id) {
        geofence.id = geofence.id.toString();
    } else {
        throw new Error("Geofence id is not provided");
    }

    if (geofence.latitude) {
        geofence.latitude = coerceNumber("Geofence latitude", geofence.latitude);
    } else {
        throw new Error("Geofence latitude is not provided");
    }

    if (geofence.longitude) {
        geofence.longitude = coerceNumber("Geofence longitude", geofence.longitude);
    } else {
        throw new Error("Geofence longitude is not provided");
    }

    if (geofence.radius) {
        geofence.radius = coerceNumber("Geofence radius", geofence.radius);
    } else {
        throw new Error("Geofence radius is not provided");
    }

    if (geofence.transitionType) {
        geofence.transitionType = coerceNumber("Geofence transitionType", geofence.transitionType);
    } else {
        throw new Error("Geofence transitionType is not provided");
    }
}

function coerceNumber(name, value) {
    if (typeof(value) !== "number") {
        console.warn(name + " is not a number, trying to convert to number");
        value = Number(value);

        if (isNaN(value)) {
            throw new Error("Cannot convert " + name + " to number");
        }
    }

    return value;
}

// function execPromise (success, error, pluginName, method, args) {
//     return new Promise(function (resolve, reject) {
//         exec(function (result) {
//                 resolve(result);
//                 if (typeof success === "function") {
//                     success(result);
//                 }
//             },
//             function (reason) {
//                 reject(reason);
//                 if (typeof error === "function") {
//                     error(reason);
//                 }
//             },
//             pluginName,
//             method,
//             args);
//     });
// }