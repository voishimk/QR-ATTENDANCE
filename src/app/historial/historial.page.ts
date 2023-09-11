import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  scanResult: any ='';
  registroHora: string='';
  datos: any; // Variable para almacenar los datos del Local Storage
  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    //traer datos del local storage
    const datosString = localStorage.getItem('datos');

    if (datosString) {
      // Parsear la cadena JSON a un objeto JavaScript
      this.datos = JSON.parse(datosString);
    }

    //traer el scanresulkt
    this.route.queryParams.subscribe(params => {
      this.scanResult = params['scanResult'],
      this.registroHora = params['registroHora'];
      
    });
  }

  volverScanner(){
    this.router.navigateByUrl('/home');
  }

}
