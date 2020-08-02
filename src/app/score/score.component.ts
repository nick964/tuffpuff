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

  WEED_ICON_SIZE = 20;

  ngOnInit() {
    const newScores = Object.values(this.scores);
    this.scores = newScores;
    this.setLeafArrays();

  }

  setLeafArrays() {
    this.scores.forEach(val => {
      let arrayLength = val.score;
      if (val.score % 1 !== 0) {
        arrayLength = Math.ceil(val.score);
      }
      val.leafImages = new Array(arrayLength);
      let leafCounter = val.score;
      while (leafCounter > 0) {
        if (leafCounter > 1) {
          val.leafImages.push(1);
        } else {
          val.leafImages.push((Math.round((leafCounter + Number.EPSILON) * 100) / 100));
        }
        leafCounter = leafCounter - 1;
      }
      console.log(val.leafImages);
    });
  }

}
