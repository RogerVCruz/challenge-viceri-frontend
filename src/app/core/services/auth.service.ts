import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICreateAccount,
  ICreateAccountResponse,
  ILogin,
  ILoginResponse,
} from '../models/auth.mode';
import { apiEndpoint } from '../constants/constants';
import { map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  onCreate(data: ICreateAccount) {
    return this.http
      .post<ICreateAccountResponse>(`${apiEndpoint.AuthEndpoint.create}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.token);
          }
          return response;
        })
      );
  }

  onLogin(data: ILogin) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.token);
          }
          return response;
        })
      );
  }

  onLogout() {
    this.tokenService.removeToken();
  }
}
