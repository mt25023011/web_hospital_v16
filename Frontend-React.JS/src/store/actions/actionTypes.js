const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',

    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',
    FETCH_GENDER_START: 'FETCH_GENDER_START',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',
    FETCH_POSITION_START: 'FETCH_POSITION_START',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',
    FETCH_ROLE_START: 'FETCH_ROLE_START',

    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAIL: 'FETCH_ALL_USERS_FAIL',
    FETCH_ALL_USERS_START: 'FETCH_ALL_USERS_START',

    FETCH_DELETE_USER_SUCCESS: 'FETCH_DELETE_USER_SUCCESS',
    FETCH_DELETE_USER_FAIL: 'FETCH_DELETE_USER_FAIL',
    FETCH_DELETE_USER_START: 'FETCH_DELETE_USER_START',

    FETCH_UPDATE_USER_SUCCESS: 'FETCH_UPDATE_USER_SUCCESS',
    FETCH_UPDATE_USER_FAIL: 'FETCH_UPDATE_USER_FAIL',
    FETCH_UPDATE_USER_START: 'FETCH_UPDATE_USER_START',

    //userDoctorList
    FETCH_DOCTOR_LIST_SUCCESS: 'FETCH_DOCTOR_LIST_SUCCESS',
    FETCH_DOCTOR_LIST_FAIL: 'FETCH_DOCTOR_LIST_FAIL',
    FETCH_DOCTOR_LIST_START: 'FETCH_DOCTOR_LIST_START',

    //doctorInfo
    FETCH_ADD_DOCTOR_INFO_SUCCESS: 'FETCH_ADD_DOCTOR_INFO_SUCCESS',
    FETCH_ADD_DOCTOR_INFO_FAIL: 'FETCH_ADD_DOCTOR_INFO_FAIL',
    FETCH_ADD_DOCTOR_INFO_START: 'FETCH_ADD_DOCTOR_INFO_START',

    //doctorDetail
    FETCH_DOCTOR_DETAIL_SUCCESS: 'FETCH_DOCTOR_DETAIL_SUCCESS',
    FETCH_DOCTOR_DETAIL_FAIL: 'FETCH_DOCTOR_DETAIL_FAIL',
    FETCH_DOCTOR_DETAIL_START: 'FETCH_DOCTOR_DETAIL_START',
})

export default actionTypes;