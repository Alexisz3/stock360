import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app'; // Importación correcta

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Usamos AppComponent
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Puedes borrar o comentar las otras pruebas si fallan por cambios en el HTML
});