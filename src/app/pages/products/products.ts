import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ProductsService } from '../../services/products'; 
// 1. IMPORTAMOS EL SERVICIO DE AUTENTICACIÓN
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
  
  // 2. VARIABLES PARA EL CONTROL DE ROLES
  currentUser: any = null;
  isUserAdmin: boolean = false; 

  constructor(
    private productsService: ProductsService,
    private authService: AuthService, // 3. INYECTAMOS EL SERVICIO
    private cd: ChangeDetectorRef 
  ) {}

  async ngOnInit() {
    // 4. DETECTAR SI ES ADMIN AL CARGAR
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      // Esta es la línea mágica que hace aparecer el botón
      this.isUserAdmin = this.authService.isAdmin; 
      console.log('Rol detectado:', this.isUserAdmin ? 'ADMIN' : 'VENDEDOR');
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

  // Función para mover inventario (+ / -)
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
      console.error(erroimport { Injectable } from '@angular/core';
import { SupabaseService } from './supabase'; // Verifica la ruta

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private supabaseService: SupabaseService) { }

  // 1. Obtener productos
  async getProducts() {
    const { data, error } = await this.supabaseService.supabase
      .from('productos')
      .select(`*, categorias ( nombre ), inventario ( stock_actual )`)
      .order('id_producto', { ascending: true });

    if (error) throw error;
    return data;
  }

  // 2. Obtener categorías
  async getCategories() {
    const { data, error } = await this.supabaseService.supabase
      .from('categorias')
      .select('*');
    if (error) throw error;
    return data || [];
  }

  // 3. Crear Producto
  async createProduct(productData: any, initialStock: number) {
    const { data: newProduct, error: productError } = await this.supabaseService.supabase
      .from('productos')
      .insert(productData)
      .select()
      .single();

    if (productError) throw productError;

    if (newProduct) {
      await this.supabaseService.supabase
        .from('inventario')
        .insert({
          id_producto: newProduct.id_producto,
          stock_actual: initialStock,
          stock_minimo: 5
        });
    }
    return newProduct;
  }

  // --- ESTO ES LO QUE TE FALTABA ---
  async registerMovement(productId: number, type: 'ENTRADA' | 'SALIDA', quantity: number, userId: string) {
    const { error } = await this.supabaseService.supabase
      .rpc('registrar_movimiento', {
        p_producto_id: productId,
        p_tipo: type,
        p_cantidad: quantity,
        p_usuario_id: userId
      });

    if (error) throw error;
  }
}r);
      alert('Error: ' + (error.message || 'No se pudo actualizar'));
    }
  }
}