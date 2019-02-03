var app = angular.module('app', ['kendo.directives',
    'bento.modern',
    'ui.bootstrap',
    'pageslide-directive',
    'vcstax.authInterceptor',
    'vcstax.components',
    'vcstax.panel-navigation-button',
    'vcstax.bill-summary',
    'vcstax.wizard',
    'vcstax.wizard-step-header',
    'vcstax.report',
    "vcstax.aboutpage",
    'vcstax.bento-wizard',
    'vcstax.side-panel-navigation',
    'vcstax.feature-action-bar',
    'ui.router',
    'wj',
    'bento.d3']);

angular.module("vcstax.authInterceptor", [])
    .factory("authInterceptor",
        function ($q, $location, $rootScope) {
            return {
                'request': function (config) {
                    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('tokenKey');
                    return config;
                },

                'responseError': function (response) {
                    if (response.status === 401 || response.status === 400) {
                        console.log('Response Error', response);
                        localStorage.removeItem('tokenKey');
                        localStorage.removeItem('loggedInUserName');
                        localStorage.removeItem('loggedInUserId');
                        localStorage.removeItem('loggedInStatusId');
                        localStorage.removeItem('registerNumber');
                        localStorage.removeItem('effectiveDate');
                        $rootScope.$broadcast('authentication-logout');
                        $location.path("/login");
                        return $q.reject(response);
                    }
                }
            }
        });

app.run(["$rootScope", '$location', function ($rootScope, $location) {

    $rootScope.$on('$stateChangeStart',
        function (ev, to, toParams, from, fromParams) {
            var token = localStorage.getItem('tokenKey');

            if (token === null) {
                $location.path("login");
            }

        });

    $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
            //console.log(event);
            //console.log(toState);
            //console.log(toParams);
            //console.log(fromState);
            //console.log(fromParams);
            //console.log(error);
        });

    $rootScope.$on('$stateNotFound',
        function (event, unfoundState, fromState, fromParams) {
            //console.log(event);
            //console.log(unfoundState);
            //console.log(fromState);
            //console.log(fromParams);
        });
}]);

$(function () {
    FastClick.attach(document.body);
});

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.interceptors.push('authInterceptor');

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '/app/home.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/app/login/login.html'
            })
            //.state('collections',
            //    {
            //        url: '/collections',
            //        templateUrl: '/app/collections/collections.html'
            //    })
            //.state('collections.payments',
            //    {
            //        url: '/payments',
            //        templateUrl: '/app/collections/payments/payments.html'
            //    })
            //.state('collections.accountinfo',
            //    {
            //        url: '/accountinfo',
            //        templateUrl: '/app/collections/accountinfo/accountinfo.html',
            //        controller: 'AccountInfoController'
            //    })
            //.state('collections.comments',
            //    {
            //        url: '/comments',
            //        templateUrl: '/app/collections/comments/comments.html',
            //        controller: 'CommentsController'
            //    })
            //.state('collections.detailbalance',
            //    {
            //        url: '/detailbalance',
            //        templateUrl: '/app/collections/detailbalance/detailbalance.html',
            //        controller: 'DetailBalanceController'
            //    })
            //.state('collections.mobilehome',
            //    {
            //        url: '/mobilehome',
            //        templateUrl: '/app/collections/mobilehome/mobilehome.html',
            //        controller: 'MobileHomeController'
            //    })
            //.state('collections.status',
            //    {
            //        url: '/status',
            //        templateUrl: '/app/collections/status/status.html',
            //        controller: 'StatusController'
            //    })
            //.state('collections.timber',
            //    {
            //        url: '/timber',
            //        templateUrl: '/app/collections/timber/timber.html',
            //        controller: 'TimberController'
            //    })
            //.state('collections.transactions',
            //    {
            //        url: '/transactions',
            //        templateUrl: '/app/collections/transactions/transactions.html',
            //        controller: 'TransactionsController'
            //    })
            //.state('collections.unpaidamount',
            //    {
            //        url: '/unpaidamount',
            //        templateUrl: '/app/collections/unpaidamount/unpaidamount.html',
            //        controller: 'UnpaidAmountController'
            //    })
            .state('collections.nod',
                {
                    url: '/nod',
                    templateUrl: '/app/collections/nod/nod.html'
                })
            .state('adjustments',
                {
                    url: '/adjustments',
                    templateUrl: '/app/collections/collections.html'
                })
            .state('adjustments.accountinfo',
                {
                    url: '/accountinfo',
                    templateUrl: '/app/collections/accountinfo/accountinfo.html',
                    controller: 'AccountInfoController'
                })
            .state('adjustments.status',
                {
                    url: '/status',
                    templateUrl: '/app/collections/status/status.html',
                    controller: 'StatusController'
                })
            .state('adjustments.comments',
                {
                    url: '/comments',
                    templateUrl: '/app/collections/comments/comments.html',
                    controller: 'CommentsController'
                })
            .state('adjustments.other',
                {
                    url: '/other',
                    templateUrl: '/app/collections/other/other.html',
                    controller: 'OtherController'
                })
            .state('adjustments.exempts',
                {
                    url: '/exempts',
                    templateUrl: '/app/collections/exempts/exempts.html',
                    controller: 'ExemptsController'
                })
            .state('adjustments.specialtax',
                {
                    url: '/specialtax',
                    templateUrl: '/app/collections/specialtax/specialtax.html',
                    controller: 'SpecialTaxController'
                })
            .state('adjustments.bankrupt',
                {
                    url: '/bankrupt',
                    templateUrl: '/app/collections/bankrupt/bankrupt.html',
                    controller: 'BankruptController'
                })
            .state('adjustments.transactions',
                {
                    url: '/transactions',
                    templateUrl: '/app/collections/transactions/transactions.html',
                    controller: 'TransactionsController'
                })
            .state('adjustments.mortgage',
                {
                    url: '/mortgage',
                    templateUrl: '/app/collections/mortgage/mortgage.html',
                    controller: 'MortgageController'
                })
            .state('adjustments.paid',
                {
                    url: '/paid',
                    templateUrl: '/app/collections/paid/paid.html',
                    controller: 'PaidController'
                })
            .state('adjustments.billdetail',
                {
                    url: '/billdetail',
                    templateUrl: '/app/collections/billdetail/billdetail.html',
                    controller: 'BillDetailController'
                })
            //.state('mortgageprocessing.taxbillexport',
            //{
            //    url: '/taxbillexport',
            //    templateUrl: '/app/mortgage_processing/TaxBillExport.html',
            //    controller: 'TaxBillExportController'
            //})
            .state('/mortgageprocessing/taxbillexport',
                {
                    cache: false,
                    url: '/mortgageprocessing/taxbillexport',
                    templateUrl: '/app/mortgage_processing/mortgage.html',
                    controller: 'MortgageProcessingController',
                    tabId: 0
                })
            .state('/mortgageprocessing/paymentprocessing',
                {
                    cache: false,
                    url: '/mortgageprocessing/paymentprocessing',
                    templateUrl: '/app/mortgage_processing/mortgage.html',
                    controller: 'MortgageProcessingController',
                    tabId: 2
                })
            .state('/mortgageprocessing/requestprocessing',
                {
                    cache: false,
                    url: '/mortgageprocessing/requestprocessing',
                    templateUrl: '/app/mortgage_processing/mortgage.html',
                    controller: 'MortgageProcessingController',
                    tabId: 1
                })
            .state('/mortgageprocessing/manualprocessing',
                {
                    cache: false,
                    url: '/mortgageprocessing/manualprocessing',
                    templateUrl: '/app/mortgage_processing/mortgage.html',
                    controller: 'MortgageProcessingController',
                    tabId: 3
                })
            .state('adjustments.associatedfiles',
                {
                    url: '/associatedfiles',
                    templateUrl: '/app/collections/associatedfiles/associatedfiles.html',
                    controller: 'AssociatedFilesController'
                })
            .state('registerreconciliation',
                {
                    url: '/registerreconciliation',
                    templateUrl: '/app/registerreconciliation/registerreconciliation.html'
                })
            .state('applylatefee',
                {
                    url: '/applylatefee',
                    templateUrl: '/app/delinquentprocessing/applylatefee/applylatefee.html'
                })
            .state('delinquentprocessing',
                {
                    url: '/delinquentprocessing',
                    templateUrl: '/app/delinquentprocessing/delinquent-processing.html'
                })
            .state('annualconfiguration',
                {
                    url: '/annualconfiguration',
                    templateUrl: '/app/settings/configuration/annual_configuration/AnnualConfiguration.html'
                })
            .state('annualdefault',
                {
                    url: '/annualdefault',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/annual_default/AnnualDefault.html'
                })
            .state('billnumber',
                {
                    url: '/billnumber',
                    templateUrl: '/app/settings/configuration/annual_configuration/bill_number/BillNumber.html'
                })
            .state('commissionrates',
                {
                    url: '/commissionrates',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/commission_rates/commissionrates.html'
                })
            .state('consolidationsheetprtvalues',
                {
                    url: '/consolidationsheetprtvalues',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/consolidation_sheet_prt_values/consolidationsheetprtvalues.html'
                })
            .state('decalnumbers',
                {
                    url: '/decalnumbers',
                    templateUrl: '/app/settings/configuration/annual_configuration/decal_numbers/decalnumbers.html'
                })
            .state('distributionmethod',
                {
                    url: '/distributionmethod',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/distribution_method/distributionmethod.html'
                })
            .state('districttaxacctxref',
                {
                    url: '/districttaxacctxref',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/district_tax_acct_xref/districttaxacctxref.html'
                })
            .state('exemptionamounts',
                {
                    url: '/exemptionamounts',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/exemption_amounts/exemptionamounts.html'
                })
            .state('taxbillspecialexemptionamounts',
                {
                    url: '/taxbillspecialexemptionamounts',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/tax_bill_special_exemption_amounts/taxbillspecialexemptionamounts.html'
                })
            .state('taxbillspecialtaxamounts',
                {
                    url: '/taxbillspecialtaxamounts',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/tax_bill_special_tax_amounts/taxbillspecialtaxamounts.html'
                })
            .state('exemptionexceptions',
                {
                    url: '/exemptionexceptions',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/exemption_exceptions/exemptionexceptions.html'
                })
            .state('latefeeamounts',
                {
                    url: '/latefeeamounts',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/late_fee_amounts/latefeeamounts.html'
                })
            .state('latefeeinterest',
                {
                    url: '/latefeeinterest',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/late_fee_interest/latefeeinterest.html'
                })
            .state('latefeepenalty',
                {
                    url: '/latefeepenalty',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/late_fee_penalty/latefeepenalty.html'
                })
            .state('mortgageaccounts',
                {
                    url: '/mortgageaccounts',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/mortgage_accounts/mortgageaccounts.html'
                })
            .state('taxaccountrates',
                {
                    url: '/taxaccountrates',
                    templateUrl:
                        '/app/settings/configuration/annual_configuration/tax_account_rates/TaxAccountRates.html'
                })
            .state('systemconfiguration',
                {
                    url: '/systemconfiguration',
                    templateUrl: '/app/settings/configuration/system_configuration/SystemConfiguration.html'
                })
            .state('batchtypes',
                {
                    url: '/batchtypes',
                    templateUrl: '/app/settings/configuration/system_configuration/batch_types/BatchTypes.html'
                })
            .state('batchofficers',
                {
                    url: '/batchofficers',
                    templateUrl: '/app/settings/configuration/system_configuration/batch_officers/BatchOfficers.html'
                })
            .state('countymaster',
                {
                    url: '/countymaster',
                    templateUrl: '/app/settings/configuration/system_configuration/county_master/CountyMaster.html'
                })
            .state('disbursementaccounts',
                {
                    url: '/disbursementaccounts',
                    templateUrl: '/app/settings/configuration/system_configuration/disbursement_accounts/DisbursementAccounts.html'
                })
            .state('districtpropertytypexref',
                {
                    url: '/districtpropertytypexref',
                    templateUrl: '/app/settings/configuration/system_configuration/district_property_type_xref/DistrictPropertyTypeXREF.html'
                })
            .state('districts',
                {
                    url: '/districts',
                    templateUrl: '/app/settings/configuration/system_configuration/districts/Districts.html'
                })
            .state('exemptions',
                {
                    url: '/exemptions',
                    templateUrl: '/app/settings/configuration/system_configuration/exemptions/Exemptions.html'
                })
            .state('propertystrata',
                {
                    url: '/propertystrata',
                    templateUrl: '/app/settings/configuration/system_configuration/property_strata/PropertyStrata.html'
                })
            .state('propertytypes',
                {
                    url: '/propertytypes',
                    templateUrl: '/app/settings/configuration/system_configuration/property_types/PropertyTypes.html'
                })
            .state('registers',
                {
                    url: '/registers',
                    templateUrl: '/app/settings/configuration/system_configuration/registers/Registers.html'
                })
            .state('tablessetup',
                {
                    url: '/tablessetup',
                    templateUrl: '/app/settings/configuration/system_configuration/tables_setup/TablesSetup.html'
                })
            .state('taxaccounts',
                {
                    url: '/taxaccounts',
                    templateUrl: '/app/settings/configuration/system_configuration/tax_accounts/TaxAccounts.html'
                })
            .state('realdigestprocessing',
                {
                    url: '/realdigestprocessing',
                    templateUrl: '/app/digest_processing/real/digestprocessing.html'
                })
            .state('mobilehomedigestprocessing',
                {
                    cache: false,
                    url: '/mobilehomedigestprocessing',
                    templateUrl: '/app/digest_processing/mobilehome/mobilehomeprocessing.html'
                })
            .state('reports',
                {
                    url: '/reports/reportcriteria',
                    templateUrl: '/app/reports/reportcriteria.html'
                })
            .state('assessorchangeordersprocessing',
                {
                    cache: false,
                    url: '/assessorchangeordersprocessing',
                    templateUrl: '/app/assessor_change_order/changeorderprocessing.html'
                })
            //.state('useraccounts',
            //    {
            //        cache: false,
            //        url: '/useraccounts',
            //        templateUrl: '/app/settings/users/useraccounts.html'
            //    })

            .state('manageprofile',
                {
                    cache: false,
                    url: '/manageprofile',
                    templateUrl: '/app/settings/users/manage_profile/ManageProfile.html'
                })
            .state('useraccounts',
                {
                    cache: false,
                    url: '/useraccounts',
                    templateUrl: '/app/settings/users/useraccounts_manager/useraccountsmanager.html'
                })
            .state('userroles',
                {
                    cache: false,
                    url: '/userroles',
                    templateUrl: '/app/settings/users/roles_manager/rolesmanager.html'
                })
            .state('texteditor',
                {
                    cache: false,
                    url: '/texteditor',
                    templateUrl: '/app/settings/configuration/text_editor/texteditor.html'
                })
            .state('releasenotes',
                {
                    cache: false,
                    url: '/releasenotes',
                    templateUrl: '/app/settings/about/releasenotes.html'
                })
            .state("aboutvcstax",
                {
                    cache: false,
                    url: "/settings/aboutvcstax",
                    templateUrl: "/app/settings/about/aboutvcstax.html"
                })
            .state('mailprocessing',
                {
                    cache: false,
                    url: '/mailprocessing',
                    templateUrl: '/app/mail_processing/mailprocessing.html'
                })
            .state('mailtransaction',
                {
                    cache: false,
                    url: '/mailtransaction',
                    templateUrl: '/app/mail_processing/mailtransaction.html'
                })
            .state('UserStatusManager',
                {
                    cache: false,
                    url: '/UserStatusManager',
                    templateUrl: '/app/mail_processing/UserStatusManager.html'
                })
            .state('collections',
                {
                    url: '/collections',
                    templateUrl: '/app/collection/CollectionsContainer.html'
                })
            .state('collections.home',
                {
                    url: '/home',
                    templateUrl: '/app/collection/home/CollectionsHome.html'
                })
            .state('collections.owner-accounts',
                {
                    url: '/owner-accounts',
                    templateUrl: '/app/collection/owner_accounts/OwnerAccounts.html'
                })
            .state('quarterlybillingprocessing',
                {
                    cache: false,
                    url: '/quarterlybillingprocessing',
                    templateUrl: '/app/quarterlybilling/QuarterlyBillingProcessing.html'
                });
    }]);