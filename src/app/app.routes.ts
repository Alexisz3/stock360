import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { ProductsComponent } from './pages/products/products'; // (Ajusta si usas nombre corto)

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  // NUEVA RUTA:
  { path: 'products', component: ProductsComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];