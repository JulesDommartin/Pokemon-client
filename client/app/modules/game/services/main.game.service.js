(function () {

  'use strict';

  angular
    .module('com.module.game')
    .service('MainGameService', function (HotkeysGameService) {

      this.init = function (scope, controller) {

        this.scope = scope;
        this.controller = controller;
        this.stage = new PIXI.Container();
        this.loadAssets();

      };

      this.getStage = function () {
        return this.stage;
      };

      this.loadAssets = function () {

        var spriteLoader = new PIXI.loaders.Loader('assets/images/caracters/');
        var mapsLoader = new PIXI.loaders.Loader('assets/images/maps');

        mapsLoader.add('map1', 'map.png');
        mapsLoader.on('complete', () => {
          spriteLoader.add('caracter_sprites', 'sprites.json');
          spriteLoader.on('complete', () => {
            this.initLevel();
          });
          spriteLoader.load();
        });
        mapsLoader.load();

      };

      this.initMap = function (id, posX, posY) {
        var mapTexture = new PIXI.Texture.fromImage(id);
        var map = new PIXI.Sprite.fromImage('assets/images/maps/map.png');

        map.position.x = posX;
        map.position.y = posY;

        map.scale.x = 2;
        map.scale.y = 2;

        this.current_map = map;

        this.stage.addChild(map);

      };

      this.initLevel = function () {

        this.initMap("map1", 0, 0);
        HotkeysGameService.init(this.current_map, this.scope, this.controller);
        HotkeysGameService.getAnimationsService().setAnimation('move_up');
        this.stage.addChild(HotkeysGameService.getAnimationsService().animation);
        console.log(this.stage);
      };

    });

}) ();
