import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase'; // Asegúrate que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private supabaseService: SupabaseService) { }

  async getProducts() {
    // CAMBIO IMPORTANTE: Solo pedimos los datos de la tabla productos (select '*')
    // Quitamos las relaciones por ahora para desbloquear la pantalla
    const { data, error } = await this.supabaseService.supabase
      .from('productos')
      .select('*')
      .order('id_producto', { ascending: true });

    if (error) {
      console.log('Error detallado de Supabase:', error); // Esto nos ayudará si falla
      throw error;
    }
    return data;
  }
}