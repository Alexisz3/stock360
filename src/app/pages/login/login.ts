import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// Asegúrate de que la ruta al servicio sea correcta.
// Si te marca error en auth.service, verifica cuántos puntos '../' necesitas para llegar a 'services'.
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // OJO AQUÍ: Estoy usando tus nombres de archivo cortos
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'No se pudo verificar tu rol.';
      }
    } catch (error: any) {
      this.errorMessage = 'Correo o contraseña incorrectos.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}