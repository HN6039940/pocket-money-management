import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
