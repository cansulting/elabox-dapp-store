export var ProgressColor = function (processStatus) {
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
//uppercase first letter
export var UppercaseFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
