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
      'autofields',
      'cgNotify',
      'config',
      'com.module.entities',
      'com.module.core',
      'com.module.capture',
      'com.module.moves',
      'com.module.pokemons',
      'com.module.users'
    ])
    .config(['$compileProvider', function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    }]);
})();
