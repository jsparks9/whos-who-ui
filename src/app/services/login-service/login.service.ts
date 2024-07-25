import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export const AUTHENTICATED_USER = 'authenticatedUser'
const urlBase = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      private http : HttpClient
  ) { }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  isUserLoggedIn() {
    return this.getAuthenticatedUser() !== null
  }

  getUser(username: string) {
    return this.http.get(`${urlBase}/users/${username}`)
  }

  clearSessionStorage() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
  }

  getCredentials() {
    return {
      username: this.getAuthenticatedUser(),
      password: 'password'
    }
  }

}
