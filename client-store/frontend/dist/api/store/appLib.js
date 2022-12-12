var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getEventHandler, PACKAGE_ID, AC_RETRIEVE_PKG, AC_RETRIEVE_PKGS, AC_INSTALL_PKG, AC_UNINSTALL_PKG, AC_CANCEL_PKG, AC_RETRIEVE_SYSTEM_VERSION, AC_CLEAR_DATA, AC_RESTART, AC_OFF, AC_ON, AC_CHECK_STATUS, AC_CHECK_IF_PACKAGE_IS_DEPENDENCY } from "../../constants";
export function retrieveAllListings(beta) {
    if (beta === void 0) { beta = false; }
    return __awaiter(this, void 0, void 0, function () {
        var res, pkgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Retrieve all listing");
                    return [4 /*yield*/, getEventHandler().sendRPC(PACKAGE_ID, AC_RETRIEVE_PKGS, "", { beta: beta })];
                case 1:
                    res = _a.sent();
                    if (res.code !== 200)
                        throw new Error(res.message);
                    pkgs = JSON.parse(res.message);
                    console.log(pkgs);
                    return [2 /*return*/, pkgs];
            }
        });
    });
}
export function retrieveListing(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        var res, pkg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEventHandler().sendRPC(PACKAGE_ID, AC_RETRIEVE_PKG, packageId)];
                case 1:
                    res = _a.sent();
                    if (res.code !== 200)
                        throw new Error(res.message);
                    pkg = JSON.parse(res.message);
                    //console.log("retrieve listing", res)
                    return [2 /*return*/, pkg];
            }
        });
    });
}
// use to install package
export function installPackage(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEventHandler().sendRPC(PACKAGE_ID, AC_INSTALL_PKG, packageId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function uninstallPackage(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEventHandler().sendRPC(PACKAGE_ID, AC_UNINSTALL_PKG, packageId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function cancelPackage(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEventHandler().sendRPC(PACKAGE_ID, AC_CANCEL_PKG, packageId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function retrieveSystemVersion() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEventHandler().sendRPC(PACKAGE_ID, AC_RETRIEVE_SYSTEM_VERSION)];
                case 1:
                    res = _a.sent();
                    if (res.code !== 200)
                        throw new Error(res.message);
                    return [2 /*return*/, res.message];
            }
        });
    });
}
// resync specific service/node
export function resync(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("resync...");
                    return [4 /*yield*/, getEventHandler().sendSystemRPC(AC_CLEAR_DATA, packageId)];
                case 1:
                    res = _a.sent();
                    if (res.code !== 200)
                        throw new Error(res.message);
                    return [2 /*return*/, res.message];
            }
        });
    });
}
// restart specific service/node
export function restart(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("restart...");
                    return [4 /*yield*/, getEventHandler().sendSystemRPC(AC_RESTART, packageId)];
                case 1:
                    res = _a.sent();
                    if (res.code !== 200)
                        throw new Error(res.message);
                    return [2 /*return*/, res.message];
            }
        });
    });
}
// off specific service/node
export function disablePackage(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("off...");
                    return [4 /*yield*/, getEventHandler().sendSystemRPC(AC_OFF, packageId)];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    if (res.code !== 200)
                        throw new Error(res.message);
                    return [2 /*return*/, res.message];
            }
        });
    });
}
// on specific service/node
export function On(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("On...");
                    return [4 /*yield*/, getEventHandler().sendSystemRPC(AC_ON, packageId)];
                case 1:
                    res = _a.sent();
                    if (res.code !== 200)
                        throw new Error(res.message);
                    return [2 /*return*/, res.message];
            }
        });
    });
}
// check specific service/node status
export function OnCheckStatus(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        var res, enabled;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Checking Status...");
                    return [4 /*yield*/, getEventHandler().sendSystemRPC(AC_CHECK_STATUS, packageId)];
                case 1:
                    res = _a.sent();
                    if (res.code !== 200)
                        throw new Error(res.message);
                    enabled = true;
                    if (res.message === "false" || !res.message)
                        enabled = false;
                    return [2 /*return*/, enabled];
            }
        });
    });
}
export function OnCheckIfDependent(packageId) {
    return __awaiter(this, void 0, void 0, function () {
        var res, isDependent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Checking If dependency...");
                    return [4 /*yield*/, getEventHandler().sendRPC(PACKAGE_ID, AC_CHECK_IF_PACKAGE_IS_DEPENDENCY, packageId)];
                case 1:
                    res = _a.sent();
                    if (res.code !== 200)
                        throw new Error(res.message);
                    isDependent = true;
                    if (res.message === "false" || !res.message)
                        isDependent = false;
                    return [2 /*return*/, isDependent];
            }
        });
    });
}
