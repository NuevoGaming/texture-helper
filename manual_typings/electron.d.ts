// Type definitions for electron

declare namespace Electron {
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

    export interface IWebContents {
        openDevTools(): void;
    }

    export interface BrowserWindowOptions {
      width?: number,
      height?: number,
      resizable?: boolean
    }

    export interface IBrowserWindow {
      new(opts: BrowserWindowOptions): IBrowserWindow;
      loadUrl(url: string) : void;
      webContents: IWebContents;
      on(eventName: string, handler: () => void): void;
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

declare module "browser-window" {
  const module: Electron.IBrowserWindow;
  export = module;
}
