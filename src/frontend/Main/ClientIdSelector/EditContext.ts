import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type EditContextValueType = {
  editingId: string | undefined;
  setEditingId: Dispatch<SetStateAction<string | undefined>>;
};

const defaultValue: EditContextValueType = {
  editingId: undefined,
  setEditingId: () => {},
};

const EditContext = createContext(defaultValue);

export default EditContext;

export const useEditContext = () => useContext(EditContext);
