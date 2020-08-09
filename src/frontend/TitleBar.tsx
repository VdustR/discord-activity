import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import {
  Close as CloseIcon,
  SportsEsports as SportsEsportsIcon,
} from "@material-ui/icons";
import { ipcRenderer } from "electron";
import { css } from "emotion";
import React, { memo, useCallback, useEffect, useState } from "react";
import useContext from "./useContext";

const cssAppBar = css`
  label: appBar;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  flex: 1;
`;

const cssTitle = css`
  label: title;
  flex: 1;
`;

const disconnect = () => ipcRenderer.sendSync("disconnect");

const TitleBar = () => {
  const { state, setState } = useContext();
  const [connected, setConnected] = useState(
    ipcRenderer.sendSync("isConnected")
  );
  const closeActivityPage = useCallback(() => {
    setState((state) => ({ ...state, clientId: undefined }));
  }, [setState]);
  useEffect(() => {
    ipcRenderer.on("connected", () => {
      setConnected(true);
    });
    ipcRenderer.on("disconnected", () => {
      setConnected(false);
    });
  }, []);
  return (
    <AppBar className={cssAppBar}>
      <Toolbar className={cssAppBar}>
        {!state.clientId ? null : (
          <IconButton edge="start" color="inherit" onClick={closeActivityPage}>
            <CloseIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={cssTitle}>
          Discord Activity
        </Typography>
        {!connected ? null : (
          <IconButton edge="end" color="inherit" onClick={disconnect}>
            <SportsEsportsIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(TitleBar);
