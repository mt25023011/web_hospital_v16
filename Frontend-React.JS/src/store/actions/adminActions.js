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
                return {
                    status: 201,
                    message: "Create user successfully",
                    data: res.data
                };
            } else {
                dispatch(createUserFail(res.message));
                return {
                    status: 400,
                    message: res.message
                };
            }
        } catch (error) {
            console.log("error", error);
            dispatch(createUserFail(error));
            return { status: 400, message: error };
        }
    }
}

export const createUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    status: 201,
    message: "Create user successfully",
    data: data
})

export const createUserFail = (error) => ({
    type: actionTypes.CREATE_USER_FAIL,
    status: 400,
    message: error
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
            let users = {
                data: res,
                isLoading: false,
                message: "Fetch all users successfully"
            }
            console.log("users", users);
            if (users && users.data) {
                dispatch(fetchAllUsersSuccess(users.data.data));
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
    data: data,
    isLoading: false,
    status: data.status,
    message: data.message
})

export const deleteUserFail = (error) => ({
    type: actionTypes.FETCH_DELETE_USER_FAIL,
    error: error
})

export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUser(id);
            let users = {
                status: res.status,
                message: res.message
            }
            console.log("users", users);
            if (users && users.status === 200) {
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
            let users = {
                status: res.status,
                message: res.message
            }
            console.log("users", users);
            if (users && users.status === 200) {
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


//add doctor info
export const addDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_ADD_DOCTOR_INFO_SUCCESS,
    data: data
})

export const addDoctorInfoFail = (error) => ({
    type: actionTypes.FETCH_ADD_DOCTOR_INFO_FAIL,
    error: error
})

export const addDoctorInfoStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.addDoctorInfo(data);
            console.log('res', res);
            
            if (res && res.data) {
                dispatch(addDoctorInfoSuccess(res.data));
                return {
                    status: 200,
                    message: res.data.message || "Add doctor information successfully",
                    data: res.data
                };
            } else {
                const errorMessage = res.data?.message || "Error adding doctor information";
                dispatch(addDoctorInfoFail(errorMessage));
                return {
                    status: 400,
                    message: errorMessage
                };
            }
        } catch (error) {
            console.log("error", error);
            const errorMessage = error.response?.data?.message || error.message || "Error adding doctor information";
            dispatch(addDoctorInfoFail(errorMessage));
            return {
                status: 400,
                message: errorMessage
            };
        }
    }
}