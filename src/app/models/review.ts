import {Movie} from './movie';
import {Score} from './score';

export class Review {
  img: string;
  movie: Movie;
  dateReviewed: string;
  selectedBy: string;
  averageScore: number;
  scores: Score[];

}
