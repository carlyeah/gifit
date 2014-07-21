/**
 * Created by eduardo_lopez on 14/07/2014.
 */
angular.module('starter.services', [])


    .service('sharedProperties', function () {
        var property = '';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        };
    })

    .service('lastSearch', function () {
        var property = '';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        };
    })

    .service('cacheList', function () {
        var property = '';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        };
    });
