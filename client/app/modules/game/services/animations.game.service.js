(function () {

  'use strict';

  angular
    .module('com.module.game')
    .service('AnimationsGameService', function ($http) {

      this.is_moving = false;
      this.walk = true; // TO MAKE DIFFERENCE BETWEEN WALK AND BIKE
      this.movement = 0;

      $http.get('../assets/config/movements.config.json')
        .then((res) => {
          this.movements_config = res.data.movements;
        })
        .catch((err) => {
          console.log(err);
        });

      this.initAnimation = function (sprites) {
        var frames = [];
        for (var i = 0; i < sprites.length; i++) {
          var sprite = new PIXI.Texture.fromFrame(sprites[i]);
          frames.push(sprite);
        }
        this.animation = new PIXI.extras.MovieClip(frames);
        this.animation.position.x = 12 * 32;
        this.animation.position.y = 9 * 32;
        this.animation.scale.x = 2;
        this.animation.scale.y = 2;
        this.animation.animationSpeed = 0.1;
      };

      this.setAnimation = function (string) {
        switch (string) {
          case "move_up":
            this.initAnimation(this.movements_config.move_up);
            break;
          case "move_left":

          break;
          case "move_right":

            break;
          case "move_down":
            this.initAnimation(this.movements_config.move_down);
            break;
          default:
            console.log("Bad string for setAnimation");
        }
      };

      this.move_up = function (map, sprite) {
        this.setAnimation('move_up');
        this.animation.play();
        this.move_map(map, 0, -1);
      };

      this.move_left = function (map, sprite) {
        map.position.x += 32;
      };

      this.move_right = function (map, sprite) {
        map.position.x -= 32;
      };

      this.move_down = function (map, sprite) {
        this.setAnimation('move_down');
        this.animation.play();

        // if (this.movement <= 32) {
        //   this.is_moving = true;
        //   map.position.y -= 1;
        //   this.movement ++;
        // } else {
        //   this.movement = 0;
        //   this.is_moving = false;
        // }
      };

      this.move_map = function (map, deltaX, deltaY) {
        if (deltaY == -1) {
          
        }
      };

    });

}) ();
