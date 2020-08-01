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
    this.setLeafArrays();

  }

  setLeafArrays() {
    this.scores.forEach(val => {
      val.leafImages = new Array(5);
      let leafCounter = val.score;
      while (leafCounter > 0) {
        if (leafCounter > 1) {
          val.leafImages.push(1);
        } else {
          val.leafImages.push(Math.round((leafCounter + Number.EPSILON) * 100) / 100);
        }
        leafCounter = leafCounter - 1;
      }
      console.log(val.leafImages);
    });
  }

}
