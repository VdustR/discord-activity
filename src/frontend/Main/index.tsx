import useContext from "frontend/useContext";
import React, { memo } from "react";
import ActivityForm from "./ActivityForm";
import ClientIdSelector from "./ClientIdSelector";

const Main = () => {
  const { state } = useContext();
  return state.clientId ? <ActivityForm /> : <ClientIdSelector />;
};

export default memo(Main);
