import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;

  constructor(
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    public router: Router,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loginService.logout();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginService
        .login(
          this.loginForm.controls['email'].value,
          this.loginForm.controls['password'].value
        ).pipe(
          catchError(e=> of({error: e })
        ))
        .subscribe(data => {
            if (data && !data.error) {
              this.router.navigate(['/']);
              return;
            }
            this.toastrService.error(data.error);
          }
        );
    } else {
      this.toastrService.error("Invalid credentials");
    }
  }

}
