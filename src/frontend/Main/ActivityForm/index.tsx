import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Presence } from "discord-rpc";
import { ipcRenderer } from "electron";
import { ClientConfig } from "frontend/types.d";
import useContext from "frontend/useContext";
import React, { Fragment, memo, useCallback, useMemo, useState } from "react";
import { Form as FinalForm } from "react-final-form";
import ClientContext from "./ClientContext";
import Form from "./Form";

const ActivityForm = () => {
  const { state, setState } = useContext();
  const client = useMemo(
    () => state.clients.find((client) => client.clientId === state.clientId),
    [state.clientId, state.clients]
  );
  const setClient = useCallback(
    (client: ClientConfig) => {
      setState((state) => ({
        ...state,
        clients: state.clients.map((target) =>
          target.clientId === state.clientId ? client : target
        ),
      }));
    },
    [setState]
  );
  const initialValues = useMemo(
    () => ({
      form: client?.form,
      formToggle: client?.formToggle,
    }),
    [client]
  );

  const [err, setErr] = useState(undefined as undefined | Error);
  const clearErr = useCallback(() => {
    setErr(undefined);
  }, []);

  const onSubmit = useCallback(
    ({
      form,
      formToggle,
    }: {
      form: ClientConfig["form"];
      formToggle: ClientConfig["formToggle"];
    }) => {
      const activity: Presence = { ...form };
      if (!formToggle.startTimestamp) delete activity.startTimestamp;
      if (!formToggle.endTimestamp) delete activity.endTimestamp;
      if (Number.isNaN(activity.partyMax)) delete activity.partyMax;
      if (Number.isNaN(activity.partySize)) delete activity.partySize;
      const err = ipcRenderer.sendSync("activity", state.clientId, activity);
      if (err) {
        console.error("err", err);
        setErr(err);
      } else if (client) {
        setClient({
          ...client,
          form: activity,
          formToggle,
        });
      }
    },
    [client, setClient, state.clientId]
  );

  console.log("initialValues", initialValues);
  return (
    <Fragment>
      {!client ? null : (
        <FinalForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ClientContext.Provider value={client}>
                <Form />
              </ClientContext.Provider>
            </form>
          )}
        />
      )}
      <Snackbar
        open={Boolean(err)}
        key={err?.message}
        autoHideDuration={6000}
        onClose={clearErr}
      >
        <Alert onClose={clearErr} severity="error">
          {err?.message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default memo(ActivityForm);
