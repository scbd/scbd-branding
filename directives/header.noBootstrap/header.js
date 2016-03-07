
define(['app',
 'text!./header.html',
  'jquery',
  'css!/app/libs/scbd-branding/css/main',
  'css!./header',
  'scbd-angularjs-services/authentication',
  './account-icon',
  './locale',
  './accounts-validation',
  './login',
  './xuser-notifications',
  './xuser-notifications-icon',
  '../side-menu/scbd-side-menu',
  '../side-menu/scbd-menu-service'
],
function(app, template, $) {
     app.directive('scbdHeader', function() {
         return { restrict: 'E' ,
                  priority: 10, //parent has 0 priority
                  template: template,
                  scope: {
                       portalName: '@',
                  },
                  controller: ['$scope','$element', '$attrs','$window', '$location','authentication','$timeout','$log','scbdMenuService',
                  function($scope, $element, $attrs,$window, $location,authentication,$timeout,$log,scbdMenuService) {
                      if (window.innerWidth <= 600)
                        $scope.isXS = true;
                      authentication.getUser().then(function(u){
                    	     $scope.user = u;
                           $scope.toggleMenu=0;

                			});

                      $scope.portalName=$attrs.protalName;
                      $scope.cbdMenu=scbdMenuService.cbdMenu;
                      $scope.accMenu=scbdMenuService.accMenu;
                      $scope.localeMenu=scbdMenuService.localeMenu;
                      // $scope.toggleCbdMenu=scbdMenuService.toggle('cbd-menu',$scope);
                      // $scope.toggleNotMenu=scbdMenuService.toggle('notifications-menu',$scope);
                      // $scope.toggleLocaleMenu=scbdMenuService.toggle('locale-menu',$scope);
                      // //============================================================
                      // //
                      // //
                      // //============================================================
                      // function isOpenRight(navId){
                      //   return $mdSidenav(navId).isOpen();
                      // }
                      //
                      // //============================================================
                      // //
                      // //
                      // //============================================================
                      // function debounce(func, wait, context) {
                      //   var timer;
                      //   return function debounced() {
                      //     var context = $scope,
                      //         args = Array.prototype.slice.call(arguments);
                      //     $timeout.cancel(timer);
                      //     timer = $timeout(function() {
                      //       timer = undefined;
                      //       func.apply(context, args);
                      //     }, wait || 10);
                      //   };
                      // }
                      //
                      // //============================================================
                      // //
                      // //
                      // //============================================================
                      // function buildDelayedToggler(navID) {
                      //   return debounce(function() {
                      //     $mdSidenav(navID)
                      //       .toggle();
                      //   }, 200);
                      // }



                  }],//controller
        };//return
     });//directive
});