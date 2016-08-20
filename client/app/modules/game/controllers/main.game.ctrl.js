(function () {

  'use strict';

  angular
    .module('com.module.game')
    .controller('MainGameCtrl', function (me, $state, $scope, $rootScope, hotkeys) {
      console.log('On y est');
      console.log(me);
      this.me = me;

      var renderer = new PIXI.WebGLRenderer(800,600);

      console.log(renderer);

      $('.game-container').append(renderer.view);


      // You need to create a root container that will hold the scene you want to draw.
      var stage = new PIXI.Container();

      var vm = this;

      hotkeys.bindTo($scope)
          .add({
            combo: 'z',
            description: 'moving up',
            callback: function() {
              vm.map.position.y += 32;
            }
          })
          .add({
              combo: 'q',
              description: 'moving left',
              callback: function () {
                vm.map.position.x += 32;
              }
          })
          .add({
            combo: 'd',
            description: 'moving right',
            callback: function () {
                vm.map.position.x -= 32;
            }
          })
          .add({
            combo: 's',
            description: 'moving down',
            callback: function () {
              vm.map.position.y -= 32;
            }
          });

      PIXI.loader.add('map', 'assets/maps/map.png').load(function (loader, resources) {
          // This creates a texture from a 'bunny.png' image.
          vm.map = new PIXI.Sprite(resources.map.texture);

          // Setup the position and scale of the bunny
          vm.map.position.x = 0;
          vm.map.position.y = 0;

          vm.map.scale.x = 2;
          vm.map.scale.y = 2;

          // Add the bunny to the scene we are building.
          stage.addChild(vm.map);

          // kick off the animation loop (defined below)
          animate();
      });

      // load the texture we need

      PIXI.loader.add('bulbizarre', 'assets/first_generation/3.png').load(function (loader, resources) {

        vm.bulbizarre = new PIXI.Sprite(resources.bulbizarre.texture);
        vm.bulbizarre.position.x = 14 * 16;
        vm.bulbizarre.position.y = 13 * 16;
        vm.bulbizarre.scale.x = 0.5;
        vm.bulbizarre.scale.y = 0.5;

        stage.addChild(vm.bulbizarre);

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
