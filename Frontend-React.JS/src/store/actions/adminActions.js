import actionTypes from './actionTypes';
import userService from "../../services/userService";

export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const createUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createUser(data);
            if (res && res.status === 201) {
                dispatch(createUserSuccess(res.data));
            } else {
                dispatch(createUserFail(res.data));
            }
        } catch (error) {
            console.log("error", error);
            dispatch(createUserFail(error));
        }
    }
}

export const createUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data
})

export const createUserFail = (error) => ({
    type: actionTypes.CREATE_USER_FAIL,
    error: error
})


export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})
export const fetchGenderFail = (error) => ({
    type: actionTypes.FETCH_GENDER_FAIL,
    error: error
})
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodesService("GENDER");
            if (res && res.data) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail(res.data));
            }
        } catch (error) {
            console.log("error", error);
            dispatch(fetchGenderFail(error));
        }
    }
}

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
})
export const fetchPositionFail = (error) => ({
    type: actionTypes.FETCH_POSITION_FAIL,
    error: error
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodesService("POSITION");
            if (res && res.data) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail(res.data));
            }
        } catch (error) {
            console.log("error", error);
            dispatch(fetchPositionFail(error));
        }
    }
}

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})
export const fetchRoleFail = (error) => ({
    type: actionTypes.FETCH_ROLE_FAIL,
    error: error
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodesService("ROLE");
            if (res && res.data) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail(res.data));
            }
        } catch (error) {
            console.log("error", error);
            dispatch(fetchRoleFail(error));
        }
    }
}

