import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isLoadingDoctorDetail: false,
    doctorDetail: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.FETCH_DOCTOR_LIST_START:
            return {
                ...state,
                isLoadingDoctorList: true
            }
        case actionTypes.FETCH_DOCTOR_LIST_SUCCESS:
            return {
                ...state,
                isLoadingDoctorList: false,
                doctorList: action.data
            }
        case actionTypes.FETCH_DOCTOR_LIST_FAIL:
            return {
                ...state,
                isLoadingDoctorList: false,
                doctorList: []
            }
        case actionTypes.FETCH_DOCTOR_DETAIL_START:
            return {
                ...state,
                isLoadingDoctorDetail: true
            }
        case actionTypes.FETCH_DOCTOR_DETAIL_SUCCESS:
            return {
                ...state,
                isLoadingDoctorDetail: false,
                doctorDetail: action.data
            }
        case actionTypes.FETCH_DOCTOR_DETAIL_FAIL:
            return {
                ...state,
                isLoadingDoctorDetail: false,
                doctorDetail: null
            }
        default:
            return state;
    }
}

export default appReducer;