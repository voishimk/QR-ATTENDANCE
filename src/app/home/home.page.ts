import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  scanResult: any='';
  codigoQRDetectado: boolean = false;
  registroHora: string='';

  constructor(private router:Router, private storageService:StorageService) {}

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

    this.storageService.remove('usuarioLogueado');
    this.router.navigateByUrl('/login');
  }

  //open datos-personales page:
  openDatosPersonales() {
    this.router.navigateByUrl('/datos-personales');


    }
}
