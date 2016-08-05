(function () {

  'use strict';

  angular
  .module('com.module.users')
  .controller('LoginCtrl', function($scope, $state, $location, AppAuth, UserService, notify) {

    this.close = false;
    $('.spinner').css('display', 'none');

    $scope.user = {
      pseudo : "",
      password : "",
      rememberMe : false
    }

    $scope.schema = [
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
        property: 'password',
        placeholder: 'Mot de passe',
        type: 'password',
        attr: {
          required: true
        }
      },
      {
        property: 'rememberMe',
        label: 'Rester connecté',
        type: 'checkbox',
        layout: {
          labelSize: 6
         }
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

    AppAuth.login({})
    .then(function (user) {
      if (user !== null) {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        if (next === '/login') {
          next = '/';
        }
        $location.path(next);
      }
    })
    .catch(function(err) {
      if(err.status == 401 || err.status == 500) {
        AppAuth.logout();
      }
    });


    this.closePokeball = () => {
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
      this.movePokeball();
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
      var elem = $('#login-box');
      // this.animateRotate(15, elem);
      this.close = false;
    };

    this.animateRotate = function (d, duration, elem){

      $({deg: 0}).animate({deg: d}, {
        duration: duration,
        step: function(now){
          elem.css({
            transform: "rotate(" + now + "deg)"
          });
        }
      });
    }

    this.movePokeball = function() {
      var elem = $('#login-box');
      this.animateRotate(22, 200, elem);
      setTimeout(() => {
        this.animateRotate(-22, 200, elem);
      }, 400);
      setTimeout(() => {
        this.animateRotate(0, 200, elem);
      }, 800);
      setTimeout(() => {
        this.animateRotate(22, 200, elem);
      }, 1200);
      setTimeout(() => {
        this.animateRotate(-22, 200, elem);
      }, 1600);
      setTimeout(() => {
        this.animateRotate(0, 200, elem);
      }, 2000);
    }

    $scope.login = () => {
      this.closePokeball();
      setTimeout(() => {
        UserService.login($scope.user)
          .then((res) => {
            $state.go('app.home');
          })
          .catch((err) => {
            this.openPokeball();
            console.log(err.data); 
            notify({
              classes: ['alert-warning'],
              message: err.data.message,
              duration: 2000
            });
          });
      },
      2000);
    };

    $scope.register = () => {
      $state.go('register');
    };

  });

})();