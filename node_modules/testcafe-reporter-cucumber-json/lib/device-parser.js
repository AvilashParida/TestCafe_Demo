"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceFromBrowserInfo = void 0;
var devices_1 = require("./devices");
function getDeviceFromBrowserInfo(browserInfo) {
    if (!browserInfo) {
        return null;
    }
    if (browserInfo && browserInfo.alias && browserInfo.alias.startsWith('browserstack')) {
        var aliasParts = browserInfo.alias.split(':');
        var browserstatckDevice = aliasParts.pop();
        if (browserstatckDevice && devices_1.devices.includes(browserstatckDevice)) {
            return browserstatckDevice;
        }
        if (aliasParts.length >= 2 && browserstatckDevice) {
            return browserstatckDevice;
        }
    }
    return null;
}
exports.getDeviceFromBrowserInfo = getDeviceFromBrowserInfo;
//# sourceMappingURL=device-parser.js.map