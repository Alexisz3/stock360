import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login'; // (Ajusta nombres si usas .component)
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ProductsComponent } from './pages/products/products';
import { CreateProductComponent } from './pages/products/create-product/create-product';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  // RUTA 1: La lista
  { path: 'products', component: ProductsComponent },
  
  // RUTA 2: El formulario (¿ESTÁ ESTA LÍNEA?)
  { path: 'products/create', component: CreateProductComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];