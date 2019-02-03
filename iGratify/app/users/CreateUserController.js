/// <reference path="CreateUserService.js" />
/// <reference path="../../scripts/angular.min.js" />

var app = angular.module("CreateUserModule", []);
app.controller('CreateUserCtrl', ['$scope', 'CreateUserService', function ($scope, CreateUserService) {
    var vm = this;
    vm.GenderList = [];
    vm.selectedRow = null;
    vm.ProfessionList = [];
    vm.selectedProfession = null;
    vm.DomainList = [];
    vm.selectedDomain = null;
    vm.IndustryList = [];
    vm.selectedIndustry = null;
    vm.userid = null;
    vm.password = null;
    vm.email = null;
    vm.fullname = null;
    vm.phonenumber = null;
    vm.otp = null;
    vm.isDisabled = true;
    $scope.text = "Hello";

    CreateUserService.GetGender().then(function (row) {
        vm.GenderList = row.data;
        vm.selectedRow = row.data[0];
        vm.selectedGender = vm.selectedRow.code;
    });
    CreateUserService.GetProfession().then(function (row) {
        vm.ProfessionList = row.data;
        vm.selectedProfessionrow = row.data[0];
        vm.selectedProfession = vm.selectedProfessionrow.code;
    });
    CreateUserService.GetDomain().then(function (row) {
        vm.DomainList = row.data;
        vm.selectedDomainrow = row.data[0];
        vm.selectedDomain = vm.selectedDomainrow.code;
    });
    CreateUserService.GetEducation().then(function (row) {
        vm.IndustryList = row.data;
        vm.selectedIndustryrow = row.data[0];
        vm.selectedIndustry = vm.selectedIndustryrow.code;
    });

    vm.createuser = function () {
        var UserDetails = { uid: vm.userid, pwd: vm.password, fname: vm.fullname, email: vm.email, mno: vm.phonenumber, gender: vm.selectedGender, profession: vm.selectedProfession, domain: vm.selectedDomain, industry:vm.selectedIndustry }
        CreateUserService.SaveUserDetails(UserDetails).then(function (data) {
            vm.UserDetails = data;
            window.location.href = '../users/Login.html';
        });
    }

    vm.generateotp = function () {
        var input = { uid: vm.userid, email: vm.email, mno: vm.phonenumber }
        CreateUserService.GenerateOTP(input).then(function (data) {
            console.log(data);
        });
    }

    vm.validateOTP = function () {
        var input = { uid: vm.userid, email: vm.email, mno: vm.phonenumber, otp: vm.otp }
        CreateUserService.ValidateOTP(input).then(function (data) {
            if (data.data == vm.otp) {
                vm.isDisabled = false;
            }
        });

    }

}]);