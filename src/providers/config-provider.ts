import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigProvider {

  private _port: number;
  private _serverAddress: string;
  private _passwordOn: boolean;
  private _password: string;

  constructor() {
    console.log('Hello ConfigProvider Provider');
  }

  public get port(): number {
    return this._port;
  }

  public set port(port: number) {
    this._port = port;
  }

  public get serverAddress(): string {
    return this._serverAddress;
  }

  public set serverAddress(serverAddress: string) {
    this._serverAddress = serverAddress;
  }

  public get passwordOn(): boolean {
    return this._passwordOn;
  }

  public set passwordOn(passwordOn: boolean) {
    this._passwordOn = passwordOn;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }
}
