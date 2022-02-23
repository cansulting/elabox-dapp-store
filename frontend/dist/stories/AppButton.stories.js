import React from 'react';
import { AppButton } from './AppButton';
export default {
    title: 'AppButton',
    component: AppButton,
};
export var Primary = function () { return React.createElement(AppButton, { primary: true, label: 'sdfsd' }); };
