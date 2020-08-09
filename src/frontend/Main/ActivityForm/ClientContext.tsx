import { ClientConfig } from "frontend/types";
import { createContext, useContext } from "react";

const ClientContext = createContext({} as ClientConfig);

export const useClient = () => useContext(ClientContext);

export default ClientContext;
