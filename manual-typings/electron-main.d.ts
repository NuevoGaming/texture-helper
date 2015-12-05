// Type definitions for electron 'main' process

declare namespace Electron {
    export interface IPCSender {
      send(channel: string, ...args: any[]): void;
    }

    export interface IPCEvent {
      returnValue: any;
      sender: IPCSender;
    }

    export interface IPC {
      on(channel: string, callback: (event: IPCEvent, ...args: any[]) => void): void;
      send(channel: string, ...args: any[]): void;
      sendSync(channel: string, ...args: any[]): any;
    }

    export interface Dialog {
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

    export interface IWebContents {
        openDevTools(): void;
    }

    export interface BrowserWindowOptions {
      width?: number,
      height?: number,
      resizable?: boolean
    }

    export interface BrowserWindow {
      new(opts: BrowserWindowOptions): BrowserWindow;
      loadUrl(url: string): void;
      webContents: IWebContents;
      on(eventName: string, handler: () => void): void;
      close(): void;
    }

    export interface App {
      quit(): void;
      getPath(name: string): string;
    }
}

declare module "ipc" {
  const module: Electron.IPC;
  export = module;
}

declare module "dialog" {
  const module: Electron.Dialog;
  export = module;
}

declare module "browser-window" {
  const module: Electron.BrowserWindow;
  export = module;
}

declare module "app" {
  const module: Electron.App;
  export = module;
}
