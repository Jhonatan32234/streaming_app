import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('token', response.token); // Guardar el token
        this.router.navigate(['/video']); // Redirigir al componente de video
      },
      (error) => {
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}
