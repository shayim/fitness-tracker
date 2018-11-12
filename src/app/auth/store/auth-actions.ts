import { Action } from '@ngrx/store'

export enum AuthActionTypes {
  GetAuth = '[Auth] Get Auth',
  GetAuthSuccess = '[Auth] Get Auth Success',
  Signup = '[Auth] Signup',
  SignupSuccess = '[Auth] Signup Success',
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
}

export class GetAuth implements Action {
  readonly type = AuthActionTypes.GetAuth
}

export class Signup implements Action {
  readonly type = AuthActionTypes.Signup
  constructor(public email: string, public password: string, public birthdate: Date) {}
}

export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.SignupSuccess
  constructor(
    public email: string,
    public userId: string,
    public token: string,
    public expiredAt: number
  ) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login
  constructor(public email: string, public password: string) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess
  constructor(
    public email: string,
    public userId: string,
    public token: string,
    public expiredAt: number
  ) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout
}

export type AuthActions = Signup | SignupSuccess | Login | Logout | LoginSuccess | GetAuth
