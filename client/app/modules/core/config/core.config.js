(function() {

  'use strict';

  angular
    .module('com.module.core')
    .run(function ($rootScope) {

      $rootScope.menu = [];

      $rootScope.addMenu = function (name, uisref, icon) {
        $rootScope.menu.push({
          name: name,
          sref: uisref,
          icon: icon,
        });
      };

      $rootScope.addMenu('Home', 'app.home', 'fa-home');

      //Routing Debug
      // $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
      //     console.log('Starting to leave %s to go to %s', oldUrl, newUrl);
      // });

    });

})();
