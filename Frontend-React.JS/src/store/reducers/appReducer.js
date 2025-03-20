import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

// Lấy ngôn ngữ từ localStorage hoặc sử dụng giá trị mặc định
const getInitialLanguage = () => {
    try {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'vi';
    } catch (error) {
        console.error('Error reading language from localStorage:', error);
        return 'vi';
    }
}

const initialState = {
    started: true,
    language: getInitialLanguage(),
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE: 
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL: 
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }
        case 'CHANGE_LANGUAGE':
            try {
                localStorage.setItem('language', action.language);
            } catch (error) {
                console.error('Error saving language to localStorage:', error);
            }
            return {
                ...state,
                language: action.language,
            }
        default:
            return state;
    }
}

export default appReducer;