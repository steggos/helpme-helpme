angular
  .module('app.friends', [])
  .controller('FriendsController', FriendsController);

FriendsController.$inject = ['$scope', 'auth', 'Friend', '$timeout'];

function FriendsController($scope, auth, Friend, $timeout) {
  // User information from our MongoDB
  $scope.user = {};
  // Form input fields
  $scope.input = {};

  $scope.searchData = {};
  $scope.showSubmitted = false;
  $scope.isPending = false;

  $scope.searchFriend = function() {
    var input = { search: $scope.input.search };
    Friend.searchFriend($scope.profile.user_id, input)
      .then(function(data) {
        $scope.searchData.users = data;
      })
      .catch(function(error) {
        console.error(error);
      });
    $scope.input.search = '';
  };

  $scope.getFriends = function() {
    Friend.getFriends($scope.profile.user_id)
      .then(function(data) {
        $scope.user.friends = data;
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.addFriend = function(friend_id) {
    var friend = { friend_id: friend_id };
    Friend.addFriend($scope.profile.user_id, friend)
      .then(function(data) {
        $scope.showSubmitted=true;
        $timeout(function(){ $scope.showSubmitted=false;},3000);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.removeFriend = function(friend_id) {
    var friend = { friend_id: friend_id };
    Friend.removeFriend($scope.profile.user_id, friend)
      .then(function(data) {
        $scope.getFriends();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.getPendingReqs = function() {
    Friend.getPendingReqs($scope.profile.user_id)
      .then(function(data) {
        $scope.user.pending = data;
        if($scope.user.pending.length > 0) {
          $scope.isPending = true;
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.answerFriendReq = function(friend_id, answer) {
    if(answer === false) {
      $scope.removeFriend(friend_id);
    } else {
      var friend = { friend_id: friend_id };
      Friend.answerFriendReq($scope.profile.user_id, friend)
        .then(function(data) {
          $scope.getPendingReqs();
          $scope.getFriends();
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  };

  // Once auth0 profile info has been set, query our database for user's friends and pending friend requests.
  auth.profilePromise.then(function(profile) {
    $scope.profile = profile;
    $scope.getPendingReqs();
    $scope.getFriends();
  });

}