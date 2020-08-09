import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";
import TextField from "frontend/components/TextField";
import { ClientConfig } from "frontend/types.d";
import useContext from "frontend/useContext";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import DeleteBtn from "./DeleteBtn";
import Edit from "./Edit";
import EditBtn from "./EditBtn";
import EditContext, { EditContextValueType } from "./EditContext";
import EnterBtn from "./EnterBtn";

const ClientIdSelector = () => {
  const [newId, setNewId] = useState("");
  const handleChangeNewId = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setNewId(e.target.value),
    []
  );
  const [newName, setNewName] = useState("");
  const handleChangeNewName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value),
    []
  );
  const { state, setState } = useContext();
  const create = useCallback(() => {
    const newClient: ClientConfig = {
      clientId: newId,
      name: newName,
      images: [],
      form: {},
      formToggle: {
        startTimestamp: false,
        endTimestamp: false,
      },
    };
    setState((state) => ({ ...state, clients: [...state.clients, newClient] }));
    setNewId("");
    setNewName("");
  }, [newId, newName, setState]);
  const clientIds = useMemo(
    () => state.clients.map((client) => client.clientId),
    [state.clients]
  );
  const idConflicted = useMemo(() => clientIds.includes(newId), [
    clientIds,
    newId,
  ]);
  const names = useMemo(() => state.clients.map((client) => client.name), [
    state.clients,
  ]);
  const nameConflicted = useMemo(() => names.includes(newName), [
    names,
    newName,
  ]);
  const createButtonDisabled = useMemo(
    () => !newId || !newName || idConflicted || nameConflicted,
    [idConflicted, nameConflicted, newId, newName]
  );
  const [editingId, setEditingId] = useState(undefined as undefined | string);
  const editContextValue: EditContextValueType = useMemo(
    () => ({
      editingId,
      setEditingId,
    }),
    [editingId]
  );
  return (
    <EditContext.Provider value={editContextValue}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                label="New Client Id"
                value={newId}
                onChange={handleChangeNewId}
                error={idConflicted}
                helperText={idConflicted ? "Conflicted" : " "}
                required
              />
            </TableCell>
            <TableCell>
              <TextField
                label="New Name"
                value={newName}
                onChange={handleChangeNewName}
                error={nameConflicted}
                helperText={nameConflicted ? "Conflicted" : " "}
                required
              />
            </TableCell>
            <TableCell>
              <IconButton
                disabled={createButtonDisabled}
                color="primary"
                onClick={create}
              >
                <AddCircleIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          {state.clients.map((client) => (
            <TableRow key={client.clientId}>
              <TableCell>{client.clientId}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>
                <Grid container spacing={1} wrap="nowrap">
                  <Grid item>
                    <EnterBtn id={client.clientId} />
                  </Grid>
                  <Grid item>
                    <EditBtn id={client.clientId} />
                  </Grid>
                  <Grid item>
                    <DeleteBtn id={client.clientId} />
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {editingId && <Edit id={editingId} key={editingId} />}
      </Table>
    </EditContext.Provider>
  );
};

export default memo(ClientIdSelector);
