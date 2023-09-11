import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage {

  scanResult: any='';
  codigoQRDetectado: boolean = false;
  registroHora: string='';

  constructor(private router:Router) {}

  onCodeResult(result:string){
    this.scanResult=result;
    this.codigoQRDetectado = true;
  }

  confirmarBtn(){
    const horaActual = new Date();
    this.registroHora = horaActual.toLocaleTimeString();

    this.router.navigate(['/historial'], {
      queryParams: {
        scanResult: this.scanResult,
        registroHora: this.registroHora
      },
    });


  }

  cerrarSesion(){
    this.router.navigateByUrl('/login');
  }
}
