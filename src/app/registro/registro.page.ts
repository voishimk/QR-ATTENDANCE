import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']

})
export class RegistroPage implements OnInit {
  public email: string='';
  public password: string='';
  public firstName: string='';
  public lastName: string='';
  public rut: string='';
  public carrera: string='';
  

  constructor(private toastController: ToastController, private router:Router) {}
  ngOnInit() {
    
  }
  
  register() {
    const credenciales ={
      email:this.email,
      password:this.password,
      firstName:this.firstName,
      lastName: this.lastName,
      historial:'',
      rut: this.rut,
      carrera: this.carrera
    };

    if (this.email && this.password && this.firstName && this.lastName) {
      if (this.validarCampos()) {
        localStorage.setItem('datos', JSON.stringify(credenciales));
        this.mostrarToast('Registro exitoso. Redirigiento al Login.');
        this.router.navigateByUrl('/sing-in');
      }else{
        this.mostrarToast('Ingrese email y contraseña válidos ')

      }
    }else{
       this.mostrarToast('Por favor, completa ambos campos')
    }


      console.log(this.email);
      console.log(this.password);
      
    
    }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'middle', // Posición en la pantalla (middle, top, bottom)
    });

    toast.present();
  }
  private validarCampos(): boolean {
    const userValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    const passwordValido = /^[a-zA-Z0-9._%+-]{4,}$/.test(this.password);
    const rutValido = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$/.test(this.rut);

    return userValido && passwordValido && rutValido;
  }

  limpiarCampos(){
    this.rut='';
    this.firstName='';
    this.lastName='' ;
    this.carrera='';
    this.email='';
    this.password='';

  }

  volver(){
    this.router.navigateByUrl('/login');
  }  
}
