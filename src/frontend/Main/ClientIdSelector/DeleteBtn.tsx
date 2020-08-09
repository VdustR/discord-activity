import { IconButton } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import useContext from "frontend/useContext";
import React, { memo, useCallback } from "react";

const DeleteBtn = ({ id }: { id: string }) => {
  const { setState } = useContext();
  const del = useCallback(() => {
    setState((state) => ({
      ...state,
      clients: state.clients.filter((client) => client.clientId !== id),
    }));
  }, [id, setState]);
  return (
    <IconButton size="small" color="primary" onClick={del}>
      <DeleteIcon />
    </IconButton>
  );
};

export default memo(DeleteBtn);
