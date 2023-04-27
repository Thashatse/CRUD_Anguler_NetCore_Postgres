import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private _token: string = "";

  constructor() {

  }

  public setToken(token: string) {
    this._token = token;
  }

  public logout() {
    this._token = "";
  }

  public getToken(): string {
    return this._token;
  }
}
