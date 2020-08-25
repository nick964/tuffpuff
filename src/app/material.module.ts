import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const modules = [
  MatCardModule,
  MatSelectModule,
  MatIconModule,
  MatSliderModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFileUploadModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule
];

@NgModule({
  imports: modules,
  exports: modules


})
export class MaterialModule {}
