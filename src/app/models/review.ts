import {Movie} from './movie';
import {Score} from './score';

export class Review {
  img: string;
  movie: Movie;
  averageScore: number;
  scores: Score[];

}
