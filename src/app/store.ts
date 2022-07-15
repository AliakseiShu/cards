import {TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {LoginActionsType, loginReducer} from '../features/login/reducer/loginReducer';
import { CardsNameActionsType, cardsNameReducer } from '../features/packName/reducer/packCardReducer';
import { PacksListActionsType, packsListReducer } from '../features/packsList/packsListReducer';
import {TablePacksActionsType, tablePacksReducer } from '../features/packsList/tablePacks/tablePacksReducer';
import {RecoveryPasswordActionsType, recoveryPasswordReducer } from '../features/recoveryPassword/reducer/recoveryPasswordReducer';
import {RegistrationActionsType, registrationReducer} from '../features/registration/reducer/registrationReducer';
import {SetNewPasswordActionsType, setPasswordReducer} from '../features/setPassword/reducer/setPasswordReducer';
import {AppActionsType, appReducer} from './reducer/app-reducer';
import {ModalActionsType, modalReducer} from '../components/Modals/reducer/modalReducer';
import {LearnPackActionsType, learnPackReducer} from '../features/packsList/tablePacks/learnPack/learnPackReducer';

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    setPassword: setPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    registration: registrationReducer,
    packList: packsListReducer,
    tablePacks: tablePacksReducer,
    cardPack: cardsNameReducer,
    modal: modalReducer,
    learnPack: learnPackReducer

});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>;

export type ActionsType =
    | LoginActionsType
    | AppActionsType
    | RecoveryPasswordActionsType
    | SetNewPasswordActionsType
    | RegistrationActionsType
    | PacksListActionsType
    | TablePacksActionsType
    | ModalActionsType
    | CardsNameActionsType
    | LearnPackActionsType


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsType>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
window.store = store;