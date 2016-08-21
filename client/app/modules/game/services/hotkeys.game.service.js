(function () {

  'use strict';

  angular
    .module('com.module.game')
    .service('HotkeysGameService', function ($http, hotkeys, AnimationsGameService) {

      var vm = this;

      this.getAnimationsService = function () {
        return AnimationsGameService;
      };

      this.init = function (map, scope, controller) {
        this.map = map;
        this.scope = scope;
        this.controller = controller;
        $http.get('../assets/config/game.config.json')
          .then((res) => {
            this.key_config = res.data.hotkeys;
            this.loadMovingKeys(this.key_config.moving_keys, this.scope);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      this.loadMovingKeys = function (keys, scope) {
        if (!keys) {
          console.log("Keys undefined");
        } else {
          hotkeys.bindTo(scope)
              .add({
                combo: keys.move_up.key,
                description: keys.move_up.description,
                callback: () => {
                  if (!AnimationsGameService.is_moving) {
                    this.controller.removeStageChild(AnimationsGameService.animation);
                    AnimationsGameService.move('up', vm.map, 0, 1);
                    this.controller.addStageChild(AnimationsGameService.animation);
                  } else {
                    console.log("Alreay moving");
                  }
                }
              })
              .add({
                  combo: keys.move_left.key,
                  description: keys.move_left.description,
                  callback: () => {
                    if (!AnimationsGameService.is_moving) {
                      this.controller.removeStageChild(AnimationsGameService.animation);
                      AnimationsGameService.move('left', vm.map, 1, 0);
                      this.controller.addStageChild(AnimationsGameService.animation);
                    } else {
                      console.log("Alreay moving");
                    }
                  }
                })
              .add({
                combo: keys.move_right.key,
                description: keys.move_right.description,
                callback: () => {
                  if (!AnimationsGameService.is_moving) {
                    this.controller.removeStageChild(AnimationsGameService.animation);
                    AnimationsGameService.move('right', vm.map, -1, 0);
                    this.controller.addStageChild(AnimationsGameService.animation);
                  } else {
                    console.log("Alreay moving");
                  }
                }
              })
              .add({
                combo: keys.move_down.key,
                description: keys.move_down.description,
                callback: () => {
                  if (!AnimationsGameService.is_moving) {
                    this.controller.removeStageChild(AnimationsGameService.animation);
                    AnimationsGameService.move('down', vm.map, 0, -1);
                    this.controller.addStageChild(AnimationsGameService.animation);
                  } else {
                    console.log("Alreay moving");
                  }
                }
              });
        }
      };

    });

}) ();
