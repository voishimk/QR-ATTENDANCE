import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {

  
  constructor(private router:Router, private toastController:ToastController) { }

  loginEmail: string='';
  loginPassword: string='';
  

  ngOnInit() {
  }
  volver(){
    this.router.navigate(['/login']);  
  }

  login() {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    const storedCredencialesString = localStorage.getItem('datos');
    if (storedCredencialesString) {
      const storedCredenciales = JSON.parse(storedCredencialesString);
      const storedEmail = storedCredenciales.email;
      const storedPassword = storedCredenciales.password;
      //
      if (this.loginEmail && this.loginPassword) {
        if (this.loginEmail === storedEmail && this.loginPassword === storedPassword) {
          this.mostrarToast('Inicio de sesión exitoso')
          this.router.navigateByUrl('/home');
        } else {
          this.mostrarToast('Email y/o contraseña inválidos')

        }
      }else{
        this.mostrarToast('Por favor, completa ambos campos')
        
      }
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
