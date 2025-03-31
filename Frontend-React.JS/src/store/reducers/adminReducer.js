import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    isLoadingPosition: false,
    positions: [],
    isLoadingRole: false,
    roles: [],
    isLoading: false,
    users: [],
    isLoadingDeleteUser: false,
    deleteUser: null,
    isLoadingUpdateUser: false,
    updateUser: [],
    isLoadingAddDoctorInfo: false,
    addDoctorInfo: null
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            return {
                ...state,
                isLoadingGender: false,
                genders: action.data
            }
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
                isLoadingGender: false,
                genders: []
            }
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoadingPosition: true
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyStatePosition = { ...state };
            copyStatePosition.positions = action.data;
            return {
                ...state,
                isLoadingPosition: false,
                positions: action.data
            }
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
                isLoadingPosition: false,
                positions: []
            }
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoadingRole: true
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyStateRole = { ...state };
            copyStateRole.roles = action.data;
            return {
                ...state,
                isLoadingRole: false,
                roles: action.data
            }
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
                isLoadingRole: false,
                roles: []
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.data
            }
        case actionTypes.CREATE_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                user: null
            }
        case actionTypes.FETCH_ALL_USERS_START:
            return {
                ...state,
                isLoading: true,
                users: []
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.data

            }
        case actionTypes.FETCH_ALL_USERS_FAIL:
            return {
                ...state,
                isLoading: false,
                users: []
            }
        case actionTypes.FETCH_DELETE_USER_START:
            return {
                ...state,
                isLoadingDeleteUser: true
            }
        case actionTypes.FETCH_DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoadingDeleteUser: false,
                deleteUser: action.data
            }
        case actionTypes.FETCH_DELETE_USER_FAIL:
            return {
                ...state,
                isLoadingDeleteUser: false,
                deleteUser: null
            }
        case actionTypes.FETCH_UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoadingUpdateUser: false,
                updateUser: action.data
            }
        case actionTypes.FETCH_UPDATE_USER_FAIL:
            return {
                ...state,
                isLoadingUpdateUser: false,
                updateUser: null
            }        
        case actionTypes.FETCH_ADD_DOCTOR_INFO_SUCCESS:
            return {
                ...state,
                isLoadingAddDoctorInfo: false,
                addDoctorInfo: action.data
            }
        case actionTypes.FETCH_ADD_DOCTOR_INFO_FAIL:
            return {
                ...state,
                isLoadingAddDoctorInfo: false,
                addDoctorInfo: null
            }
        case actionTypes.FETCH_ADD_DOCTOR_INFO_START:
            return {
                ...state,
                isLoadingAddDoctorInfo: true
            }
            
            
            
        default:
            return state;

    }
}

export default adminReducer;