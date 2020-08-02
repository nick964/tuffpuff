import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../util/MyErrorStateMatcher';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  @Input() error: string | null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: [''],
      username: [''],
      email: ['']
    }, { validator: this.checkPassword });

  }

  ngOnInit() {
  }


  checkPassword(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};

  }

  submit() {
    if (!this.form.valid) {
      this.error = 'Error with form, please fix';
    } else {
      const username = this.form.get('email').value;
      const confirmPass = this.form.get('confirmPassword').value;
      this.authService.trySignUp(username, confirmPass);

    }
    console.log('on sign up submit');

  }
}
