/*import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // ✅ Importación de RouterModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // ✅ Configuración opcional
    provideRouter(routes), // ✅ Agregar enrutamiento
    importProvidersFrom(HttpClientModule), // ✅ Agregar HttpClientModule
    importProvidersFrom(RouterModule.forRoot(routes)) // ✅ Importar RouterModule correctamente
  ]
};
*/