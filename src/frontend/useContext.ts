import { useContext as useNativeContext } from "react";
import Context from "./Context";

const useContext = () => useNativeContext(Context);

export default useContext;
