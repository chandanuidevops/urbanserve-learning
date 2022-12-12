import { all } from 'redux-saga/effects';

import AuthSagas from './Auth/saga'
import UserSaga from './Users/saga'
import RoleSaga from './Roles/saga'
export default function* rootSaga(){
    yield all([
        AuthSagas(),
        UserSaga(),
        RoleSaga()
    ])
}