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

    getCatagories: function () {
      // return [
      //     'Diet',
      //     'Paleo',
      //     'Weight Loss',
      //     'Fitness',
      //     'Workout',
      //     'Calisthenics',
      //   ];

      return $http({
        method: 'GET',
        url: '/api/categories',
      })
      .then(function (res) {
        console.log(res);
        return res.data;
      });
    },

    getGuides: function (category) {
      return {
        plans: [
          {
            name: 'Paleo Restart',
            category: ['Diet', 'Paleo', 'Weight Loss'],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=9&txt=100%C3%97130&w=100&h=130',
            file: 'file:///Users/OggimusPrime/Downloads/Visual-Impact-FBB.pdf',
          },
          {
            name: 'Paleo Restart',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            category: ['Diet', 'Paleo', 'Weight Loss'],
            thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=9&txt=100%C3%97130&w=100&h=130',
            file: 'file:///Users/OggimusPrime/Downloads/Visual-Impact-FBB.pdf',
          },
          {
            name: '30 Day to get Fit',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            category: ['Fitness', 'Workout', 'Calisthenics'],
            thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=9&txt=100%C3%97130&w=100&h=130',
            file: 'file:///Users/OggimusPrime/Downloads/Visual-Impact-FBB.pdf',
          },
        ],
      };

      // TODO: Replace once data is in the system
      // return $http({
      //   method: 'GET',
      //   url: '/api/guides/' + category,
      // })
      // .then(function (res) {
      //   console.log('Data');
      //   return res.data;
      // });
    },
  };
}
