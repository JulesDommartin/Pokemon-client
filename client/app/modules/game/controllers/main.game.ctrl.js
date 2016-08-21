(function () {

  'use strict';

  angular
    .module('com.module.game')
    .controller('MainGameCtrl', function (me, $state, $scope, $rootScope, MainGameService) {

      this.me = me;

      var renderer = new PIXI.WebGLRenderer(800,600);

      $('.game-container').append(renderer.view);

      var vm = this;

      MainGameService.init($scope, this);

      this.animate = function () {

          requestAnimationFrame(vm.animate);

          renderer.render(MainGameService.getStage());
      };

      this.animate();

      this.updateStage = function (stage) {
        MainGameService.stage = stage;
      };

      this.addStageChild = function (child) {
        MainGameService.stage.addChild(child);
      };

      this.removeStageChild = function (child) {
        MainGameService.stage.removeChild(child);
      };

    });

}) ();
