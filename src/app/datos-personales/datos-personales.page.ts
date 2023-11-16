import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {}

  usuarioLogueado: any;
  latitud: any;
  longitud: any;




  ngOnInit() {
    this.traerUsuarioLogueado();
    this.printCurrentPosition();
  }

  //volver al home:
  openHome() {
    this.router.navigateByUrl('/home');
  }

  async traerUsuarioLogueado() {
    this.usuarioLogueado = await this.storageService.obtenerCuentaLogueada();

    console.log('Cuenta Usuario Logueado', this.usuarioLogueado);
    console.log('');

  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitud = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;


  };
}
