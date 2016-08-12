(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('GetURLService', function (Url) {

      console.log('quoi');

      this.requestUrl = function (url) {
        return Url.request({
          url: url
        }).$promise;
      };

    });

})();
