import {Movie} from './movie';
import {Score} from './score';

export class Review {
  img: string;
  movie: Movie;
  picker: string;
  dateReviewed: string;
  selectedBy: string;
  averageScore: number;
  scores: Score[];

}
