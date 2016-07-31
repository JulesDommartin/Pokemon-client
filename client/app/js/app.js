(function(){
  'use strict';

  angular
    .module('pokemonApp', [
      'ngResource',
      'ngMaterial',
      'ngCookies',
      'ui.router',
      'formly',
      'formlyBootstrap',
      'config',
      'com.module.core',
      'com.module.entities',
      'com.module.pokemons',
      'com.module.users'
    ])
    .config(['$compileProvider', function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    }]);
})();
