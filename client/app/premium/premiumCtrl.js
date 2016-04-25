angular.module('app.premium', [])
.controller('PremiumController', PremiumController);
// Dependency injection. Done this way for minification purposes.
PremiumController.$inject = ['$scope', 'auth', 'Premium', 'Goals', '$uibModal'];

function PremiumController($scope, auth, Premium, Goals, $uibModal) {
  // User information from our MongoDB
  $scope.guides = [];
  $scope.user = {};

  $scope.getGuides = function() {
    Premium.getGuides()
      .then(function(guides) {
        $scope.guides = guides;
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.getGoals = function() {
    Goals.getGoals($scope.profile.user_id)
    .then(function(goals) {
      $scope.user.goals = goals;
    })
    .catch(function(error) {
      console.error(error);
    })
  };

  $scope.getDataMax = function(goal) {
    var oneDay = 24*60*60*1000 // hours*minutes*seconds*milliseconds
    var createdAt = new Date();
    if (goal.posts.length > 1) {
      createdAt = new Date(goal.posts[0].createdAt);
    }
    var currentDate = new Date();
    var elapsedDays = Math.ceil((currentDate.getTime() - createdAt.getTime()) / oneDay) || 1;
    console.log(elapsedDays);
    return elapsedDays;
  };

  // Once auth0 profile info has been set, query our database for guides.
  auth.profilePromise.then(function(profile) {
    $scope.profile = profile;
    $scope.getGuides();
    $scope.getGoals();
  });

  //Modal
  $scope.open = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl'
    });
  };
}

angular.module('app.premium').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, Premium) {

  $scope.stripeCallback = function (code, result) {
    if (result.error) {
      console.error(result.error.message);
    } else {
      Premium.sendToken(result);
      $scope.ok();
    }
  };
  //closes modal
  $scope.ok = function () {
    $uibModalInstance.close();
  };
  //cancels and closes modal
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
