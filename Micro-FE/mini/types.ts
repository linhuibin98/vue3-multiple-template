import { AppStatus } from './enum'

export interface IAppInfo {
    name: string;
    entry: string;
    container: string;
    activeRule: string;
}

export interface IInternalAppInfo extends IAppInfo {
    status: AppStatus;
    bootstrap?: LifeCycle;
    mount?: LifeCycle;
    unmount?: LifeCycle;
    proxy: any;
}

export type EventType = 'hashchange' | 'popstate';

export type LifeCycle = (app: IAppInfo) => Promise<any>;

export interface ILifeCycle {
    beforeLoad?: LifeCycle | LifeCycle[];
    mounted?: LifeCycle | LifeCycle[];
    unmounted?: LifeCycle | LifeCycle[];
}