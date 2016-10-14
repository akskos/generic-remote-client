import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigProvider } from './config-provider';

import URI from 'urijs';

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

  public executeFunction(functionID: number): any {

    // Build request url with ConfigProvider info and parameter 'id' given by HomePage
    let uri = new URI();
    uri.domain(this.config.serverAddress);
    uri.scheme('http');
    uri.port(this.config.port.toString());
    uri.directory('/');
    uri.filename('function');
    uri.query({id: functionID.toString()});

    console.log('request url: ' + uri.toString());

    let headers = new Headers();
    headers.append('Content-Type', 'text/plain');

    return this.http.get(uri.toString(), { headers: headers });
  }

}
