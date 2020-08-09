import { IconButton } from "@material-ui/core";
import { Forward as ForwardIcon } from "@material-ui/icons";
import useContext from "frontend/useContext";
import React, { memo, useCallback } from "react";

const EnterBtn = ({ id }: { id: string }) => {
  const { setState } = useContext();
  const go = useCallback(() => {
    setState((state) => ({ ...state, clientId: id }));
  }, [id, setState]);
  return (
    <IconButton size="small" color="primary" onClick={go}>
      <ForwardIcon />
    </IconButton>
  );
};

export default memo(EnterBtn);
