import React from 'react';
import { AppButton } from '../components/AppButton';
import { ComponentMeta } from '@storybook/react';

export default {
    title: 'AppButton',
    component: AppButton,
} as ComponentMeta<typeof AppButton>;

export const Primary = () => <AppButton>Primary</AppButton>;
export const Disabled = () => <AppButton>Primary</AppButton>;
export const Update = () => <AppButton>Primary</AppButton>;
export const Downloading = () => <AppButton>Primary</AppButton>;
export const Installing = () => <AppButton>Primary</AppButton>;