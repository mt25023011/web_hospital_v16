import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    isLoadingPosition: false,
    positions: [],
    isLoadingRole: false,
    roles: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log("FETCH_GENDER_START" , action);
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = {...state};
            copyState.genders = action.data;
            return {
                ...state,
                isLoadingGender: false,
                genders: action.data
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log("FETCH_GENDER_FAIL" , action);
            return {
                ...state,
                isLoadingGender: false,
                genders: []
            }
        case actionTypes.FETCH_POSITION_START:
            console.log("FETCH_POSITION_START" , action);
            return {
                ...state,
                isLoadingPosition: true
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyStatePosition = {...state};
            copyStatePosition.positions = action.data;
            return {
                ...state,
                isLoadingPosition: false,
                positions: action.data
            }
        case actionTypes.FETCH_POSITION_FAIL:
            console.log("FETCH_POSITION_FAIL" , action);
            return {
                ...state,
                isLoadingPosition: false,
                positions: []
            }
        case actionTypes.FETCH_ROLE_START:
            console.log("FETCH_ROLE_START" , action);
            return {
                ...state,
                isLoadingRole: true
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyStateRole = {...state};
            copyStateRole.roles = action.data;
            console.log("copyStateRole" , copyStateRole);
            return {
                ...state,
                isLoadingRole: false,
                roles: action.data
            }
        case actionTypes.FETCH_ROLE_FAIL:
            console.log("FETCH_ROLE_FAIL" , action);
            return {
                ...state,
                isLoadingRole: false,
                roles: []
            }
        case actionTypes.CREATE_USER_SUCCESS:
            console.log("CREATE_USER_SUCCESS" , action);
            return {
                ...state,
                isLoading: false,
                user: action.data
            }
        case actionTypes.CREATE_USER_FAIL:
            console.log("CREATE_USER_FAIL" , action);
            return {
                ...state,
                isLoading: false,
                user: null
            }

        default:
            return state;
    }
}

export default adminReducer;