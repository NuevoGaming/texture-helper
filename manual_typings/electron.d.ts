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
}