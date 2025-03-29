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

export const fetchDoctorList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchDoctorListStart());
            let res = await userService.getUserRole("R1", 10);
            if (res.data.status === 200) {
                dispatch(fetchDoctorListSuccess(res.data.data));
            } else {
                dispatch(fetchDoctorListFail(res.data.message));
            }
        } catch (error) {
            dispatch(fetchDoctorListFail(error));
        }
    }
}

export const fetchDoctorListSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_LIST_SUCCESS,
    data: data
})
export const fetchDoctorListFail = (error) => ({
    type: actionTypes.FETCH_DOCTOR_LIST_FAIL,
    error: error
})
export const fetchDoctorListStart = () => ({
    type: actionTypes.FETCH_DOCTOR_LIST_START,
    isLoading: true
})