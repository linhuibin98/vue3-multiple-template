import { IAppInfo, ILifeCycle } from './types';
import { setAppList } from './appList';
import { setLifeCycle } from './lifeCycle';

export const registerMicroApps = (appList: IAppInfo[], lifeCycle?: ILifeCycle) => {
    setAppList(appList);
    lifeCycle && setLifeCycle(lifeCycle);
}
