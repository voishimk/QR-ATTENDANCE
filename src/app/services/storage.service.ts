import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    let result = await this.storage?.set(key,value);
    console.log(value);
    return result;
  }


  public async remove(key: string){
    let value = await this._storage?.remove(key);
    console.log(value);
    return value;
  }
  public async clear(){
    let value = await this._storage?.clear();

  }
  public async keys(key: string){
    let value = await this._storage?.keys();

    return value;
  }

  public async guardarCuenta(cuenta: any) {
    const cuentas = (await this._storage?.get('cuentas')) || [];
    cuentas.push(cuenta);
    return await this._storage?.set('cuentas', cuentas);
  }

  public async obtenerCuentas(): Promise<any[]> {
    const cuentas = await this.storage?.get('cuentas');
    return cuentas || [];
  }
  public async obtenerCuentaLogueada(): Promise<any[]> {
    const cuentas = await this.storage?.get('usuarioLogueado');
    return cuentas || [];
  }
}
