import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para que funcionen los ngModel
import { Router, RouterModule } from '@angular/router'; // Para la navegación
import { ProductsService } from '../../../services/products'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Importamos módulos clave
  templateUrl: './create-product.html', // Ojo: verifica si tu archivo se llama .html o .component.html
  styleUrls: ['./create-product.scss']  // Ojo: verifica si tu archivo se llama .scss o .component.scss
})
export class CreateProductComponent implements OnInit {
  
  // Objeto para guardar los datos del formulario
  product = {
    nombre: '',
    codigo: '',
    id_categoria: '',
    talla: '',
    color: '',
    descripcion: ''
  };
  
  stock: number = 0; // Campo separado para el stock inicial
  categories: any[] = []; // Aquí guardaremos la lista de "Camisas", "Pantalones", etc.
  isLoading = false;

  constructor(
    private productsService: ProductsService, 
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      // Cargamos las categorías al entrar a la página
      this.categories = await this.productsService.getCategories();
      console.log('Categorías cargadas:', this.categories);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  }

  async onSubmit() {
    // 1. Validaciones básicas
    if (!this.product.nombre || !this.product.codigo || !this.product.id_categoria) {
      alert('Por favor completa los campos obligatorios (Nombre, Código, Categoría)');
      return;
    }

    this.isLoading = true;

    try {
      // 2. Llamamos al servicio para guardar en Supabase
      await this.productsService.createProduct(this.product, this.stock);
      
      alert('¡Producto creado con éxito!');
      
      // 3. Volvemos a la tabla de productos
      this.router.navigate(['/products']); 
      
    } catch (error: any) {
      console.error(error);
      alert('Error al guardar: ' + (error.message || error));
    } finally {
      this.isLoading = false;
    }
  }
}