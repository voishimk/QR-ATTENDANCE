import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {

  constructor(private router:Router, private toastController:ToastController, private storageService: StorageService) { }

  loginEmail: string='';
  loginPassword: string='';

  public usuarioLogueado: string | undefined; // Usuario actualmente logueado

  ngOnInit() {
  }
  volver(){
    this.router.navigate(['/login']);
  }

  async login() {


      const cuentas = await this.storageService.obtenerCuentas();
      const cuentaCorresponde = cuentas.find(account => account.email === this.loginEmail && account.password === this.loginPassword);


    // Falta completar contraseña o mail:
    if (this.loginEmail === '' || this.loginPassword === '') {
      this.mostrarToast('Por favor ingrese su correo y contraseña');
      return false;
    }
    if (cuentaCorresponde) {

      this.router.navigate(['/home']);
      this.usuarioLogueado = cuentaCorresponde;
      await this.storageService.set('usuarioLogueado', this.usuarioLogueado);
      console.log(this.usuarioLogueado);

      return true;

    } else {
      this.mostrarToast('Usuario o contraseña incorrecta');
      return false;
    }

}

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'middle', // Posición en la pantalla (middle, top, bottom)
    });

    toast.present();
  }



}
