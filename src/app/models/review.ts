import {Movie} from './movie';
import {Score} from './score';

export class Review {
  img: string;
  movie: Movie;
  dateReviewed: Date;
  selectedBy: string;
  averageScore: number;
  scores: Score[];
  key: string;
}
