import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase'; // Verifica si es .service
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private supabaseService: SupabaseService, private router: Router) {
    this.loadSession();
  }

  async loadSession() {
    const { data } = await this.supabaseService.supabase.auth.getSession();
    if (data.session?.user) {
      this.fetchProfile(data.session.user.id);
    }
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (data.user) {
      await this.fetchProfile(data.user.id);
      return true;
    }
    return false;
  }

  private async fetchProfile(userId: string) {
    const { data: profile } = await this.supabaseService.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profile) {
      this.currentUserSubject.next(profile);
      this.router.navigate(['/dashboard']);
    }
  }

  async logout() {
    await this.supabaseService.supabase.auth.signOut();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // --- ESTO ES LO QUE TE FALTABA ---
  get currentRole(): string {
    return this.currentUserSubject.value?.rol || '';
  }

  get isAdmin(): boolean {
    return this.currentRole === 'ADMIN';
  }
}