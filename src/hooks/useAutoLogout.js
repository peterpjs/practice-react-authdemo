import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logout} from "../store/reducer/authSlice";

const useAutoLogout=()=>{
    const auth=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    useEffect(()=>{
        const timeout=auth.expirationTime-Date.now();
        if(timeout<6000){
            dispatch(logout())
            return;
        }
        const timer=setTimeout(()=>{
            dispatch(logout())
        },timeout);
        return ()=>{
            clearTimeout(timer);
        }
    },[auth]);

}

export default useAutoLogout
