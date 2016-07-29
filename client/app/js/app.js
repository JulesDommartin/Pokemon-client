(function(){
  'use strict';

  angular
    .module('pokemonApp', [
      'ngResource',
      'ngMaterial',
      'ngCookies',
      'ui.router',
      'config',
      'com.module.core',
      'com.module.pokemons',
      'com.module.entities'
    ])
    .config(['$compileProvider', function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    }]);
})();
