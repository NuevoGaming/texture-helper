// Type definitions for electron 'renderer' process

declare namespace Electron {
  export interface IPC {
    on(channel: string, callback: (...args: any[]) => void): void;
    send(channel: string, ...args: any[]): void;
    sendSync(channel: string, ...args: any[]): any;
  }

  export interface ElectronModule {
    ipcRenderer: IPC;
  }
}

declare module "electron" {
  const module: Electron.ElectronModule;
  export = module;
}
