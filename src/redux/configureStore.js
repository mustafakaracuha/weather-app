import { createStore, applyMiddleware, compose } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
    const meetAuth = secureLs.get("ocr-app-auth");

    let stateInLocalStoage = {
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
    };

    if(meetAuth){
        stateInLocalStoage = meetAuth;
    }

    return stateInLocalStoage;
}

const updateStateInStorage = (newState) => {
    secureLs.set("ocr-app-auth",newState);
}

const configureStore = () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer ,  getStateFromStorage(),composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInStorage(store.getState());

    })
    return store;
}

export default configureStore;
