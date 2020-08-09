import {
  AppBar,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  AddCircle as AddCircleIcon,
  Close as CloseIcon,
  Save as SaveIcon,
} from "@material-ui/icons";
import { css } from "emotion";
import TextField from "frontend/components/TextField";
import { ClientConfig } from "frontend/types.d";
import useContext from "frontend/useContext";
import React, {
  ChangeEvent,
  Fragment,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useEditContext } from "./EditContext";

const EditDialog = (() => {
  const cssTitle = css`
    label: title;
    flex: 1;
  `;
  const cssNewImageNameBlock = css`
    label: newImageNameBlock;
    flex: 1;
  `;
  const EditDialog = ({ client }: { client: ClientConfig }) => {
    const { state, setState } = useContext();
    const restClients = useMemo(
      () =>
        state.clients.filter((target) => target.clientId !== client.clientId),
      [client.clientId, state.clients]
    );
    const restNames = useMemo(() => restClients.map((client) => client.name), [
      restClients,
    ]);
    const [name, setName] = useState(client.name);
    const handleChangeName = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      []
    );
    const nameConflicted = useMemo(() => restNames.includes(name), [
      name,
      restNames,
    ]);
    const nameError = useMemo(() => nameConflicted || !name, [
      name,
      nameConflicted,
    ]);
    const [newImage, setNewImage] = useState("");
    const handleChangeImage = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setNewImage(e.target.value);
      },
      []
    );
    const [images, setImages] = useState(client.images);
    const addImage = useCallback(() => {
      setImages((images) => [...images, newImage]);
      setNewImage("");
    }, [newImage]);
    const deleteImage = useCallback(
      (image: string) =>
        setImages((images) => images.filter((target) => image !== target)),
      []
    );
    const imageConflicted = useMemo(() => images.includes(newImage), [
      images,
      newImage,
    ]);
    const { setEditingId } = useEditContext();
    const close = useCallback(() => {
      setEditingId(undefined);
    }, [setEditingId]);
    const save = useCallback(() => {
      const editedClient: ClientConfig = {
        ...client,
        clientId: client.clientId,
        name,
        images,
      };
      setState(({ clients, ...state }) => ({
        ...state,
        clients: clients.map((target) =>
          target.clientId === client.clientId ? editedClient : target
        ),
      }));
      close();
    }, [client, close, images, name, setState]);
    const saveDisabled = useMemo(() => nameError, [nameError]);
    return (
      <Dialog open fullScreen>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={close}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={cssTitle}>
              Edit - {client.name}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={save}
              disabled={saveDisabled}
            >
              <SaveIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container spacing={1} wrap="nowrap" direction="column">
            <Grid item>
              <Toolbar />
            </Grid>
            <Grid item>
              <TextField
                label="Name"
                value={name}
                onChange={handleChangeName}
                error={nameError}
                helperText={nameConflicted ? "Conflicted" : " "}
                required
              />
            </Grid>
            <Grid item>
              <Grid container spacing={1} wrap="nowrap" direction="column">
                <Grid item>
                  <Typography variant="h6">Images</Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item className={cssNewImageNameBlock}>
                      <TextField
                        label="New Image"
                        value={newImage}
                        onChange={handleChangeImage}
                        error={imageConflicted}
                        helperText={imageConflicted ? "Conflicted" : " "}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={addImage}
                        color="primary"
                        disabled={imageConflicted}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {images.length === 0 ? (
                    <Typography>No images.</Typography>
                  ) : (
                    <Grid container spacing={1}>
                      {images.map((image) => (
                        <Grid item key={image}>
                          <Chip
                            label={image}
                            onDelete={() => deleteImage(image)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  return memo(EditDialog);
})();

const Edit = ({ id }: { id: string }) => {
  const { state } = useContext();
  const client = useMemo(
    () => state.clients.find((client) => client.clientId === id),
    [id, state.clients]
  );
  return !client ? <Fragment /> : <EditDialog client={client} />;
};

export default memo(Edit);
