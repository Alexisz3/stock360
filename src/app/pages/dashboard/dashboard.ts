import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
// 1. IMPORTAR ESTO:
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 2. AGREGARLO AQUÍ EN LOS IMPORTS:
  imports: [CommonModule, RouterModule], 
  templateUrl: './dashboard.html', // (o .component.html según tu archivo)
  styleUrls: ['./dashboard.scss']  // (o .component.scss según tu archivo)
})
export class DashboardComponent {
  
  constructor(private authService: AuthService) {}

  async logout() {
    await this.authService.logout();
  }
}