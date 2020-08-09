import DiscordRPC, { Client, Presence } from "discord-rpc";
import { getWin } from "./app";

const login = (clientId: string) =>
  new Promise(
    async (
      resolve: (value: Client) => void,
      reject: (reason: Error) => void
    ) => {
      const rpc = new DiscordRPC.Client({ transport: "ipc" });
      let isTimeout = false;
      const timeout = setTimeout(() => {
        isTimeout = true;
        try {
          reject(new Error("timeout"));
          rpc.destroy();
        } catch (e) {}
      }, 3000);
      try {
        await rpc.login({ clientId });
        clearTimeout(timeout);
        if (isTimeout) return;
        resolve(rpc);
      } catch (e) {
        clearTimeout(timeout);
        if (isTimeout) return;
        reject(e);
      }
      // rpc.once("ready", () => {
      //   console.log("ready");
      //   if (!rpc) throw new Error("rpc does not exist");
      //   clearTimeout(timeout);
      //   if (isTimeout) return;
      //   resolve(rpc);
      // });
      // rpc.once("connected", () => {
      //   console.log("connected");
      // });
    }
  );

class DiscordActivity {
  #clientId?: string;
  #rpc?: Client;
  sendMessageToWin(channel: string, ...args: any[]) {
    const win = getWin();
    win?.webContents?.send(channel, ...args);
  }

  async setActivity(clientId: string, activity: Presence) {
    if (clientId !== this.#clientId) {
      await this.destroyRpc();
    }
    const rpc: Client =
      this.#rpc && clientId === this.#clientId
        ? this.#rpc
        : await login(clientId);
    console.log("login success");
    await rpc.setActivity(activity);
    console.log("set activity success");
    this.setRpc(clientId, rpc);
    return rpc;
  }

  setRpc(clientId: string, rpc: Client) {
    this.#clientId = clientId;
    this.#rpc = rpc;
    const win = getWin();
    if (win) {
      win.webContents.send("connected");
    }
  }

  clearRpc() {
    this.#clientId = undefined;
    this.#rpc = undefined;
    const win = getWin();
    if (win) {
      win.webContents.send("disconnected");
    }
  }

  async destroyRpc() {
    console.log("destroy");
    if (!this.#rpc) return;
    try {
      await this.#rpc.clearActivity();
      await this.#rpc.destroy();
    } catch (e) {
      console.error(e);
    }
    this.clearRpc();
  }

  get isConnecting() {
    return Boolean(this.#rpc);
  }
}

export default DiscordActivity;
