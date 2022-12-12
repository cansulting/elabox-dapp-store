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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { create } from 'ipfs-http-client';
import { IPFS_PEERS } from '../constants';
import { getCache, putCache } from './cache';
var ipfsClients = null;
function init() {
    var e_1, _a;
    if (ipfsClients)
        return;
    ipfsClients = [];
    try {
        for (var IPFS_PEERS_1 = __values(IPFS_PEERS), IPFS_PEERS_1_1 = IPFS_PEERS_1.next(); !IPFS_PEERS_1_1.done; IPFS_PEERS_1_1 = IPFS_PEERS_1.next()) {
            var peer = IPFS_PEERS_1_1.value;
            ipfsClients.push(create({ url: peer }));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (IPFS_PEERS_1_1 && !IPFS_PEERS_1_1.done && (_a = IPFS_PEERS_1.return)) _a.call(IPFS_PEERS_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
export function upload(buf) {
    return __awaiter(this, void 0, void 0, function () {
        var ipfsClients_1, ipfsClients_1_1, client, res, err_1, e_2_1;
        var e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    init();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 10]);
                    ipfsClients_1 = __values(ipfsClients), ipfsClients_1_1 = ipfsClients_1.next();
                    _b.label = 2;
                case 2:
                    if (!!ipfsClients_1_1.done) return [3 /*break*/, 7];
                    client = ipfsClients_1_1.value;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, client.add(buf)];
                case 4:
                    res = _b.sent();
                    return [2 /*return*/, res.cid.toString()];
                case 5:
                    err_1 = _b.sent();
                    console.log("unable to connect to client");
                    return [3 /*break*/, 6];
                case 6:
                    ipfsClients_1_1 = ipfsClients_1.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (ipfsClients_1_1 && !ipfsClients_1_1.done && (_a = ipfsClients_1.return)) _a.call(ipfsClients_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 10: throw new Error("failed to upload file, unable to connect to clients");
            }
        });
    });
}
export function retrieve(ipfsUrl) {
    var _a, e_3, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var buf, ipfsClients_2, ipfsClients_2_1, client, outputs, _d, _e, _f, output, e_3_1, err_2, e_4_1;
        var e_4, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, getCache(ipfsUrl)];
                case 1:
                    buf = _h.sent();
                    if (buf) {
                        return [2 /*return*/, Buffer.from((buf))];
                    }
                    // retrieve via http
                    init();
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 24, 25, 26]);
                    ipfsClients_2 = __values(ipfsClients), ipfsClients_2_1 = ipfsClients_2.next();
                    _h.label = 3;
                case 3:
                    if (!!ipfsClients_2_1.done) return [3 /*break*/, 23];
                    client = ipfsClients_2_1.value;
                    _h.label = 4;
                case 4:
                    _h.trys.push([4, 21, , 22]);
                    outputs = client.cat(ipfsUrl);
                    _h.label = 5;
                case 5:
                    _h.trys.push([5, 14, 15, 20]);
                    _d = true;
                    e_3 = void 0;
                    return [4 /*yield*/, outputs];
                case 6:
                    _e = (__asyncValues.apply(void 0, [_h.sent()]));
                    _h.label = 7;
                case 7: return [4 /*yield*/, _e.next()];
                case 8:
                    if (!(_f = _h.sent(), _a = _f.done, !_a)) return [3 /*break*/, 13];
                    _c = _f.value;
                    _d = false;
                    _h.label = 9;
                case 9:
                    _h.trys.push([9, , 11, 12]);
                    output = _c;
                    //console.log("####", output.buffer)
                    return [4 /*yield*/, putCache(output.buffer, ipfsUrl)];
                case 10:
                    //console.log("####", output.buffer)
                    _h.sent();
                    return [2 /*return*/, Buffer.from(output.buffer)];
                case 11:
                    _d = true;
                    return [7 /*endfinally*/];
                case 12: return [3 /*break*/, 7];
                case 13: return [3 /*break*/, 20];
                case 14:
                    e_3_1 = _h.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 20];
                case 15:
                    _h.trys.push([15, , 18, 19]);
                    if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 17];
                    return [4 /*yield*/, _b.call(_e)];
                case 16:
                    _h.sent();
                    _h.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 19: return [7 /*endfinally*/];
                case 20: return [2 /*return*/, null];
                case 21:
                    err_2 = _h.sent();
                    console.warn("unable to connect to client", err_2);
                    return [3 /*break*/, 22];
                case 22:
                    ipfsClients_2_1 = ipfsClients_2.next();
                    return [3 /*break*/, 3];
                case 23: return [3 /*break*/, 26];
                case 24:
                    e_4_1 = _h.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 26];
                case 25:
                    try {
                        if (ipfsClients_2_1 && !ipfsClients_2_1.done && (_g = ipfsClients_2.return)) _g.call(ipfsClients_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 26: throw new Error("failed to retrieve " + ipfsUrl + ", unable to connect to clients");
            }
        });
    });
}
