import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myLoginForm: any = FormGroup;
  errorMsg: string = '';
  constructor(private loginservice: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.myLoginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    console.log(this.myLoginForm);
    this.errorMsg = '';
    if (this.myLoginForm.valid) {
      this.loginservice.login(this.myLoginForm.value).subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.toString());
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['/home']);
          },
          error => {
            console.log(error,'error');
            if (error.status == 401) {
              this.errorMsg = 'Invalid Password'
            } else {
              this.errorMsg = 'Invalid User'
            }
           }
        );
    } else {
      this.errorMsg = 'Please Enter Username and Password'
    }
  }

}
