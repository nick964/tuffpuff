import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../models/review';
import {Score} from '../models/score';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() scores: any;
  constructor() { }

  ngOnInit() {
    const newScores = Object.values(this.scores);
    this.scores = newScores;

  }

}
