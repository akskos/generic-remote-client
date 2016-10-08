import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigProvider } from './config-provider';

/*
  Generated class for the ClientProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClientProvider {

  constructor(public http: Http, public config: ConfigProvider) {
    console.log('Hello ClientProvider Provider');
  }

  public executeFunction(id: number): any {

    // Build request url with ConfigProvider info and parameter 'id' given by HomePage
    let address = this.config.serverAddress;
    let port = this.config.port.toString();
    let url = address + ":" + port + "/function?id=" + id.toString();

    console.log('request url: ' + url);

    return this.http.get(url);
  }

}
