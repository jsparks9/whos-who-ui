import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LoginComponent } from './login/login.component';
import {RouterGuardService} from "./services/router-guard/router-guard.service";
import { SearcherComponent } from './searcher/searcher.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { HistoryComponent } from './history/history.component';
import { PlaylistsComponent } from './playlists/playlists.component';


const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "home/:name", component: HomeComponent, canActivate: [RouterGuardService] },
    { path: "leaderboard", component: LeaderboardComponent, canActivate: [RouterGuardService]  },
    { path: "settings", component: SettingsPageComponent, canActivate: [RouterGuardService]  },
    { path: "history", component: HistoryComponent, canActivate: [RouterGuardService]  },
    { path: "playlists", component: PlaylistsComponent, canActivate: [RouterGuardService]  },

];

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      GamePageComponent,
      LoginComponent,
      SearcherComponent,
      LeaderboardComponent,
      SettingsPageComponent,
      HistoryComponent,
      PlaylistsComponent,
  ],
  imports: [
      BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
