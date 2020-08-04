import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule} from '@angular/material';
import { MatInputModule} from '@angular/material/';
import {MatSelectModule} from '@angular/material/';
import { MatFileUploadModule } from 'angular-material-fileupload';

const modules = [
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatSliderModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFileUploadModule
];

@NgModule({
  imports: modules,
  exports: modules


})
export class MaterialModule {}
