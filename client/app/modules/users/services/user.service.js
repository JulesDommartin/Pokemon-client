(function () {

	'use strict';

	angular
		.module('com.module.users')
		.service('UserService', function (User, PokemonDresseur, AppAuth, $q) {

			this.getExistantUser = function (user) {
				return User.findExistant(user).$promise;
			};

			this.login = function (user) {
				var userInstance = {
					pseudo : user.pseudo,
					password : user.password,
					rememberMe : user.rememberMe
				};
				return $q((resolve, reject) => {
					AppAuth.login(userInstance)
						.then((res) => {
							resolve(res);
						})
						.catch((err) => {
							reject(err);
						});
				});
			};

			this.register = function (user) {
				return User.register(user).$promise;
			};

			this.me = function() {
				return User.me().$promise;
			};

			this.existPseudo = function (pseudo) {
				return $q((resolve, reject) => {
					User.findExistantPseudo({
						pseudo: pseudo
					}).$promise
						.then((data) => {
							console.log(data);
							resolve(data.message);
						})
						.catch((err) => {
							console.log(err);
							reject(err);
						});
				});
			};

		});

})();