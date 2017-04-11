var app = angular.module("myApp", []);

app.controller('mainController', function($scope, $http) {
	 $scope.showDetailedView = false;
   $http.get('https://www.reddit.com/r/pics/.json?jsonp=') //Reddit API call
       .then(function(resp){
          $scope.imageThumbnails = resp.data.data.children;
        });
    $scope.showDetailedImageView = function(imgObj) {
      // var utcSeconds = imgObj.data.created_utc;
      // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      // d.setUTCSeconds(utcSeconds);
      // imgObj.data.created_utc = d;
      console.log("ddd",imgObj)
      var comments_link = imgObj.data.permalink;

      getComments(comments_link);
      $scope.showDetailedView = true;
      $scope.clickedImageDetails = imgObj; 
    }

    $scope.backToHome = function() {
      $scope.showDetailedView = false;
    }

    function getComments (permalink) {
        $http.get('https://www.reddit.com/'+permalink+'.json?jsonp=') //Reddit API call
       .then(function(resp){

          $scope.comments = resp.data[1].data.children;
          console.log($scope.comments);
        });
    }
});