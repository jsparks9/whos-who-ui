import { Component, OnInit } from '@angular/core';
import {Attempt} from "../models/Attempt";
import {HistoryService} from "../services/history-service/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  attempts : Attempt[] = [];
  constructor(
      private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.getHistory();
  }

    getHistory() {
        this.historyService.getAttemptHistory().subscribe({
        next : response => this.onGetHistorySuccess(response),
        error : error => this.onGetHistoryError(error),
        complete : () => { }
        })
    }

    onGetHistorySuccess(response: Attempt[]) {
        console.log(response)
        this.attempts = response;
    }

    onGetHistoryError(error: any): void {
        throw new Error('Function not implemented.');
    }


}
