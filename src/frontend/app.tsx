import DateFnsUtils from "@date-io/date-fns";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  Grid,
  StylesProvider,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { css } from "emotion";
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Context from "./Context";
import defaultContextValue from "./Context/defaultContextValue";
import GlobalCss from "./GlobalCss";
import Main from "./Main";
import TitleBar from "./TitleBar";
import { StateType } from "./types.d";

const containerCss = css`
  label: container;
  background-color: #36393f;
`;

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#7289DA",
    },
  },
  typography: {
    fontFamily: [
      "Victor Mono",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const formatSavedData0: (state: StateType) => StateType = ({
  clients,
  ...state
}: StateType) => {
  return {
    ...state,
    clients: clients.map(
      ({ form: { startTimestamp, endTimestamp, ...form }, ...client }) => ({
        ...client,
        form: {
          ...form,
          ...(startTimestamp
            ? { startTimestamp: new Date(startTimestamp) }
            : null),
          ...(endTimestamp ? { endTimestamp: new Date(endTimestamp) } : null),
        },
      })
    ),
  };
};

const initState: StateType = (() => {
  const savedStr = localStorage.getItem("state");
  if (savedStr) {
    const savedJSON: StateType = JSON.parse(savedStr);
    if (savedJSON.version.split(".")[0] === "0")
      return formatSavedData0(savedJSON);
  }
  return defaultContextValue.state;
})();

const App = () => {
  const [state, setState] = useState(initState);
  const contextValue = useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  );
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
  return (
    <Context.Provider value={contextValue}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <GlobalCss />
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <TitleBar />
            <Container className={containerCss}>
              <Grid container spacing={2} wrap="nowrap" direction="column">
                <Grid item>
                  <Toolbar />
                </Grid>
                <Grid item>
                  <Main />
                </Grid>
                <Grid item />
              </Grid>
            </Container>
          </ThemeProvider>
        </StylesProvider>
      </MuiPickersUtilsProvider>
    </Context.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
