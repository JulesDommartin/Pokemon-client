(function () {

  'use strict';

  angular
    .module('com.module.game')
    .controller('MainGameCtrl', function (me, $state, $scope, $rootScope) {
      console.log('On y est');
      console.log(me);
      this.me = me;

      var renderer = new PIXI.WebGLRenderer(800,600);

      console.log(renderer);

      $('.game-container').append(renderer.view);


      // You need to create a root container that will hold the scene you want to draw.
      var stage = new PIXI.Container();

      var vm = this;

      // load the texture we need
      PIXI.loader.add('bulbizarre', 'assets/first_generation/1.png').load(function (loader, resources) {
          // This creates a texture from a 'bunny.png' image.
          vm.bulbizarre = new PIXI.Sprite(resources.bulbizarre.texture);

          // Setup the position and scale of the bunny
          vm.bulbizarre.position.x = 400;
          vm.bulbizarre.position.y = 300;

          vm.bulbizarre.scale.x = 2;
          vm.bulbizarre.scale.y = 2;

          // Add the bunny to the scene we are building.
          stage.addChild(vm.bulbizarre);

          // kick off the animation loop (defined below)
          animate();
      });

      function animate() {
          // start the timer for the next animation loop
          requestAnimationFrame(animate);

          // each frame we spin the bunny around a bit
          // vm.bulbizarre.position.x++;

          // this is the main render call that makes pixi draw your container and its children.
          renderer.render(stage);
      }

    });

}) ();
