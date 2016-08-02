(function (){

  'use strict';

  angular
    .module('com.module.moves')
    .controller('ListMovesCtrl', function ($cookies, moves, MoveService) {

      // $cookies.remove('current_move');

      if ($cookies.get('current_move') === undefined) {
        this.currentMove = 101;
      } else {
        this.currentMove = $cookies.get('current_move');
      }

      this.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      this.moves = moves;
      this.missingMoves = [];
      
      // this.move = {
      //   id: null,
      //   generation: null,
      //   names: [],
      //   pp: null,
      //   description: "",
      //   accuracy: null,
      //   power: null,
      //   min_hits: null,
      //   max_hits: null,
      //   category: ""
      // };

      this.createMoveFromAPI = function (obj) {
        let move = {
          id: null,
          generation: null,
          names: {},
          pp: null,
          description: "",
          accuracy: null,
          power: null,
          min_hits: null,
          max_hits: null,
          category: ""
        };
        move.id = obj.id;

        if (obj.generation && obj.generation.url) {
          var url = obj.generation.url;
          var splittedUrl = url.split("/");
          var generation = splittedUrl[splittedUrl.length-2];
          move.generation = parseInt(generation);
        } else {
          move.generation = 1;
        }

        for (var i = 0; i < obj.names.length; i++) {
          if (obj.names[i].language.name == "en") {
            move.names.en = obj.names[i].name;
          } else if (obj.names[i].language.name == "fr") {
            move.names.fr = obj.names[i].name;
          }
        };

        move.pp = obj.pp;

        for (var i = 0; i < obj.flavor_text_entries.length; i++) {
          if (obj.flavor_text_entries[i].language.name == "fr") {
            move.description = obj.flavor_text_entries[i].flavor_text;
            break;
          }
        }

        move.accuracy = obj.accuracy ? obj.accuracy : 0;
        move.power = obj.power ? obj.power : 0;
        move.min_hits = obj.min_hits ? obj.min_hits : 1;
        move.max_hits = obj.max_hits ? obj.max_hits : 1;

        move.category = obj.damage_class.name;

        console.log(move);

        MoveService.insert(move)
          .then((data) => {
            console.log(move.name + " inséré dans la base ! ");
          })
          .catch((err) => {
            console.log(err);
          });
      };

      this.findFromAPI = function (number) {
        MoveService.findFromAPI(number)
          .then((data) => {
            this.createMoveFromAPI(data.data);
          })
          .catch((err) => {
            if (err.data !== null && typeof err.data === 'object') {
              this.createMoveFromAPI(err.data);
          }
        });
      };

      this.chercherMoveSuivant = function (id) {
        console.log("On cherche : " + id);
        this.findFromAPI(id);
        $cookies.remove('current_move');
        var nextId = parseInt(id) + 1;
        $cookies.put('current_move', nextId);
        setTimeout(() => { location.reload(); }, 3000);
      };

    });

})();
