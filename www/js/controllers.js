angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('RecordsCtrl', function ($scope, localStorageService, $location, $anchorScroll, $ionicPopover) {
    $scope.petrol = "";
    $scope.meter = "";
    $scope.rate = "";
    $scope.editableField = "";
    $scope.records = localStorageService.get("mywheels_records");

    $scope.petrolEdit = "";
    $scope.meterEdit = "";
    $scope.rateEdit = "";
    if ($scope.records === null) {
        $scope.records = [];
    }
    //angular.element(recordList).scrollTo('#scrollElement');

    $location.hash('scrollElement');

    // call $anchorScroll()
    $anchorScroll();

    $scope.newRecord = function (petrol, meter, rate) {
        $scope.records.push({
            "petrol": petrol,
            "meter": meter,
            "rate": rate
        });

        setCache();
        $location.hash('scrollElement');
        //$scope.$apply();
        $anchorScroll();
    }

    var setCache = function () {
        localStorageService.set("mywheels_records", $scope.records);
    }

    $scope.editField = function ($event, index, petrol, meter, rate) {
        $scope.petrolEdit = petrol;
        $scope.meterEdit = meter;
        $scope.rateEdit = rate;
        $scope.recordIndex = index;

        $ionicPopover.fromTemplateUrl("popover", {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
            $scope.popover.show($event);
        });
    }

    $scope.updateRecord = function ($event, petrol, meter, rate) {

        console.log("update called", petrol, meter, rate);

        $scope.records[$scope.recordIndex].petrol = petrol;
        $scope.records[$scope.recordIndex].meter = meter;
        $scope.records[$scope.recordIndex].rate = rate;

        setCache();

        $scope.popover.remove($event);
        $scope.recordIndex = -1;
    }


    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });

    angular.element(document).ready(function () {
        $scope.listHeight = {
            'height': (window.innerHeight - angular.element(inputBox)[0].offsetHeight - 50) + 'px',
            'bottom': angular.element(inputBox)[0].offsetHeight + 'px'
        }
    });

})


.controller('AnalyticsCtrl', function ($scope, localStorageService) {
    var records = localStorageService.get("mywheels_records");
    $scope.data = [];

    if (records === null) {
        records = [];
    }

    for (var i = 0; i < records.length - 1; i++) {
        var distance = records[i + 1].meter - records[i].meter;
        var petrolInLiter = records[i].petrol / records[i].rate;

        $scope.data.push({
            "petrol": petrolInLiter,
            "distance": distance,
            "mileage": distance / petrolInLiter
        });

        console.log($scope.data);

    }
});
