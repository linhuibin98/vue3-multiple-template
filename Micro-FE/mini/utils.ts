import { IInternalAppInfo } from "./types";
import { getAppList } from './appList';
import { AppStatus } from './enum';
import { match } from 'path-to-regexp';

export const getAppListStatus = () => {
  const actives: IInternalAppInfo[] = [];
  const unmounts: IInternalAppInfo[] = [];

  const list = getAppList() as IInternalAppInfo[];
  list.forEach((app) => {
    const isActive = match(app.activeRule, { end: false })(location.pathname);
    switch (app.status) {
      case AppStatus.NOT_LOADED:
      case AppStatus.LOADING:
      case AppStatus.LOADED:
      case AppStatus.BOOTSTRAPPING:
      case AppStatus.NOT_MOUNTED:
        isActive && actives.push(app);
        break;
      case AppStatus.MOUNTED:
        !isActive && unmounts.push(app);
        break;
    }
  });

  return { actives, unmounts };
};
