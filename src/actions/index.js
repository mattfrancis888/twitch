import streams from "../apis/streams";
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const createStream = (formValues) => async (dispatch) => {
    //Must use redux thunk because action creators must return a plain object.
    //And we are tyring to return const result = await axios.get(...) -> (eg; return {payload: result})
    //https://www.udemy.com/course/react-redux/learn/lecture/12586860#announcements
    // return async (dispatch) => {
    //     //dispatch and getState is automatically passed in by redux-thunk; dispatch acts like "return"
    // };
    const response = await streams.post("/streams", formValues);
    dispatch({
        type: CREATE_STREAM,
        payload: response.data,
    });
    //Axios returns a json object that you need to access via .data to get the data
    //post to streams array in db.json. Changing "/sterams" to other names will result in data
    //not updating to streams array
};