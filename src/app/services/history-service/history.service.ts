import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../login-service/login.service";
import {Attempt} from "../../models/Attempt";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
      private http: HttpClient,
      private loginService: LoginService
  ) { }

  getAttemptHistory() {
    return this.http.get<Attempt[]>(`http://localhost:8080/attempts/${this.loginService.getAuthenticatedUser()}`)
  }
}
