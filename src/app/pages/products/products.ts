import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ProductsService } from '../../services/products'; 
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './products.html', 
  styleUrls: ['./products.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  currentUser: any = null;
  isUserAdmin: boolean = false; 

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private cd: ChangeDetectorRef 
  ) {}

  async ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isUserAdmin = this.authService.isAdmin; 
    });
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.products = await this.productsService.getProducts();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
      this.cd.detectChanges(); 
    }
  }

  async updateStock(product: any, type: 'ENTRADA' | 'SALIDA') {
    if (!this.currentUser) {
      alert('Error: No se identifica al usuario. Recarga la página.');
      return;
    }

    const input = prompt(`¿Cuántas unidades deseas ${type === 'ENTRADA' ? 'INGRESAR' : 'RETIRAR'} de ${product.nombre}?`);
    if (!input) return;

    const quantity = parseInt(input);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Por favor ingresa un número válido.');
      return;
    }

    try {
      await this.productsService.registerMovement(product.id_producto, type, quantity, this.currentUser.id);
      await this.loadProducts(); 
      alert('¡Stock actualizado!');
    } catch (error: any) {
      console.error(error);
      alert('Error: ' + (error.message || 'No se pudo actualizar'));
    }
  }
}