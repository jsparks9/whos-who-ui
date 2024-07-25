import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AUTHENTICATED_USER, LoginService} from "../services/login-service/login.service";
import {Track} from "../models/Track";
import {Album} from "../models/Album";
import {Question} from "../models/Question";
import {randomizedArray, tracksToQuestions} from "../utils/utils";
import {UserService} from "../services/user-service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  isReadyToTest = false;
  album!: Album;
  tracks!: Track[];
  questions!: Question[];
  currentQuestion! : Question;
  selection: string = '';
  correct: number = 0;
  incorrect: number = 0;
  questionNumber: number = 1;
  preview: string = '';
  isFinished: boolean = false;


  constructor(
      private loginService: LoginService,
      private userService: UserService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.selection === this.currentQuestion.answer) {
      this.correct++;
    } else {
      this.incorrect++;
    }
    if (this.questionNumber === this.questions.length) {
        this.isFinished = true;
    } else {
      this.questionNumber++;
      this.updateCurrentQuestion(this.questionNumber - 1);
      this.updatePreview();
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
    }

  }

  receiveAlbum(album: Album) {
    this.album = album;
  }

  receiveTracks(tracks: Track[]) {
    this.tracks = tracks;
    this.questions = randomizedArray(tracksToQuestions(tracks));
    console.log("Questions: ", this.questions);
    this.updateCurrentQuestion(0)
    this.updatePreview();
  }

  updateCurrentQuestion(index: number) {
    this.currentQuestion = this.questions[index];
  }

  updatePreview() {
    this.preview = this.currentQuestion.preview;
  }

  searchFinished(readyToTest: boolean) {
    this.isReadyToTest = readyToTest;
  }

  save(){
    const attempt = this.createAttempt();
    this.userService.saveScore(attempt).subscribe({
      next: (data) => {
        console.log(data);
        this.reset()
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  createAttempt() {
    return {
      credentials: {
        username: this.loginService.getAuthenticatedUser(),
        password: 'password'
      },
      score: this.correct,
      albumName: this.album.name,
      artistName: this.album.artists[0].name,
      albumCover: this.album.images[2].url
    };
  }

  reset() {
    this.isReadyToTest = false;
    this.album = new Album();
    this.tracks = [];
    this.questions = [];
    this.currentQuestion = new Question();
    this.selection = '';
    this.correct = 0;
    this.incorrect = 0;
    this.questionNumber = 1;
    this.preview = '';
    this.isFinished = false;
  }
}
