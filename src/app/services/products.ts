import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase'; // Asegúrate que esta ruta esté bien

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private supabaseService: SupabaseService) { }

  // 1. Obtener productos
  async getProducts() {
    const { data, error } = await this.supabaseService.supabase
      .from('productos')
      .select(`*, categorias ( nombre ), inventario ( stock_actual, stock_minimo )`)
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

  // 4. Registrar Movimiento
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
}