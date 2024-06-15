import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage = '';
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  private login_url = 'http://localhost:3000/sessions';
  private authenticate_url = 'http://localhost:3000/authenticate';
  constructor(private http: HttpClient, private router: Router) {}
  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
  displayStyles = (input: FormControl) => {
    const styles: Object = {
      background: input.valid ? 'green' : 'red',
      color: 'white',
    };
    return styles;
  };

  login() {
    if (this.loginForm.invalid) return;
    const body = {
      username: this.email.value,
      password: this.password.value,
    };

    this.http.post(this.login_url, body).subscribe(
      (response) => {
        sessionStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/']);
      },
      ({ error }) => {
        this.errorMessage = error;
      }
    );
  }

  async valid_user(): Promise<boolean> {
    let user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user.token) {
      try {
        await this.http
          .post(this.authenticate_url, { token: user.token })
          .toPromise();
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

  async ngOnInit() {
    try {
      const valid = await this.valid_user();
      if (valid) {
        this.router.navigate(['/']);
        return;
      }
    } catch (error) {}
  }
}
