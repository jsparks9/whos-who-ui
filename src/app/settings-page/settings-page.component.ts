import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service/user.service';

interface Settings {
  difficulty: string;
  timeLimit: number;
  responseType: string;
  genre: string[];
  hints: boolean;
};

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  settings: Settings = {
    difficulty: 'Easy', timeLimit: 0, responseType: 'Multiple', genre: [], hints: true
  };
  errorMsg = "";

  setSetting(settings: Settings): void {
    this.settings = settings;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let sett = sessionStorage.getItem('settings');
    if (sett) this.settings = JSON.parse(sett) as Settings;
  }

  checkHints(): string {
    return "None" + this.settings.hints;
  }
  checkNotHints(): boolean {
    return !this.settings.hints;
  }

  saveSettings(): void {
    const settings = {
      difficulty: (document.getElementById('difficulty') as HTMLSelectElement).value,
      timeLimit: parseInt((document.getElementById('time-limit') as HTMLInputElement).value) || 0,
      responseType: (document.querySelector('input[name="response-type"]:checked') as HTMLInputElement).value,
      genre: Array.from((document.getElementById('genre') as HTMLSelectElement).selectedOptions).map(option => option.value),
      hints: (document.querySelector('input[name="hints"]:checked') as HTMLInputElement)?.value == 'true' || 'false'
    };
    this.errorMsg = "";
    this.userService.putSettings(settings).subscribe({
      next: (response: any) => {
        this.errorMsg = 'Settings saved successfully.';
        console.log('Settings saved successfully.', response);
        this.setSetting(settings as Settings);
        sessionStorage.setItem('settings', JSON.stringify(settings));
        // TODO : fixed position message that fades out?
      },
      error: error => {
        this.errorMsg = 'Failed to save settings.' + error;
        console.log(error.message)
      }
    });
  }

}
