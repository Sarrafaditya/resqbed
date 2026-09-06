"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/stats/route";
exports.ids = ["app/api/stats/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("perf_hooks");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstats%2Froute&page=%2Fapi%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstats%2Froute.ts&appDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstats%2Froute&page=%2Fapi%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstats%2Froute.ts&appDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_aditya_Desktop_MyMac_tap2bed_app_api_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/stats/route.ts */ \"(rsc)/./app/api/stats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/stats/route\",\n        pathname: \"/api/stats\",\n        filename: \"route\",\n        bundlePath: \"app/api/stats/route\"\n    },\n    resolvedPagePath: \"/Users/aditya/Desktop/MyMac/tap2bed/app/api/stats/route.ts\",\n    nextConfigOutput,\n    userland: _Users_aditya_Desktop_MyMac_tap2bed_app_api_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/stats/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzdGF0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc3RhdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzdGF0cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFkaXR5YSUyRkRlc2t0b3AlMkZNeU1hYyUyRnRhcDJiZWQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYWRpdHlhJTJGRGVza3RvcCUyRk15TWFjJTJGdGFwMmJlZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNVO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFwMmJlZC8/ZDNkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvYWRpdHlhL0Rlc2t0b3AvTXlNYWMvdGFwMmJlZC9hcHAvYXBpL3N0YXRzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zdGF0cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3N0YXRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zdGF0cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9hZGl0eWEvRGVza3RvcC9NeU1hYy90YXAyYmVkL2FwcC9hcGkvc3RhdHMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvc3RhdHMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstats%2Froute&page=%2Fapi%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstats%2Froute.ts&appDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/stats/route.ts":
/*!********************************!*\
  !*** ./app/api/stats/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/supabase */ \"(rsc)/./app/utils/supabase.ts\");\n\n\n// Public endpoint — no auth. Returns aggregate stats plus a per-hospital\n// breakdown, for the unauthenticated stats screen.\nasync function GET() {\n    try {\n        const hospitals = await _utils_supabase__WEBPACK_IMPORTED_MODULE_1__.sql`\n      SELECT\n        h.id,\n        h.hospital_name,\n        h.hospital_type,\n        h.address,\n        h.total_beds,\n        h.available_beds,\n        h.total_icu_beds,\n        h.available_icu_beds,\n        h.total_ventilators,\n        h.available_ventilators,\n        h.oxygen_cylinders,\n        h.available_oxygen_cylinders,\n        h.updated_at\n      FROM hospitals h\n      JOIN users u ON u.id = h.id\n      WHERE u.is_active = true\n      ORDER BY h.hospital_name ASC\n    `;\n        const totals = hospitals.reduce((acc, h)=>{\n            acc.totalHospitals += 1;\n            acc.totalBeds += h.total_beds || 0;\n            acc.availableBeds += h.available_beds || 0;\n            acc.totalICUBeds += h.total_icu_beds || 0;\n            acc.availableICUBeds += h.available_icu_beds || 0;\n            acc.totalVentilators += h.total_ventilators || 0;\n            acc.availableVentilators += h.available_ventilators || 0;\n            acc.totalOxygenCylinders += h.oxygen_cylinders || 0;\n            acc.availableOxygenCylinders += h.available_oxygen_cylinders || 0;\n            return acc;\n        }, {\n            totalHospitals: 0,\n            totalBeds: 0,\n            availableBeds: 0,\n            totalICUBeds: 0,\n            availableICUBeds: 0,\n            totalVentilators: 0,\n            availableVentilators: 0,\n            totalOxygenCylinders: 0,\n            availableOxygenCylinders: 0\n        });\n        const mappedHospitals = hospitals.map((h)=>({\n                id: h.id,\n                hospitalName: h.hospital_name,\n                hospitalType: h.hospital_type,\n                address: h.address,\n                totalBeds: h.total_beds,\n                availableBeds: h.available_beds,\n                totalICUBeds: h.total_icu_beds,\n                availableICUBeds: h.available_icu_beds,\n                totalVentilators: h.total_ventilators,\n                availableVentilators: h.available_ventilators,\n                totalOxygenCylinders: h.oxygen_cylinders,\n                availableOxygenCylinders: h.available_oxygen_cylinders,\n                updatedAt: h.updated_at\n            }));\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            totals,\n            hospitals: mappedHospitals\n        });\n    } catch (error) {\n        console.error(\"Error fetching public stats:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            message: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N0YXRzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNBO0FBRTNDLHlFQUF5RTtBQUN6RSxtREFBbUQ7QUFDNUMsZUFBZUU7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLFlBQVksTUFBTUYsZ0RBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1CNUIsQ0FBQztRQUVELE1BQU1HLFNBQVNELFVBQVVFLE1BQU0sQ0FDN0IsQ0FBQ0MsS0FBS0M7WUFDSkQsSUFBSUUsY0FBYyxJQUFJO1lBQ3RCRixJQUFJRyxTQUFTLElBQUlGLEVBQUVHLFVBQVUsSUFBSTtZQUNqQ0osSUFBSUssYUFBYSxJQUFJSixFQUFFSyxjQUFjLElBQUk7WUFDekNOLElBQUlPLFlBQVksSUFBSU4sRUFBRU8sY0FBYyxJQUFJO1lBQ3hDUixJQUFJUyxnQkFBZ0IsSUFBSVIsRUFBRVMsa0JBQWtCLElBQUk7WUFDaERWLElBQUlXLGdCQUFnQixJQUFJVixFQUFFVyxpQkFBaUIsSUFBSTtZQUMvQ1osSUFBSWEsb0JBQW9CLElBQUlaLEVBQUVhLHFCQUFxQixJQUFJO1lBQ3ZEZCxJQUFJZSxvQkFBb0IsSUFBSWQsRUFBRWUsZ0JBQWdCLElBQUk7WUFDbERoQixJQUFJaUIsd0JBQXdCLElBQUloQixFQUFFaUIsMEJBQTBCLElBQUk7WUFDaEUsT0FBT2xCO1FBQ1QsR0FDQTtZQUNFRSxnQkFBZ0I7WUFDaEJDLFdBQVc7WUFDWEUsZUFBZTtZQUNmRSxjQUFjO1lBQ2RFLGtCQUFrQjtZQUNsQkUsa0JBQWtCO1lBQ2xCRSxzQkFBc0I7WUFDdEJFLHNCQUFzQjtZQUN0QkUsMEJBQTBCO1FBQzVCO1FBR0YsTUFBTUUsa0JBQWtCdEIsVUFBVXVCLEdBQUcsQ0FBQyxDQUFDbkIsSUFBTztnQkFDNUNvQixJQUFJcEIsRUFBRW9CLEVBQUU7Z0JBQ1JDLGNBQWNyQixFQUFFc0IsYUFBYTtnQkFDN0JDLGNBQWN2QixFQUFFd0IsYUFBYTtnQkFDN0JDLFNBQVN6QixFQUFFeUIsT0FBTztnQkFDbEJ2QixXQUFXRixFQUFFRyxVQUFVO2dCQUN2QkMsZUFBZUosRUFBRUssY0FBYztnQkFDL0JDLGNBQWNOLEVBQUVPLGNBQWM7Z0JBQzlCQyxrQkFBa0JSLEVBQUVTLGtCQUFrQjtnQkFDdENDLGtCQUFrQlYsRUFBRVcsaUJBQWlCO2dCQUNyQ0Msc0JBQXNCWixFQUFFYSxxQkFBcUI7Z0JBQzdDQyxzQkFBc0JkLEVBQUVlLGdCQUFnQjtnQkFDeENDLDBCQUEwQmhCLEVBQUVpQiwwQkFBMEI7Z0JBQ3REUyxXQUFXMUIsRUFBRTJCLFVBQVU7WUFDekI7UUFFQSxPQUFPbEMsa0ZBQVlBLENBQUNtQyxJQUFJLENBQUM7WUFDdkIvQjtZQUNBRCxXQUFXc0I7UUFDYjtJQUNGLEVBQUUsT0FBT1csT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsZ0NBQWdDQTtRQUM5QyxPQUFPcEMsa0ZBQVlBLENBQUNtQyxJQUFJLENBQ3RCO1lBQUVHLFNBQVM7UUFBd0IsR0FDbkM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXAyYmVkLy4vYXBwL2FwaS9zdGF0cy9yb3V0ZS50cz84ZGYxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IHNxbCB9IGZyb20gJy4uLy4uL3V0aWxzL3N1cGFiYXNlJztcblxuLy8gUHVibGljIGVuZHBvaW50IOKAlCBubyBhdXRoLiBSZXR1cm5zIGFnZ3JlZ2F0ZSBzdGF0cyBwbHVzIGEgcGVyLWhvc3BpdGFsXG4vLyBicmVha2Rvd24sIGZvciB0aGUgdW5hdXRoZW50aWNhdGVkIHN0YXRzIHNjcmVlbi5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgaG9zcGl0YWxzID0gYXdhaXQgc3FsYFxuICAgICAgU0VMRUNUXG4gICAgICAgIGguaWQsXG4gICAgICAgIGguaG9zcGl0YWxfbmFtZSxcbiAgICAgICAgaC5ob3NwaXRhbF90eXBlLFxuICAgICAgICBoLmFkZHJlc3MsXG4gICAgICAgIGgudG90YWxfYmVkcyxcbiAgICAgICAgaC5hdmFpbGFibGVfYmVkcyxcbiAgICAgICAgaC50b3RhbF9pY3VfYmVkcyxcbiAgICAgICAgaC5hdmFpbGFibGVfaWN1X2JlZHMsXG4gICAgICAgIGgudG90YWxfdmVudGlsYXRvcnMsXG4gICAgICAgIGguYXZhaWxhYmxlX3ZlbnRpbGF0b3JzLFxuICAgICAgICBoLm94eWdlbl9jeWxpbmRlcnMsXG4gICAgICAgIGguYXZhaWxhYmxlX294eWdlbl9jeWxpbmRlcnMsXG4gICAgICAgIGgudXBkYXRlZF9hdFxuICAgICAgRlJPTSBob3NwaXRhbHMgaFxuICAgICAgSk9JTiB1c2VycyB1IE9OIHUuaWQgPSBoLmlkXG4gICAgICBXSEVSRSB1LmlzX2FjdGl2ZSA9IHRydWVcbiAgICAgIE9SREVSIEJZIGguaG9zcGl0YWxfbmFtZSBBU0NcbiAgICBgO1xuXG4gICAgY29uc3QgdG90YWxzID0gaG9zcGl0YWxzLnJlZHVjZShcbiAgICAgIChhY2MsIGgpID0+IHtcbiAgICAgICAgYWNjLnRvdGFsSG9zcGl0YWxzICs9IDE7XG4gICAgICAgIGFjYy50b3RhbEJlZHMgKz0gaC50b3RhbF9iZWRzIHx8IDA7XG4gICAgICAgIGFjYy5hdmFpbGFibGVCZWRzICs9IGguYXZhaWxhYmxlX2JlZHMgfHwgMDtcbiAgICAgICAgYWNjLnRvdGFsSUNVQmVkcyArPSBoLnRvdGFsX2ljdV9iZWRzIHx8IDA7XG4gICAgICAgIGFjYy5hdmFpbGFibGVJQ1VCZWRzICs9IGguYXZhaWxhYmxlX2ljdV9iZWRzIHx8IDA7XG4gICAgICAgIGFjYy50b3RhbFZlbnRpbGF0b3JzICs9IGgudG90YWxfdmVudGlsYXRvcnMgfHwgMDtcbiAgICAgICAgYWNjLmF2YWlsYWJsZVZlbnRpbGF0b3JzICs9IGguYXZhaWxhYmxlX3ZlbnRpbGF0b3JzIHx8IDA7XG4gICAgICAgIGFjYy50b3RhbE94eWdlbkN5bGluZGVycyArPSBoLm94eWdlbl9jeWxpbmRlcnMgfHwgMDtcbiAgICAgICAgYWNjLmF2YWlsYWJsZU94eWdlbkN5bGluZGVycyArPSBoLmF2YWlsYWJsZV9veHlnZW5fY3lsaW5kZXJzIHx8IDA7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b3RhbEhvc3BpdGFsczogMCxcbiAgICAgICAgdG90YWxCZWRzOiAwLFxuICAgICAgICBhdmFpbGFibGVCZWRzOiAwLFxuICAgICAgICB0b3RhbElDVUJlZHM6IDAsXG4gICAgICAgIGF2YWlsYWJsZUlDVUJlZHM6IDAsXG4gICAgICAgIHRvdGFsVmVudGlsYXRvcnM6IDAsXG4gICAgICAgIGF2YWlsYWJsZVZlbnRpbGF0b3JzOiAwLFxuICAgICAgICB0b3RhbE94eWdlbkN5bGluZGVyczogMCxcbiAgICAgICAgYXZhaWxhYmxlT3h5Z2VuQ3lsaW5kZXJzOiAwLFxuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCBtYXBwZWRIb3NwaXRhbHMgPSBob3NwaXRhbHMubWFwKChoKSA9PiAoe1xuICAgICAgaWQ6IGguaWQsXG4gICAgICBob3NwaXRhbE5hbWU6IGguaG9zcGl0YWxfbmFtZSxcbiAgICAgIGhvc3BpdGFsVHlwZTogaC5ob3NwaXRhbF90eXBlLFxuICAgICAgYWRkcmVzczogaC5hZGRyZXNzLFxuICAgICAgdG90YWxCZWRzOiBoLnRvdGFsX2JlZHMsXG4gICAgICBhdmFpbGFibGVCZWRzOiBoLmF2YWlsYWJsZV9iZWRzLFxuICAgICAgdG90YWxJQ1VCZWRzOiBoLnRvdGFsX2ljdV9iZWRzLFxuICAgICAgYXZhaWxhYmxlSUNVQmVkczogaC5hdmFpbGFibGVfaWN1X2JlZHMsXG4gICAgICB0b3RhbFZlbnRpbGF0b3JzOiBoLnRvdGFsX3ZlbnRpbGF0b3JzLFxuICAgICAgYXZhaWxhYmxlVmVudGlsYXRvcnM6IGguYXZhaWxhYmxlX3ZlbnRpbGF0b3JzLFxuICAgICAgdG90YWxPeHlnZW5DeWxpbmRlcnM6IGgub3h5Z2VuX2N5bGluZGVycyxcbiAgICAgIGF2YWlsYWJsZU94eWdlbkN5bGluZGVyczogaC5hdmFpbGFibGVfb3h5Z2VuX2N5bGluZGVycyxcbiAgICAgIHVwZGF0ZWRBdDogaC51cGRhdGVkX2F0LFxuICAgIH0pKTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICB0b3RhbHMsXG4gICAgICBob3NwaXRhbHM6IG1hcHBlZEhvc3BpdGFscyxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwdWJsaWMgc3RhdHM6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgbWVzc2FnZTogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwic3FsIiwiR0VUIiwiaG9zcGl0YWxzIiwidG90YWxzIiwicmVkdWNlIiwiYWNjIiwiaCIsInRvdGFsSG9zcGl0YWxzIiwidG90YWxCZWRzIiwidG90YWxfYmVkcyIsImF2YWlsYWJsZUJlZHMiLCJhdmFpbGFibGVfYmVkcyIsInRvdGFsSUNVQmVkcyIsInRvdGFsX2ljdV9iZWRzIiwiYXZhaWxhYmxlSUNVQmVkcyIsImF2YWlsYWJsZV9pY3VfYmVkcyIsInRvdGFsVmVudGlsYXRvcnMiLCJ0b3RhbF92ZW50aWxhdG9ycyIsImF2YWlsYWJsZVZlbnRpbGF0b3JzIiwiYXZhaWxhYmxlX3ZlbnRpbGF0b3JzIiwidG90YWxPeHlnZW5DeWxpbmRlcnMiLCJveHlnZW5fY3lsaW5kZXJzIiwiYXZhaWxhYmxlT3h5Z2VuQ3lsaW5kZXJzIiwiYXZhaWxhYmxlX294eWdlbl9jeWxpbmRlcnMiLCJtYXBwZWRIb3NwaXRhbHMiLCJtYXAiLCJpZCIsImhvc3BpdGFsTmFtZSIsImhvc3BpdGFsX25hbWUiLCJob3NwaXRhbFR5cGUiLCJob3NwaXRhbF90eXBlIiwiYWRkcmVzcyIsInVwZGF0ZWRBdCIsInVwZGF0ZWRfYXQiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibWVzc2FnZSIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/stats/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/utils/supabase.ts":
/*!*******************************!*\
  !*** ./app/utils/supabase.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sql: () => (/* binding */ sql)\n/* harmony export */ });\n/* harmony import */ var postgres__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! postgres */ \"(rsc)/./node_modules/postgres/src/index.js\");\n\nif (!process.env.DATABASE_URL) {\n    throw new Error(\"DATABASE_URL is not set. Add it to your .env.local file.\");\n}\n// Using Supabase's connection pooler (pgbouncer, transaction mode) instead of\n// the direct connection, since the direct host is IPv6-only and many networks\n// can't resolve it. Transaction-mode pooling requires prepared statements to\n// be disabled.\nconst sql = (0,postgres__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(process.env.DATABASE_URL, {\n    ssl: \"require\",\n    prepare: false\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvdXRpbHMvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBZ0M7QUFFaEMsSUFBSSxDQUFDQyxRQUFRQyxHQUFHLENBQUNDLFlBQVksRUFBRTtJQUM3QixNQUFNLElBQUlDLE1BQU07QUFDbEI7QUFFQSw4RUFBOEU7QUFDOUUsOEVBQThFO0FBQzlFLDZFQUE2RTtBQUM3RSxlQUFlO0FBQ1IsTUFBTUMsTUFBTUwsb0RBQVFBLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWSxFQUFFO0lBQ3BERyxLQUFLO0lBQ0xDLFNBQVM7QUFDWCxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFwMmJlZC8uL2FwcC91dGlscy9zdXBhYmFzZS50cz8zOWQwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwb3N0Z3JlcyBmcm9tICdwb3N0Z3Jlcyc7XG5cbmlmICghcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMKSB7XG4gIHRocm93IG5ldyBFcnJvcignREFUQUJBU0VfVVJMIGlzIG5vdCBzZXQuIEFkZCBpdCB0byB5b3VyIC5lbnYubG9jYWwgZmlsZS4nKTtcbn1cblxuLy8gVXNpbmcgU3VwYWJhc2UncyBjb25uZWN0aW9uIHBvb2xlciAocGdib3VuY2VyLCB0cmFuc2FjdGlvbiBtb2RlKSBpbnN0ZWFkIG9mXG4vLyB0aGUgZGlyZWN0IGNvbm5lY3Rpb24sIHNpbmNlIHRoZSBkaXJlY3QgaG9zdCBpcyBJUHY2LW9ubHkgYW5kIG1hbnkgbmV0d29ya3Ncbi8vIGNhbid0IHJlc29sdmUgaXQuIFRyYW5zYWN0aW9uLW1vZGUgcG9vbGluZyByZXF1aXJlcyBwcmVwYXJlZCBzdGF0ZW1lbnRzIHRvXG4vLyBiZSBkaXNhYmxlZC5cbmV4cG9ydCBjb25zdCBzcWwgPSBwb3N0Z3Jlcyhwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwsIHtcbiAgc3NsOiAncmVxdWlyZScsXG4gIHByZXBhcmU6IGZhbHNlLFxufSk7Il0sIm5hbWVzIjpbInBvc3RncmVzIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCIsIkVycm9yIiwic3FsIiwic3NsIiwicHJlcGFyZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/utils/supabase.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/postgres"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fstats%2Froute&page=%2Fapi%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstats%2Froute.ts&appDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();