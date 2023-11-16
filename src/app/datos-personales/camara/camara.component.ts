import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent  implements OnInit {

  constructor() { }
  urlImagenCapturada: string | undefined;
  ngOnInit() {
    this.urlImagenCapturada= ''
    Camera.requestPermissions();
  }

  async tomarFoto(){

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;

      // Can be set to the src of an image now
      this.urlImagenCapturada = image.webPath;
    };

}
