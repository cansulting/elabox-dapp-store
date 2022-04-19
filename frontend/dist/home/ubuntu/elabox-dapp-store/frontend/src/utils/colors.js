"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UppercaseFirstLetter = exports.ProgressColor = void 0;
var ProgressColor = function (processStatus) {
    var progressColor = 'primary';
    if (processStatus === 'error') {
        progressColor = 'danger';
    }
    else if (processStatus === 'installing' ||
        processStatus === 'uninstalling') {
        progressColor = 'info';
    }
    else if (processStatus === 'completed') {
        progressColor = 'success';
    }
    return progressColor;
};
exports.ProgressColor = ProgressColor;
//uppercase first letter
var UppercaseFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.UppercaseFirstLetter = UppercaseFirstLetter;
