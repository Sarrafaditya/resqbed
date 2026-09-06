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
exports.id = "app/api/auth/validate/route";
exports.ids = ["app/api/auth/validate/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fvalidate%2Froute&page=%2Fapi%2Fauth%2Fvalidate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fvalidate%2Froute.ts&appDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fvalidate%2Froute&page=%2Fapi%2Fauth%2Fvalidate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fvalidate%2Froute.ts&appDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_aditya_Desktop_MyMac_tap2bed_app_api_auth_validate_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/validate/route.ts */ \"(rsc)/./app/api/auth/validate/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/validate/route\",\n        pathname: \"/api/auth/validate\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/validate/route\"\n    },\n    resolvedPagePath: \"/Users/aditya/Desktop/MyMac/tap2bed/app/api/auth/validate/route.ts\",\n    nextConfigOutput,\n    userland: _Users_aditya_Desktop_MyMac_tap2bed_app_api_auth_validate_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/validate/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGdmFsaWRhdGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZ2YWxpZGF0ZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZ2YWxpZGF0ZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFkaXR5YSUyRkRlc2t0b3AlMkZNeU1hYyUyRnRhcDJiZWQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYWRpdHlhJTJGRGVza3RvcCUyRk15TWFjJTJGdGFwMmJlZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNrQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL3RhcDJiZWQvPzJhMzciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2FkaXR5YS9EZXNrdG9wL015TWFjL3RhcDJiZWQvYXBwL2FwaS9hdXRoL3ZhbGlkYXRlL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL3ZhbGlkYXRlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC92YWxpZGF0ZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC92YWxpZGF0ZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9hZGl0eWEvRGVza3RvcC9NeU1hYy90YXAyYmVkL2FwcC9hcGkvYXV0aC92YWxpZGF0ZS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL3ZhbGlkYXRlL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCwgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fvalidate%2Froute&page=%2Fapi%2Fauth%2Fvalidate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fvalidate%2Froute.ts&appDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/validate/route.ts":
/*!****************************************!*\
  !*** ./app/api/auth/validate/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/webapi/jwt/verify.js\");\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/supabase */ \"(rsc)/./app/utils/supabase.ts\");\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"resqbed_secret_key\";\nconst secretKey = new TextEncoder().encode(JWT_SECRET);\nasync function GET(request) {\n    console.log(\"Validate API route hit\");\n    try {\n        const authHeader = request.headers.get(\"Authorization\");\n        if (!authHeader || !authHeader.startsWith(\"Bearer \")) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                message: \"Authorization header missing or invalid\"\n            }, {\n                status: 401\n            });\n        }\n        const token = authHeader.split(\" \")[1];\n        try {\n            const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_2__.jwtVerify)(token, secretKey);\n            const decoded = payload;\n            const user = await _utils_supabase__WEBPACK_IMPORTED_MODULE_1__.sql`\n        SELECT * FROM users WHERE id = ${decoded.userId} LIMIT 1\n      `.then((res)=>res[0]);\n            if (!user) {\n                return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                    message: \"User not found\"\n                }, {\n                    status: 404\n                });\n            }\n            if (!user.is_active) {\n                return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                    message: \"User account is inactive\"\n                }, {\n                    status: 403\n                });\n            }\n            const mappedUser = {\n                id: user.id,\n                username: user.username,\n                firstName: user.first_name,\n                lastName: user.last_name,\n                userType: user.user_type,\n                isActive: user.is_active,\n                hospitalName: user.hospital_name,\n                employeeCode: user.employee_code,\n                profilePhotoUrl: user.profile_photo_url,\n                createdAt: user.created_at\n            };\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                user: mappedUser\n            });\n        } catch (error) {\n            console.error(\"Token verification error:\", error);\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                message: \"Invalid or expired token\"\n            }, {\n                status: 401\n            });\n        }\n    } catch (error) {\n        console.error(\"Validation error:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            message: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdmFsaWRhdGUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF3RDtBQUN2QjtBQUNhO0FBRTlDLE1BQU1HLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0YsVUFBVSxJQUFJO0FBQzdDLE1BQU1HLFlBQVksSUFBSUMsY0FBY0MsTUFBTSxDQUFDTDtBQUVwQyxlQUFlTSxJQUFJQyxPQUFvQjtJQUM1Q0MsUUFBUUMsR0FBRyxDQUFDO0lBQ1osSUFBSTtRQUNGLE1BQU1DLGFBQWFILFFBQVFJLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO1FBRXZDLElBQUksQ0FBQ0YsY0FBYyxDQUFDQSxXQUFXRyxVQUFVLENBQUMsWUFBWTtZQUNwRCxPQUFPaEIsa0ZBQVlBLENBQUNpQixJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO1lBQTBDLEdBQ3JEO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNQyxRQUFRUCxXQUFXUSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFFdEMsSUFBSTtZQUNGLE1BQU0sRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTXJCLCtDQUFTQSxDQUFDbUIsT0FBT2Q7WUFDM0MsTUFBTWlCLFVBQVVEO1lBTWhCLE1BQU1FLE9BQU8sTUFBTXRCLGdEQUFHLENBQUM7dUNBQ1UsRUFBRXFCLFFBQVFFLE1BQU0sQ0FBQztNQUNsRCxDQUFDLENBQUNDLElBQUksQ0FBQ0MsQ0FBQUEsTUFBT0EsR0FBRyxDQUFDLEVBQUU7WUFHcEIsSUFBSSxDQUFDSCxNQUFNO2dCQUNULE9BQU94QixrRkFBWUEsQ0FBQ2lCLElBQUksQ0FDdEI7b0JBQUVDLFNBQVM7Z0JBQWlCLEdBQzVCO29CQUFFQyxRQUFRO2dCQUFJO1lBRWxCO1lBRUEsSUFBSSxDQUFDSyxLQUFLSSxTQUFTLEVBQUU7Z0JBQ25CLE9BQU81QixrRkFBWUEsQ0FBQ2lCLElBQUksQ0FDdEI7b0JBQUVDLFNBQVM7Z0JBQTJCLEdBQ3RDO29CQUFFQyxRQUFRO2dCQUFJO1lBRWxCO1lBRUEsTUFBTVUsYUFBYTtnQkFDakJDLElBQUlOLEtBQUtNLEVBQUU7Z0JBQ1hDLFVBQVVQLEtBQUtPLFFBQVE7Z0JBQ3ZCQyxXQUFXUixLQUFLUyxVQUFVO2dCQUMxQkMsVUFBVVYsS0FBS1csU0FBUztnQkFDeEJDLFVBQVVaLEtBQUthLFNBQVM7Z0JBQ3hCQyxVQUFVZCxLQUFLSSxTQUFTO2dCQUN4QlcsY0FBY2YsS0FBS2dCLGFBQWE7Z0JBQ2hDQyxjQUFjakIsS0FBS2tCLGFBQWE7Z0JBQ2hDQyxpQkFBaUJuQixLQUFLb0IsaUJBQWlCO2dCQUN2Q0MsV0FBV3JCLEtBQUtzQixVQUFVO1lBQzVCO1lBRUEsT0FBTzlDLGtGQUFZQSxDQUFDaUIsSUFBSSxDQUFDO2dCQUN2Qk8sTUFBTUs7WUFDUjtRQUNGLEVBQUUsT0FBT2tCLE9BQU87WUFDZHBDLFFBQVFvQyxLQUFLLENBQUMsNkJBQTZCQTtZQUMzQyxPQUFPL0Msa0ZBQVlBLENBQUNpQixJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO1lBQTJCLEdBQ3RDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7SUFDRixFQUFFLE9BQU80QixPQUFPO1FBQ2RwQyxRQUFRb0MsS0FBSyxDQUFDLHFCQUFxQkE7UUFDbkMsT0FBTy9DLGtGQUFZQSxDQUFDaUIsSUFBSSxDQUN0QjtZQUFFQyxTQUFTO1FBQXdCLEdBQ25DO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFwMmJlZC8uL2FwcC9hcGkvYXV0aC92YWxpZGF0ZS9yb3V0ZS50cz8xMGI4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBqd3RWZXJpZnkgfSBmcm9tICdqb3NlJztcbmltcG9ydCB7IHNxbCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3N1cGFiYXNlJztcblxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ3Jlc3FiZWRfc2VjcmV0X2tleSc7XG5jb25zdCBzZWNyZXRLZXkgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoSldUX1NFQ1JFVCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgY29uc29sZS5sb2coJ1ZhbGlkYXRlIEFQSSByb3V0ZSBoaXQnKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxdWVzdC5oZWFkZXJzLmdldCgnQXV0aG9yaXphdGlvbicpO1xuXG4gICAgaWYgKCFhdXRoSGVhZGVyIHx8ICFhdXRoSGVhZGVyLnN0YXJ0c1dpdGgoJ0JlYXJlciAnKSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6ICdBdXRob3JpemF0aW9uIGhlYWRlciBtaXNzaW5nIG9yIGludmFsaWQnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2tlbiA9IGF1dGhIZWFkZXIuc3BsaXQoJyAnKVsxXTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGp3dFZlcmlmeSh0b2tlbiwgc2VjcmV0S2V5KTtcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBwYXlsb2FkIGFzIHtcbiAgICAgICAgdXNlcklkOiBzdHJpbmc7XG4gICAgICAgIHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgICAgIHVzZXJUeXBlOiBzdHJpbmc7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgc3FsYFxuICAgICAgICBTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGlkID0gJHtkZWNvZGVkLnVzZXJJZH0gTElNSVQgMVxuICAgICAgYC50aGVuKHJlcyA9PiByZXNbMF0pO1xuXG5cbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgeyBtZXNzYWdlOiAnVXNlciBub3QgZm91bmQnIH0sXG4gICAgICAgICAgeyBzdGF0dXM6IDQwNCB9XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXNlci5pc19hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgIHsgbWVzc2FnZTogJ1VzZXIgYWNjb3VudCBpcyBpbmFjdGl2ZScgfSxcbiAgICAgICAgICB7IHN0YXR1czogNDAzIH1cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFwcGVkVXNlciA9IHtcbiAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3RfbmFtZSxcbiAgICAgICAgbGFzdE5hbWU6IHVzZXIubGFzdF9uYW1lLFxuICAgICAgICB1c2VyVHlwZTogdXNlci51c2VyX3R5cGUsXG4gICAgICAgIGlzQWN0aXZlOiB1c2VyLmlzX2FjdGl2ZSxcbiAgICAgICAgaG9zcGl0YWxOYW1lOiB1c2VyLmhvc3BpdGFsX25hbWUsXG4gICAgICAgIGVtcGxveWVlQ29kZTogdXNlci5lbXBsb3llZV9jb2RlLFxuICAgICAgICBwcm9maWxlUGhvdG9Vcmw6IHVzZXIucHJvZmlsZV9waG90b191cmwsXG4gICAgICAgIGNyZWF0ZWRBdDogdXNlci5jcmVhdGVkX2F0LFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgICAgdXNlcjogbWFwcGVkVXNlcixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdUb2tlbiB2ZXJpZmljYXRpb24gZXJyb3I6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6ICdJbnZhbGlkIG9yIGV4cGlyZWQgdG9rZW4nIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVmFsaWRhdGlvbiBlcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJqd3RWZXJpZnkiLCJzcWwiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsInNlY3JldEtleSIsIlRleHRFbmNvZGVyIiwiZW5jb2RlIiwiR0VUIiwicmVxdWVzdCIsImNvbnNvbGUiLCJsb2ciLCJhdXRoSGVhZGVyIiwiaGVhZGVycyIsImdldCIsInN0YXJ0c1dpdGgiLCJqc29uIiwibWVzc2FnZSIsInN0YXR1cyIsInRva2VuIiwic3BsaXQiLCJwYXlsb2FkIiwiZGVjb2RlZCIsInVzZXIiLCJ1c2VySWQiLCJ0aGVuIiwicmVzIiwiaXNfYWN0aXZlIiwibWFwcGVkVXNlciIsImlkIiwidXNlcm5hbWUiLCJmaXJzdE5hbWUiLCJmaXJzdF9uYW1lIiwibGFzdE5hbWUiLCJsYXN0X25hbWUiLCJ1c2VyVHlwZSIsInVzZXJfdHlwZSIsImlzQWN0aXZlIiwiaG9zcGl0YWxOYW1lIiwiaG9zcGl0YWxfbmFtZSIsImVtcGxveWVlQ29kZSIsImVtcGxveWVlX2NvZGUiLCJwcm9maWxlUGhvdG9VcmwiLCJwcm9maWxlX3Bob3RvX3VybCIsImNyZWF0ZWRBdCIsImNyZWF0ZWRfYXQiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/validate/route.ts\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/postgres","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fvalidate%2Froute&page=%2Fapi%2Fauth%2Fvalidate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fvalidate%2Froute.ts&appDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faditya%2FDesktop%2FMyMac%2Ftap2bed&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();