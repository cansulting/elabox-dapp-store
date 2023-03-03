/// <reference types="react" />
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppDashboard, AppDashboardProps } from '../../components/v2';
declare const _default: ComponentMeta<(props: AppDashboardProps) => JSX.Element>;
export default _default;
export declare const Primary: ComponentStory<(props: AppDashboardProps) => JSX.Element>;
export declare const DownloadableApp: ComponentStory<typeof AppDashboard>;
export declare const DownloadingApp: ComponentStory<typeof AppDashboard>;
export declare const InstallingApp: ComponentStory<typeof AppDashboard>;
export declare const UninstallingApp: ComponentStory<typeof AppDashboard>;
export declare const ErrorDownloadingApp: ComponentStory<typeof AppDashboard>;
export declare const CompleteDownloadingApp: ComponentStory<typeof AppDashboard>;
export declare const RealData: ComponentStory<typeof AppDashboard>;
