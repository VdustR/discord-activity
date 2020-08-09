import { StateType } from "frontend/types.d";
import { Dispatch, SetStateAction } from "react";
import pkg from "../../../package.json";

const defaultState: StateType = {
  version: pkg.version,
  clientId: undefined,
  clients: [],
};

export default {
  state: defaultState,
  setState: (() => {}) as Dispatch<SetStateAction<StateType>>,
};
