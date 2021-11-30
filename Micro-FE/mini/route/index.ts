import { EventType } from "../types";
import {
    runBootstrap,
    runBeforeLoad,
    runMounted,
    runUnmounted,
  } from '../lifeCycle';
  import { getAppListStatus } from '../utils';

// 劫持和 history 和 hash 相关的事件和函数
// 然后我们在劫持的方法里做一些自己的事情
// 比如说在 URL 发生改变的时候判断当前是否切换了子应用

// 保持原有方法
const originalPush = window.history.pushState;
const originalReplace = window.history.replaceState;

const capturedListeners: Record<EventType, Function[]> = {
  hashchange: [],
  popstate: [],
};

let historyEvent: PopStateEvent | null = null;
let lastUrl: string | null = null;

export const reroute = (url: string) => {
  if (url !== lastUrl) {
    const { actives, unmounts } = getAppListStatus();
    Promise.all(
      unmounts
        .map(async (app) => {
          await runUnmounted(app);
        })
        .concat(
          actives.map(async (app) => {
            await runBeforeLoad(app);
            await runBootstrap(app);
            await runMounted(app);
          })
        )
    ).then(() => {
      callCapturedListeners();
    });
  }
  lastUrl = url || location.href;
};

export const hijackRoute = () => {
  // 重写方法
  window.history.pushState = (...args) => {
    // 调用原有方法
    originalPush.apply(window.history, args);
    // URL 改变逻辑，实际就是如何处理子应用
    historyEvent = new PopStateEvent("popstate");
    // @ts-ignore
    args[2] && reroute(args[2]);
  };
  window.history.replaceState = (...args) => {
    originalReplace.apply(window.history, args);
    // URL 改变逻辑
    // ...
  };

  // 监听事件，触发 URL 改变逻辑
  window.addEventListener("hashchange", () => {});
  window.addEventListener("popstate", () => {});

  // 重写
  window.addEventListener = hijackEventListener(window.addEventListener);
  window.removeEventListener = hijackEventListener(window.removeEventListener);
};

function hijackEventListener(func: Function): any {
  return function (name: string, fn: Function) {
    // 如果是一下事件，保存回调函数
    if (name === "hashchange" || name === "popstate") {
      if (!hasListeners(name, fn)) {
        capturedListeners[name].push(fn);
        return;
      }
    } else {
      capturedListeners[name] = capturedListeners[name].filter(
        (listener) => listener !== fn
      );
    }
    return func.apply(window, arguments);
  };
}

function hasListeners(name: EventType, fn: Function) {
  return capturedListeners[name].filter((listener) => listener === fn);
}

export function cleanCapturedListeners() {
  capturedListeners["hashchange"] = [];
  capturedListeners["popstate"] = [];
}

// 后续渲染子应用后使用，用于执行之前保存的回调函数
export function callCapturedListeners() {
  if (historyEvent) {
    Object.keys(capturedListeners).forEach((eventName) => {
      const listeners = capturedListeners[eventName];
      if (listeners.length) {
        listeners.forEach((listener) => {
          // @ts-ignore
          listener.call(this, historyEvent);
        });
      }
    });
    historyEvent = null;
  }
}
