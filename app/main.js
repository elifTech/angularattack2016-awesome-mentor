"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_component_1 = require('./app.component');
var logger_service_1 = require('./blocks/logger.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    logger_service_1.LoggerService, router_deprecated_1.ROUTER_PROVIDERS
]);

//# sourceMappingURL=main.js.map
