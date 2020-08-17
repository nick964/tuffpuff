import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null;

  @Output() submitEm = new EventEmitter();

  success: string | null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.authService.signIn(this.form.value).then(result => {
        if (typeof result === 'string' && result.indexOf('Error') > -1) {
          this.error = result;
        } else {
          console.log(result);
        }
      });
    }

  }
}
