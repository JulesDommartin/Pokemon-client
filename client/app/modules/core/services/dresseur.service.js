(function () {

	'use strict';

	angular
		.module('com.module.core')
		.service('DresseurService', function (Dresseur) {

			this.update = function (dresseur) {
				return Dresseur.update({pseudo: dresseur.pseudo},dresseur).$promise;
			};

			this.updateTeam = function (pseudo, team) {
				return Dresseur.update({pseudo: pseudo}, {equipePokemons : team}).$promise;
			};

		});

})();