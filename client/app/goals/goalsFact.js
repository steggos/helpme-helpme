angular
.module('app.goals')
.factory('Goals', Goals);

// Dependency injection. Done this way for minification purposes.
Goals.$inject = ['$http'];

function Goals($http) {
  return {
    // GETs list of goals from our MongoDB
    getGoals: function (userId) {
      return $http({
        method: 'GET',
        url: '/api/goals/' + userId,
      })
      .then(function (res) {
        return res.data;
      });
    },

    // POSTs new goal to our MongoDB
    addGoal: function (userId, goal) {
      return $http({
        method: 'POST',
        url: '/api/goals/' + userId,
        data: goal,
      })
      .then(function (res) {
        return res.data;
      });
    },
  };
}
