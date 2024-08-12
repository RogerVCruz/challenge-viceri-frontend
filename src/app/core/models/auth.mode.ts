export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICreateAccount {
  email: string;
  password: string;
  name: string;
}

export interface ICreateAccountResponse {
  token: string;
  user: IUser;
}

export interface ILoginResponse {
  message: string;
  token: string;
  user: IUser;
}
