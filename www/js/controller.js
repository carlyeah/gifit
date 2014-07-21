/**
 * Created by eduardo_lopez on 17/07/2014.
 */
angular.module('starter.controllers', [])

    .controller('GridCtrl', function ($scope, $http, sharedProperties, $location, cacheList, lastSearch, $ionicLoading) {

        //
        // Controller variables
        //

        $scope.split_gifs = [];
        $scope.model = {};

        //$scope.gifKeyWords = "asdada";
       // var searchInput = $scope.gifKeyWords;

        //
        // Controller functions
        //

        $scope.searchGifs = function(){
            var query = encodeURIComponent($scope.model.code).replace(/%20/g,'+')
            $scope.getJSON(query);
        };

        $scope.doRefresh = function(){
            $scope.getJSON("iphone+5");
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.getJSON = function (query) {
            $ionicLoading.show({
               template: "Loading..."
            });

            $http({
                method: 'GET',
                url: "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=27",
                headers: {'Content-Type': 'application/json'}
            }).success(function (data) {
                //json of giphy contains an internal array called data

                $scope.split_gifs = $scope.splitArraysInMultipleArrays(data.data, 3);
                console.log($scope.split_gifs);
                cacheList.setProperty($scope.split_gifs);
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });

        };

        $scope.loadMore = function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.saveDetails = function (item) {
            sharedProperties.setProperty(item);
            $location.url("/detail/" + item.id);
        };

        $scope.splitArraysInMultipleArrays = function (array, numberOfSubArrays) {
            var out = [];
            while ( array.length > 0) {
                out.push(array.splice(0,numberOfSubArrays));
            }
            return out;
        };

        //
        //Real code
        //
        if(cacheList.getProperty() == "" || cacheList.getProperty() == undefined){
            console.log("no cache");
            $scope.getJSON("funny+cat");
        } else{
            console.log("exists cache");
            $scope.split_gifs = cacheList.getProperty();
        }

    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('DetailCtrl', function ($scope, sharedProperties) {
        $scope.gifVideoUrl = "";
        $scope.gifVideoHeight = "";
        $scope.gifVideoWidth = "";
        $scope.gifItem = sharedProperties.getProperty();

        $scope.gifVideoUrl = $scope.gifItem.images.original.mp4;
        $scope.gifVideoHeight = $scope.gifItem.images.original.height;
        $scope.gifVideoWidth = $scope.gifItem.images.original.width;
    });
