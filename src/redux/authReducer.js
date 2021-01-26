import * as ACTIONS from './Constants';

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    password: undefined,
    fileId: undefined,
    template: undefined,
    taxId: undefined,
    invoiceId: undefined,
    trackId: undefined,
    amount: undefined,
    isSuccess: undefined,
    isTemplateSuccess: undefined
}



const authReducer = (state = {...defaultState}, action) => {


    if(action.type === ACTIONS.LOGOUT_SUCCESS){
        return defaultState;
    }

    if(action.type === ACTIONS.TEMPLATE_SUCCESS){
        return {
            ...state,
            template: action.payload,
            isTemplateSuccess: true,
            isSuccess: undefined
        };
    }



    if(action.type === ACTIONS.TEMPLATE_RESET){
        return {
            ...state,
            isTemplateSuccess: undefined
        };
    }

    if(action.type === ACTIONS.TEMPLATE_CHANGE){
        return {
            ...state,
            template: action.payload,
            isTemplateSuccess: undefined
        };
    }

    else if(action.type === ACTIONS.OCR_SUCCESS){
        return {
            ...state,
            ...action.payload,
            isSuccess: true,
            isTemplateSuccess: undefined
        };
    }

   else if(action.type === ACTIONS.LOGIN_SUCCESS){
        return {
            ...state,
            ...action.payload,
            isLoggedIn: true
        };
    }

    else if(action.type === ACTIONS.UPLOAD_SUCCESS){
        return {
            ...state,
            fileId: action.payload.id
        };
    }
    return state;
}

export default authReducer;