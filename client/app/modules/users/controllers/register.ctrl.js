(function () {

  'use strict';

  angular
  .module('com.module.users')
  .controller('RegisterCtrl', function($scope, $state, $location, AppAuth, UserService, notify) {

    this.close = false;
    $('.spinner').css('display', 'none');

    $scope.user = {
      email: "",
      pseudo : "",
      firstName : "",
      lastName : "",
      password : "",
      confirmPassword : "",
    }

    $scope.schema = [
      {
        label: '',
        property: 'email',
        placeholder: 'Email',
        type: 'email',
        attr: {
          required: true
        }
      },
      {
        label: '',
        property: 'pseudo',
        placeholder: 'Pseudo',
        type: 'text',
        attr: {
          required: true
        }
      },
      {
        label: '',
        property: 'firstName',
        placeholder: 'Prénom',
        type: 'text'
      },
      {
        label: '',
        property: 'lastName',
        placeholder: 'Nom'
      },
      {
        label: '',
        property: 'password',
        placeholder: 'Mot de passe',
        type: 'password',
        attr: {
          required: true
        }
      },
      {
        property: 'confirmPassword',
        label: '',
        placeholder: 'Confirme le mot de passe',
        type: 'password'
      }
    ];

    $scope.options = {
      validation: {
        enabled: true,
        showMessages: false
      },
      layout: {
        type: 'basic',
        labelSize: 3,
        inputSize: 9
      }
    };

    AppAuth.getUser()
      .then((user) => {
        $scope.currentUser = user;
        $state.go('app.home');
      });

    $scope.login = () => {
      $state.go('login');
    };

    $scope.register = () => {
      console.log($scope.user);
    };

  });

})();