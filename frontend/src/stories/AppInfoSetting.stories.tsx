import React from 'react'
import {
    AppInfoSetting,
    AppInfoSettingProps,
} from '../components/AppInfoSetting'

import { ComponentMeta } from '@storybook/react'

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
