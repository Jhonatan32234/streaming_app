// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  // ✅ Usa un archivo HTML separado
  styleUrls: ['./app.component.css']    // (Opcional) Si tienes estilos
})
export class AppComponent {
  title = 'Streaming App';
}
