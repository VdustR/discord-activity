import { IconButton } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import React, { memo, useCallback, useMemo } from "react";
import { useEditContext } from "./EditContext";

const EditBtn = ({ id }: { id: string }) => {
  const { editingId, setEditingId } = useEditContext();
  const setEdit = useCallback(() => {
    setEditingId(id);
  }, [id, setEditingId]);
  const disabled = useMemo(() => editingId === id, [editingId, id]);
  return (
    <IconButton
      size="small"
      color="primary"
      onClick={setEdit}
      disabled={disabled}
    >
      <EditIcon />
    </IconButton>
  );
};

export default memo(EditBtn);
