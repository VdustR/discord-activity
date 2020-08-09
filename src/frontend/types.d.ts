import { Presence } from "discord-rpc";

export type ClientConfig = {
  clientId: string;
  name: string;
  images: string[];
  form: Presence;
  formToggle: {
    startTimestamp: boolean;
    endTimestamp: boolean;
  };
};

export type StateType = {
  version: string;
  clientId?: string;
  clients: ClientConfig[];
};
