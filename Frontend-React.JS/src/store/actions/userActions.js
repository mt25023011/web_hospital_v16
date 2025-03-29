import actionTypes from './actionTypes';
import userService from '../../services/userService';
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})
export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

//user role get
export const fetchUserRoleSuccess = (data) => ({
    type: actionTypes.FETCH_USER_ROLE_SUCCESS,
    data: data
})
export const fetchUserRoleFail = (error) => ({
    type: actionTypes.FETCH_USER_ROLE_FAIL,
    error: error
})
export const fetchUserRoleStart = () => ({
    type: actionTypes.FETCH_USER_ROLE_START,
    isLoading: true
})

export const fetchUserRole = () => {
    return async (dispatch, getState) => {
        dispatch(fetchUserRoleStart());
        try {
            let res = await userService.getUserRole("R1", 10);
            console.log("res", res);
            let userwithRole = {
                data: res.data.data,
                isLoading: false,
                message: "Fetch user role successfully",
                status: res.data.status
            };
            console.log("userwithRole", userwithRole);
            if (res.status === 200) {
                dispatch(fetchUserRoleSuccess(userwithRole));
            } else {
                dispatch(fetchUserRoleFail(res));
            }
        } catch (error) {
            dispatch(fetchUserRoleFail(error));
        }
    }
}


