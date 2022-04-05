// 设置子应用状态
export enum AppStatus {
    NOT_LOADED = 'NOT_LOADED',
    LOADING = "LOADING",
    LOADED = "LOADED",
    BOOTSTRAPPING = "BOOTSTRAPPING",
    NOT_MOUNTED = "NOT_MOUNTED",
    MOUNTING = "MOUNTING",
    MOUNTED = "MOUNTED",
    UNMOUNTING = "UNMOUNTING",
}