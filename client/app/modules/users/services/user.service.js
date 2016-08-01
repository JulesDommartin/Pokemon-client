(function () {

	'use strict';

	angular
		.module('com.module.users')
		.service('UserService', function (User, AppAuth, $q) {

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
			}

		});

})();