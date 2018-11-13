import { Action } from '@ngrx/store'

export enum AuthActionTypes {
  GetAuth = '[Auth] Get Auth',
  GetAuthSuccess = '[Auth] Get Auth Success',
  Signup = '[Auth] Signup',
  SignupSuccess = '[Auth] Signup Success',
  SignupFailure = '[Auth] Signup Failure',
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

export class SignupFailure implements Action {
  readonly type = AuthActionTypes.SignupFailure
  constructor(public error: any) {}
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
  constructor(public error: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout
}

export type AuthActions =
  | Signup
  | SignupSuccess
  | SignupFailure
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | GetAuth
