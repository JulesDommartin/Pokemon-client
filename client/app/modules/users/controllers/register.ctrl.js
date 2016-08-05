(function () {

  'use strict';

  angular
  .module('com.module.users')
  .controller('RegisterCtrl', function($scope, $state, $location, AppAuth, UserService, notify) {

    this.registerError = null;

    this.close = false;
    $('.spinner').css('display', 'none');
    $('#validRegistration').css('display', 'none');

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
          required: true,
          ngMinlength: 4
        },
      },
      {
        label: '',
        property: 'pseudo',
        placeholder: 'Pseudo',
        type: 'text',
        attr: {
          ngMinlength: 4,
          required: true,
          validatePseudo: 'user.pseudo'
        },
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
          required: true,
          ngMinlength: 6
        },
      },
      {
        property: 'confirmPassword',
        label: '',
        placeholder: 'Confirme le mot de passe',
        type: 'password',
        attr : {
          confirmPassword : 'user.password',
          required: true,
          ngMinlength: 6
        }
      }
    ];

    $scope.options = {
      validation: {
        enabled: true,
        showMessages: true
      },
      layout: {
        type: 'basic',
        labelSize: 3,
        inputSize: 9
      }
    };


    this.closePokeball = () => {
      $('.alert-warning').effect('fade', null, 200, () => {
        $('.alert-warning').hide();
      });
      $('.body').animate({'height':'35px'}, {duration: 400});
      $('#login-box').animate({'width': '18%'}, {duration: 400});
      $('.form').effect('fade', null, 200, () => {
        $('.form').hide();
      });
      $('.body').css('padding','0px');
      $('.loading').css('display', 'block');
      $('.header').find('h3').effect('fade', null, 200, function () {
         $(this).css('visibility','hidden');
      });
      $('.footer').find('.row').each(function() {
        $(this).effect('fade', null, 200, function () {
         $(this).css('visibility','hidden');
        });
      });
      this.close = true;
    };

    this.openPokeball = () => {
      $('.loading').css('display','none');
      $('.body').css('padding','20px');
      $('.form').fadeIn(400, function () {
        $(this).show();
      });
      $('#login-box').animate({'width':'30%'}, {duration: 400});
      $('.body').animate({'height': '100%'}, {duration: 400});
      $('.header').find('h3').fadeIn(200, function () {
        $(this).css('visibility','visible');
      });
      $('.footer').find('.row').each(function () {
        $(this).fadeIn(200, function () {
          $(this).css('visibility','visible');
        });
      });
      $('.alert-warning').fadeIn(200, () => {
        $('.alert-warning').show();
      });
      var elem = $('#login-box');
      // this.animateRotate(15, elem);
      this.close = false;
    };

    this.openPokeballRegistered = () => {
      $('.loading').css('display', 'none');
      $('.body').animate({'height': '100%'}, {duration: 400});
      $('#validRegistration').css('display','inline-block');
      $('#validRegistration').fadeIn(200, function () {
        $(this).show();
      });
    };

    AppAuth.getUser()
      .then((user) => {
        $scope.currentUser = user;
        $state.go('app.home');
      });

    $scope.login = () => {
      $state.go('login');
    };

    $scope.loginNow = () => {
      AppAuth.login($scope.user)
        .then((res) => {
          $state.go('app.home');
        })
        .catch((err) => {
          $scope.registerError = {message: "An error occured : " + err};
        });
    }

    $scope.register = () => {
      var form = $('form');
      if (!form.attr('class').includes('ng-invalid')) {
        console.log($scope.user);
        this.closePokeball();
        setTimeout(() => {
          UserService.register($scope.user)
            .then((res) => {
              console.log(res);
              this.openPokeballRegistered();
            })
            .catch((err) => {
              console.log(err.data);
              $scope.registerError = {message : err.data.msg};
              this.openPokeball();
            });
        }, 2000);
      } else {
        console.log("incomplete");
        $scope.registerError = {message : "Le formulaire n'est pas rempli correctement"};
      }
    };

  })
  .directive('confirmPassword', [function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        var validate = function (viewValue) {
          var password = scope.$eval(attrs.confirmPassword);
          ngModel.$setValidity('match', ngModel.$isEmpty(viewValue) || viewValue == password);
          return viewValue;
        };
        ngModel.$parsers.push(validate);
        scope.$watch(attrs.confirmPassword, function(value){
          validate(ngModel.$viewValue);
        });
      }
    };
  }]);

})();