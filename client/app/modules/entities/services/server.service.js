(function () {
  'use strict';
  angular
    .module('com.module.entities')
    .service('ServerService', function (ENV, URLService, $location) {
      this.url = function () {
        return URLService.protocolize(ENV.apiUrl);
      };

      this.socketUrl = function () {
        var url = this.url().replace(/.*?:\/\//g, "");
        return "ws://" + url;
      };

    });

})();
