import { RegionService } from './../services/region.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ComunaService } from '../services/comuna.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']

})
export class RegistroPage implements OnInit {
  //datos persona
  public email: string='';
  public password: string='';
  public firstName: string='';
  public lastName: string='';
  public rut: string='';
  public carrera: string='';

  //region y comuna
  public region: string='';
  public comuna: string='';
  
  arrayRegion:any[]=[];
  arrayComuna:any[]=[];

  regionSeleccionada: string=''; // id de region
  comunaSeleccionada: string=''; // id de comuna
  defaultRegion: string = "0";

  constructor(
    private toastController: ToastController, 
    private router:Router, 
    public regionService:RegionService, 
    public comunaService:ComunaService,
    private storageService: StorageService,
    private alertService:AlertController) {}
    
  ngOnInit() {
    this.regionSeleccionada = this.defaultRegion;
    this.getRegion();
    this.getComuna();
  }

  getRegion(){
    this.regionService.getRegion().subscribe(
      (data)=>{
        this.arrayRegion = data.data;
      },
      (error)=>{
        console.error('Error no se pueden obtener las regiones: ', error);

      }
    );

  }

  cambiarRegion(){
    console.log("Cambiar Region Metodo");
    this.getComuna();
    
    
  }
  
  getComuna() {
    this.comunaService.getComuna(this.regionSeleccionada).subscribe(
      (data)=>{
        this.arrayComuna = data.data;
        console.log(this.arrayComuna);
        
      },
      (error)=>{
        console.error('Error no se pueden obtener las comunas: ', error);
      }
    );
  }


  
  
  

  
//si existen entonces registrar a la base de datos, faltaria hacer validacion
  async register() {
    if (this.email && this.password && this.firstName && this.lastName && this.rut && this.carrera && this.regionSeleccionada && this.comunaSeleccionada) {
      if (this.validarCampos()) {
        //registrar datos persona
        const cuenta= {
          email : this.email,
          password : this.password,
          firstName : this.firstName,
          lastName : this.lastName,
          rut : this.rut,
          carrera : this.carrera,
          region : this.arrayRegion.find(region => region.id === this.regionSeleccionada),
          comuna : this.comunaSeleccionada
          };
          //guardo la cuenta
          await this.storageService.guardarCuenta(cuenta);

        }
        
        this.showAlert("Registro exitoso","Registro")
        this.router.navigateByUrl('/login')
      }
    }
          
  
    

  
  private validarCampos(): boolean {
    const userValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    const passwordValido = /^[a-zA-Z0-9._%+-]{4,}$/.test(this.password);
    const rutValido = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$/.test(this.rut);
    // SHow Alert en cada variable:
    if (!userValido) {
      this.showAlert("Email invalido, el email debe ser ejemplo@abc.cl","Error")
    }
    if (!passwordValido) {
      this.showAlert("Contraseña invalida, debe tener mayor a 4 caracteres","Error")
    }
    if (!rutValido) {
      this.showAlert("Rut invalido, debe ser ej: 12.345.678-9","Error")
    }



    return userValido && passwordValido && rutValido;
  }

  limpiarCampos(){
    this.rut='';
    this.firstName='';
    this.lastName='' ;
    this.carrera='';
    this.email='';
    this.password='';
    this.regionSeleccionada='';
    this.comunaSeleccionada='';
  }

  volver(){
    this.router.navigateByUrl('/login');
  }
  
  async showAlert(msg:string, title:string){
    var alert = await this.alertService.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']});
    await alert.present();
    return alert;
  }  
}
