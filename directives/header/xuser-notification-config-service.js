define(['app', 'lodash', 'moment'],
    function (app, _, moment) {

        app.service("cfgUserNotification", ['$location', '$window', '$filter', function ($location, $window, $filter) {

            var notificationUrls = {
                documentNotificationUrl: '/register/requests/',
                viewAllNotificationUrl: '/register/requests',
                documentMessageUrl: '/mailbox/'
            };
            var productionRealms = {
                urls: ['https://absch.cbd.int', 'https://chm.cbd.int', 'https://accounts.cbd.int'],
                realms: ['ABS', 'CHM']
            }

            var developmentRealms = {
                urls: ['https://absch.cbddev.xyz', 'https://dev-chm.cbd.int', 'https://chm.cbddev.xyz', 'https://accounts.cbddev.xyz',
                    'http://localhost:2010', 'http://localhost:2000', 'http://localhost:8000'],
                realms: ['ABS-DEV', 'CHM-DEV']
            }

            var trainingRealms = {
                urls: ['https://training-absch.cbd.int'],
                realms: ['ABS-TRG']
            }

            function realmsForQuery() {
                if (_.some(productionRealms.urls, function (url) {
                    return $location.absUrl().indexOf(url) >= 0;
                }))
                    return productionRealms.realms;

                if (_.some(developmentRealms.urls, function (url) {
                    return $location.absUrl().indexOf(url) >= 0;
                }))
                    return developmentRealms.realms;

                if (_.some(trainingRealms.urls, function (url) {
                    return $location.absUrl().indexOf(url) >= 0;
                }))
                    return trainingRealms.realms;
            }

            function notificationUrl(notification) {
                switch (notification.data.documentInfo.realm.toUpperCase()) {
                    case 'ABS':
                        url = 'https://absch.cbd.int'; break;
                    case 'ABS-DEV': {
                        if ($location.absUrl().indexOf('http://localhost:') >= 0)
                            url = 'http://localhost:2010'
                        else
                            url = 'https://absch.cbddev.xyz'; break;
                    }
                    case 'ABS-TRG':
                        url = 'https://training-absch.cbd.int'; break;
                    case 'CHM':
                        url = 'https://chm.cbd.int'; break;
                    case 'CHM-DEV': {
                        if ($location.absUrl().indexOf('http://localhost:') >= 0)
                            url = 'http://localhost:2000'
                        else
                            url = 'https://dev-chm.cbd.int'; break;
                    }
                }

                //if same realm url avoid using window redirect
                if ($location.absUrl().indexOf(url) >= 0)
                    url = '';

                var path;
                if (_.contains(['ABS', 'ABS-DEV', 'ABS-TRG'], notification.data.documentInfo.realm.toUpperCase())) {
                    path = "/register/" + $filter("schemaShortName")(notification.data.documentInfo.metadata.schema) + "/" + notification.data.documentInfo.identifier + "/view";
                }
                else {
                    path = getURL(notification);
                }

                if (url != '') {
                    $window.location.href = url + path;
                }
                else {
                    return path;
                }
            }

            function getURL(notification) {
                
                if (notificationUrls && !notificationUrls.documentNotificationUrl)
                    throw "Invalid User Notification Configuration, documentNotificationUrl is missing.";

                if (notification.type == 'documentNotification')
                    return notificationUrls.documentNotificationUrl
                        + notification.data.workflowId;
                else
                    return notificationUrls.documentMessageUrl + notification.id;
            }

            return {
                notificationUrls: notificationUrls,
                realmsForQuery  : realmsForQuery,
                notificationUrl : notificationUrl,
                getURL          : getURL
            };
        }]);

    });