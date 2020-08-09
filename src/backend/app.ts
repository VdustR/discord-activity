import { Presence } from "discord-rpc";
import { app, BrowserWindow, ipcMain, Tray } from "electron";
import path from "path";
import DiscordActivity from "./DiscordActivity";

const discordActivity = new DiscordActivity();

ipcMain.on("activity", async (event, clientId: string, activity: Presence) => {
  console.log(event, clientId, activity);
  try {
    await discordActivity.setActivity(clientId, activity);
    event.returnValue = null;
  } catch (e) {
    console.log("error", e);
    event.returnValue = e;
  }
});

ipcMain.on("isConnected", async (event) => {
  event.returnValue = discordActivity.isConnecting;
});

ipcMain.on("disconnect", async (event) => {
  discordActivity.destroyRpc();
  event.returnValue = null;
});

let win: null | BrowserWindow = null;

const AppTitle = "Discord Activity";

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  const createWin = () => {
    if (win) {
      throw new Error("there should be only one window");
    }
    return new Promise((resolve, reject) => {
      win = new BrowserWindow({
        icon: path.resolve(__dirname, "../../assets/tray@5x.png"),
        // useContentSize: true,
        width: 512,
        height: 512,
        title: AppTitle,
        backgroundColor: "#2f3136",
        darkTheme: true,
        titleBarStyle: "hidden",
        webPreferences: {
          nodeIntegration: true,
          defaultFontFamily: {
            standard: "victormono",
          },
        },
        autoHideMenuBar: true,
      });

      win.loadFile("./index.html");

      win.once("ready-to-show", () => {
        resolve(win);
      });

      win.on("close", () => {
        win = null;
      });

      // Open the DevTools.
      if (process.env.NODE_ENV !== "production") {
        win.webContents.openDevTools();
      }
    });
  };

  // because typescript can't regard statement right in async functions
  const getWin = () => win;

  const activeWin = async () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    } else {
      await createWin();
      getWin()?.webContents.send("");
    }
  };

  let tray = null;
  const createTray = () => {
    tray = new Tray(path.join(__dirname, "../../assets/tray.png"));
    tray.setToolTip(AppTitle);
    tray.on("click", activeWin);
  };

  app.on("second-instance", () => {
    activeWin();
  });

  const run = async () => {
    try {
      await app.whenReady();
      activeWin();
      createTray();

      // Quit when all windows are closed.
      app.on("window-all-closed", () => {
        // if (process.platform !== "darwin") {
        // app.quit();
        // }
      });

      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          activeWin();
        }
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  run();
}

const getWin = () => win;

export { getWin };
