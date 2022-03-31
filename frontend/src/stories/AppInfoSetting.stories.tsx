import React from 'react'
import {
    AppInfoSetting,
    AppInfoSettingProps,
} from '../components/AppInfoSetting'

import { ComponentMeta } from '@storybook/react'
import { PackageInfo } from '../data/packageInfo'

export default {
    title: 'Elabox/components/AppInfoSetting',
    component: AppInfoSetting,
} as ComponentMeta<typeof AppInfoSetting>

const Template = (props: AppInfoSettingProps): JSX.Element => (
    <AppInfoSetting {...props} />
)

export const Primary = Template.bind({})

Primary.args = {
    isService: false,
    onUnInstall: () => {},
}

export const IsService = Template.bind({})

IsService.args = {
    ...Primary.args,
    isService: true,
    onResync: () => {},
    onDisable: () => {},
    onRestart: () => {},
}

export const CustomActions = Template.bind({})
CustomActions.args = {
    ...Primary.args,
    customActions: [
        {label: "Custom Action 1", color: "blue"},
        {label: "Custom Action 2", onClick: (_:PackageInfo) => console.log("click")}
    ]
}
