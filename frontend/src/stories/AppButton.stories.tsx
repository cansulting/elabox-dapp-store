import React from 'react'
import { AppButton, AppButtonProps } from '../components/AppButton'
import { ComponentMeta } from '@storybook/react'

export default {
    title: 'Elabox/components/AppButton',
    component: AppButton,
} as ComponentMeta<typeof AppButton>

const Template = (props: AppButtonProps): JSX.Element => (
    <AppButton {...props}>{props.children}</AppButton>
)
export const Primary = Template.bind({})
Primary.args = {
    children: 'Primary',
    color: 'primary',
    outline: false,
    size: 'lg',
    block: false,
    active: false,
    close: false,
    disabled: false,
    isProcessing: false,
}
export const Secondary = Template.bind({})
Secondary.args = {
    ...Primary.args,
    children: 'Secondary',
    color: 'secondary',
}
export const Success = Template.bind({})
Success.args = {
    ...Primary.args,
    children: 'Success',
    color: 'success',
}
export const Danger = Template.bind({})
Danger.args = {
    ...Primary.args,
    children: 'Danger',
    color: 'danger',
}
export const Info = Template.bind({})
Info.args = {
    ...Primary.args,
    children: 'Info',
    color: 'info',
}
export const Outline = Template.bind({})
Outline.args = {
    ...Primary.args,
    outline: true,
}
export const Active = Template.bind({})
Active.args = {
    ...Primary.args,
    active: true,
}
export const Close = Template.bind({})
Close.args = {
    ...Primary.args,
    close: true,
}
export const Disabled = Template.bind({})
Disabled.args = {
    ...Primary.args,
    children: 'Disabled',
    disabled: true,
}
export const Block = Template.bind({})
Block.args = {
    ...Primary.args,
    children: 'Block',
    block: true,
}
export const Processing = Template.bind({})
Processing.args = {
    ...Primary.args,
    children: 'Processing',
    disabled: true,
    isProcessing: true,
}
