(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('URLService', function ($location) {
      this.domain = function() {
        var host, domain;
        host = $location.host();
        domain = host;
        if(host != "localhost") {
          domain = host.split(".");
          domain = domain[domain.length-2] + "." + domain[domain.length-1];
        }

        return domain;
      };

      this.protocolize = function (url) {
        if(url.indexOf("http") === 0) {
          return url;
        }

        return $location.protocol() + "://" + url;
      };

    });

})();
