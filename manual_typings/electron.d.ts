// Type definitions for electron

declare namespace Electron {
    export interface IBrowserWindow {
        loadUrl(url: string): void;
        webContents: IWebContents;
        on(eventName: string, handler: () => void): void;
    }

    export interface IWebContents {
        openDevTools(): void;
    }

    export interface IIpc {
      on(channel: string, callback: () => void): void;
      send(channe: string, ...args: any[]): void;
    }

    export interface IDialog {
      showOpenDialog(window?: any, options?:any): void;
    }

    export interface OpenDialogFilter {
      name: string;
      extensions: string[];
    }

    export interface OpenDialogOptions {
      title?: string;
      defaultPath?: string;
      filters?: OpenDialogFilter[];
      properties?: string[]
    }

    export interface IElectronModule {
        ipcRenderer: IIpc;
        ipcMain: IIpc;
        dialog: IDialog;
    }
}

declare module "ipc" {
  const module: Electron.IIpc;
  export = module;
}

declare module "dialog" {
  const module: Electron.IDialog;
  export = module;
}
