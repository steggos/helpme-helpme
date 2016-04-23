angular
  .module('app.goals', [])
  .controller('GoalsController', GoalsController);

// Dependency injection. Done this way for minification purposes.
// See https://docs.angularjs.org/tutorial/step_05 for more info on minification.
GoalsController.$inject = ['$scope', 'auth', 'Goals'];

function GoalsController($scope, auth, Goals) {
  // User information from our MongoDB
  $scope.user = {};

  // Form input fields
  $scope.input = {};

  // Retrieves the data for the user's goal(s)
  $scope.getGoals = function () {
    Goals.getGoals($scope.profile.user_id)
      .then(function (goals) {
        $scope.user.goals = goals;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Add a goal to the user's set of goals
  $scope.addGoal = function () {
    // Check to be sure the goal has a title
    if ($scope.input.title) {
      var goal = {
        title: $scope.input.title,
        description: $scope.input.description,
        category: $scope.input.category,
        due_date: $scope.input.due_date,
      };
      Goals.addGoal($scope.profile.user_id, goal)
        .then(function (data) {
          // Reset input fields to blank
          $scope.input.title = '';
          $scope.input.description = '';
          $scope.input.category = '';

          // Refresh goals
          $scope.getGoals();
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  $scope.getCatagories = function () {
    Goals.getCatagories()
      .then(function (data) {
        $scope.categories = data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Watches for changes on the category drop down
  // Makes get request based on category choosen
  $scope.$watch('input.category', function () {
    if ($scope.input.category) {
      $scope.getGuides($scope.input.category);
    }
  });

  $scope.getGuides = function (category) {
    // Goals.getGuides(category)
    //   .then(function (guides) {
    //     $scope.guides = guides;
    //     console.log($scope.guides);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  };

  // Once auth0 profile info has been set, query our database for user's goals
  auth.profilePromise.then(function (profile) {
    $scope.profile = profile;
    $scope.getGoals();
  });

  $scope.getCatagories();
}
