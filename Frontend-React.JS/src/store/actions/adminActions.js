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

//create user
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

//fetch gender
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

//fetch position
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

//fetch role
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

//fetch all users
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: data
})
export const fetchAllUsersFail = (error) => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL,
    error: error
})
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers();
            let users={
                data: res,
                isLoading: false,
                message: "Fetch all users successfully"
            }
            if (users&&users.data) {
                dispatch(fetchAllUsersSuccess(users.data));
            } else {
                dispatch(fetchAllUsersFail(users.data));
            }
        } catch (error) {
            console.log("error", error);
            dispatch(fetchAllUsersFail(error));
        }
    }
}

//delete user
export const deleteUserSuccess = (data) => ({
    type: actionTypes.FETCH_DELETE_USER_SUCCESS,
    data: data
})

export const deleteUserFail = (error) => ({
    type: actionTypes.FETCH_DELETE_USER_FAIL,
    error: error
})

export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUser(id);
            let users={
                status: res.status,
                message: res.message
            }
            console.log("users", users);
            if (users&&users.status===200) {
                dispatch(deleteUserSuccess(users));
            } else {
                dispatch(deleteUserFail(users));
            }
        } catch (error) {
            console.log("error", error);
            dispatch(deleteUserFail(error));
        }
    }
}

//update user
export const updateUserSuccess = (data) => ({
    type: actionTypes.FETCH_UPDATE_USER_SUCCESS,
    data: data
})

export const updateUserFail = (error) => ({
    type: actionTypes.FETCH_UPDATE_USER_FAIL,
    error: error
})

export const updateUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.updateUser(data);   
            let users={
                status: res.status,
                message: res.message
            }
            console.log("users", users);
            if (users&&users.status===200) {
                dispatch(updateUserSuccess(users));
            } else {
                dispatch(updateUserFail(users));
            }
        } catch (error) {
            console.log("error", error);
            dispatch(updateUserFail(error));
        }
    }
}


