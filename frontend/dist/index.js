"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
require("bootstrap/dist/css/bootstrap.min.css");
var elabox_foundation_1 = require("elabox-foundation");
var constants_1 = require("./actions/constants");
__exportStar(require("./components"), exports);
__exportStar(require("./container"), exports);
__exportStar(require("./data/packageInfo"), exports);
var initialize = function (eventHandler) {
    if (!eventHandler)
        eventHandler = new elabox_foundation_1.EboxEvent(window.location.origin);
    (0, constants_1.setEventHandler)(eventHandler);
};
exports.initialize = initialize;
