import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. IMPORTAR ESTO
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'] // O .scss
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = true;

  // 2. INYECTAR EL DETECTOR DE CAMBIOS AQUÍ
  constructor(
    private productsService: ProductsService,
    private cd: ChangeDetectorRef 
  ) {}

  async ngOnInit() {
    try {
      this.products = await this.productsService.getProducts();
      console.log('✅ Datos cargados:', this.products);
    } catch (error) {
      console.error('❌ Error:', error);
    } finally {
      this.isLoading = false;
      // 3. OBLIGAR A ACTUALIZAR LA PANTALLA
      this.cd.detectChanges(); 
    }
  }
}