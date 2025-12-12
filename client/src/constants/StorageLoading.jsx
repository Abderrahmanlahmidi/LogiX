import { useDispatch } from "react-redux";
import { loadUserFromLocalStorage } from "../store/slices/authSlice";
import { useEffect } from "react";


export const StorageLoading = () => {  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, []); 
}