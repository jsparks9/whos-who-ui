import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AUTHENTICATED_USER, LoginService} from "../services/login-service/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
      private router: Router,
      private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }


  clearSessionStorage() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    this.router.navigate(["login"]);
  }

  isUserLoggedIn() {
    return sessionStorage.getItem(AUTHENTICATED_USER) !== null;
  }

  getUsername() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  logout() {
    this.loginService.clearSessionStorage();
    this.router.navigate(["login"]);
  }
}
