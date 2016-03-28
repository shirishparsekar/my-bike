angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    
    // Form data for the login modal
    //$scope.loginData = {};

    // Create the login modal that we will use later
    //$ionicModal.fromTemplateUrl('templates/login.html', {
    //    scope: $scope
    //}).then(function (modal) {
    //    $scope.modal = modal;
    //});

    // Triggered in the login modal to close it
    //$scope.closeLogin = function () {
    //    $scope.modal.hide();
    //};

    // Open the login modal
    //$scope.login = function () {
    //    $scope.modal.show();
    //};

    // Perform the login action when the user submits the login form
    //$scope.doLogin = function () {
    //    console.log('Doing login', $scope.loginData);

    //    // Simulate a login delay. Remove this and replace with your login
    //    // code if using a login system
    //    $timeout(function () {
    //        $scope.closeLogin();
    //    }, 1000);
    //};
})

.controller('RecordsCtrl', function ($scope, localStorageService, $location, $anchorScroll, $ionicPopover) {
    $scope.petrol = null;
    $scope.meter = null;
    $scope.rate = null;
    $scope.editableField = "";
    $scope.records = localStorageService.get("mywheels_records");

    $scope.clearFields = function () {
        $scope.petrol = null;
        $scope.meter = null;
        $scope.rate = null;
    }

    var input_title_add_new_record = "Add new record";
    var input_title_edit_record = "Edit Record";
    $scope.inputTitle = input_title_add_new_record;
    $scope.input_edit_record = false;


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

    var switchInputToNewRecord = function () {
        $scope.editableField = null;
        $scope.input_edit_record = false;
        $scope.inputTitle = input_title_add_new_record;
        $scope.clearFields();
    }

    var switchInputToEditField = function () {
        //not yet implemented.. for now, code is in else part
    }

    $scope.editField = function ($event, index, petrol, meter, rate) {
        if ($scope.editableField === index) {
            switchInputToNewRecord();
        }
        else {
            switchInputToEditField();
            $scope.editableField = index;
            $scope.recordIndex = index;
            $scope.input_edit_record = true;
            $scope.inputTitle = input_title_edit_record + "    #" + (index + 1);
            $scope.petrol = petrol;
            $scope.meter = meter;
            $scope.rate = rate;
        }
    }

    $scope.updateRecord = function ($event, petrol, meter, rate) {
        $scope.input_edit_record = false;
        console.log("update called", petrol, meter, rate);

        $scope.records[$scope.recordIndex].petrol = petrol;
        $scope.records[$scope.recordIndex].meter = meter;
        $scope.records[$scope.recordIndex].rate = rate;

        setCache();
        //$scope.popover.remove($event);
        $scope.recordIndex = -1;
        $scope.clearFields();
        switchInputToNewRecord();
    }

    $scope.deleteRecord = function (index) {
        $scope.records.splice(index, 1);
        setCache();
        $location.hash('scrollElement');
        $anchorScroll();
    }

    angular.element(document).ready(function () {

        $scope.listHeight = {
            'height': (window.innerHeight - angular.element(inputBox)[0].offsetHeight - 30) + 'px',
            'bottom': angular.element(inputBox)[0].offsetHeight - 10 + 'px'
        }
        console.log($scope.listHeight);
        console.log(window.innerHeight);
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
    }

    $scope.getAverage = function () {
        var avg = 0;
        $scope.data.forEach(function (thisEntry) {
            avg += thisEntry.mileage;
        });
        return avg/$scope.data.length;
    }

    angular.element(document).ready(function () {
        $scope.listScrollHeight = {
            'height': window.innerHeight - angular.element(footerAnalytics)[0].offsetHeight - angular.element(listHeader)[0].offsetHeight - 44 + 'px',
        }
        console.log("innerHeight", window.innerHeight);
        console.log("footer height", angular.element(footerAnalytics)[0].offsetHeight);
        console.log("calculated list scroll height",$scope.listScrollHeight);
    });
})

.controller('InfoCtrl', function ($scope, localStorageService) {

    var data = localStorageService.get("mywheels_bikeinfo");

    if (data === null) {
        $scope.bikeInfo = [];
        $scope.noInfoFound = "No information yet stored";
    }
    else {
        $scope.bikeInfo = data;
        $scope.noInfoFound = null;
    }

})

.controller('EditInfoCtrl', function ($scope, localStorageService) {
    var records = localStorageService.get("mywheels_bikeinfo");

});

