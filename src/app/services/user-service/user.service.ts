import { Injectable } from '@angular/core';
import {LoginService} from "../login-service/login.service";
import {HttpClient} from "@angular/common/http";

const urlBase = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private loginService: LoginService,
      private http: HttpClient
  ) { }

  saveScore(attempt: any) {
    return this.http.post(`http://localhost:8080/attempts`, attempt)
  }

  getLeaderBoard(n: number) {
    return this.http.get(`${urlBase}/users/leaderboard/${n}`)
  }

  putSettings(settings: any) {
    const username = this.loginService.getAuthenticatedUser();
    return this.http.put(`${urlBase}/settings/${username}`, settings)
  }
}
