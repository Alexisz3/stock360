import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase'; // Ajusta si tu archivo se llama supabase.service

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private supabaseService: SupabaseService) { }

  // 1. Obtener lista de productos (para la tabla)
  async getProducts() {
    const { data, error } = await this.supabaseService.supabase
      .from('productos')
      .select('*')
      .order('id_producto', { ascending: true });

    if (error) throw error;
    return data;
  }

  // 2. Obtener categorías (para el desplegable del formulario)
  async getCategories() {
    const { data, error } = await this.supabaseService.supabase
      .from('categorias')
      .select('*');
    if (error) throw error;
    return data || [];
  }

  // 3. Crear Producto e Inicializar su Inventario
  async createProduct(productData: any, initialStock: number) {
    // A. Insertamos el producto
    const { data: newProduct, error: productError } = await this.supabaseService.supabase
      .from('productos')
      .insert(productData)
      .select()
      .single();

    if (productError) throw productError;

    // B. Si se creó, le creamos su stock inicial en la tabla inventario
    if (newProduct) {
      const { error: stockError } = await this.supabaseService.supabase
        .from('inventario')
        .insert({
          id_producto: newProduct.id_producto,
          stock_actual: initialStock,
          stock_minimo: 5 // Mínimo por defecto
        });
      
      if (stockError) console.error('Error creando inventario:', stockError);
    }
    
    return newProduct;
  }
}