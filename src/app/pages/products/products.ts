import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ProductsService } from '../../services/products'; // (Verifica que esta ruta no tenga error)

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './products.html', // (Ajusta si usas .component.html)
  styleUrls: ['./products.scss']  // (Ajusta si usas .component.scss)
})
// AQUÍ ESTABA EL ERROR: El nombre debe ser ProductsComponent
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = true;

  constructor(
    private productsService: ProductsService,
    private cd: ChangeDetectorRef 
  ) {}

  async ngOnInit() {
    try {
      this.products = await this.productsService.getProducts();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
      this.cd.detectChanges(); 
    }
  }
}