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
        this.animation.position.y = 9 * 32 + 16;
        this.animation.scale.x = 2;
        this.animation.scale.y = 2;
        this.animation.animationSpeed = 0.3;
      };

      this.setAnimation = function (string) {
        switch (string) {
          case "up":
            this.initAnimation(this.movements_config.move_up);
            break;
          case "left":
            this.initAnimation(this.movements_config.move_left);
          break;
          case "right":
            this.initAnimation(this.movements_config.move_right);
            break;
          case "down":
            this.initAnimation(this.movements_config.move_down);
            break;
          default:
            console.log("Bad string for setAnimation");
        }
      };

      this.move = function (direction, map, deltaX, deltaY) {
        this.setAnimation(direction);
        this.animation.play();
        this.current_moving_index = 0;
        this.is_moving = true;
        this.move_map(map, deltaX, deltaY);
      };

      this.move_map = function (map, deltaX, deltaY) {
        if (this.current_moving_index < 16) {
          map.position.x += deltaX * 2;
          map.position.y += deltaY * 2;
          this.current_moving_index++;
          setTimeout(() => {
            this.move_map(map, deltaX, deltaY);
          }, 10);
        } else {
          this.current_moving_index = 0;
          this.is_moving = false;
          this.animation.gotoAndStop(0);
        }
      };

    });

}) ();
