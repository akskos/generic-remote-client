import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import * as Rx from 'rxjs';

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

  // Returns true is enough of config is available to
  // create a request
  public configIsAvailable(): boolean {
    if (this.config.serverAddress.length > 0 && typeof this.config.port !== undefined) {
      return true;
    }
    return false;
  }

  public executeFunction(functionID: number): any {

    // Build request url with ConfigProvider info and parameter 'id' given by HomePage

    let uri = new URI();
    try {
      uri.domain(this.config.serverAddress);
      uri.scheme('http');
      uri.port(this.config.port.toString());
      uri.directory('/');
      uri.filename('function');
      uri.query({id: functionID.toString()});
      if (this.config.passwordOn) {
        uri.addQuery({password: this.config.password});
      }
    } catch (e) {
      throw new Error('Failed to create request');
    }

    let headers = new Headers();
    headers.append('Content-Type', 'text/plain');

    return this.http.get(uri.toString(), { headers: headers });
  }

  public requestCommandName(functionID: number): any {

    let uri = new URI();
    try {
      uri.domain(this.config.serverAddress);
      uri.scheme('http');
      uri.port(this.config.port.toString());
      uri.directory('/');
      uri.filename('commandInfo');
      uri.query({id: functionID.toString()});
      if (this.config.passwordOn) {
        uri.addQuery({password: this.config.password});
      }
    } catch (e) {
      throw new Error('Failed to create request');
    }

    let headers = new Headers();
    headers.append('Content-Type', 'text/plain');

    return this.http.get(uri.toString(), { headers: headers }).map(
      (res: Response) => {
        console.log(res.json().name);
        return res.json().name;
      },
      (err: Error) => {
        throw new Error("something went wrong in requestCommandName");
      }
    );
  }

  public requestNumberOfCommands(): any {
    let uri = new URI();
    try {
      uri.domain(this.config.serverAddress);
      uri.scheme('http');
      uri.port(this.config.port.toString());
      uri.directory('/');
      uri.filename('numCommands');
      if (this.config.passwordOn) {
        uri.addQuery({password: this.config.password});
      }
    } catch (e) {
      throw new Error('Failed to create request');
    }

    let headers = new Headers();
    headers.append('Content-Type', 'text/plain');

    return this.http.get(uri.toString(), { headers: headers });
  }

  public requestCommandNames(): any {

    return this.requestNumberOfCommands().map(
      (res: Response) => {

        // This array will be passed on the stream
        // It contains streams of name requests
        let commandNameStreams = [];

        // Create requests for all command names
        let ncommands: number = parseInt(res.json());
        console.log(ncommands);
        for (let i = 1; i <= ncommands; i++) {
          let nameStream = this.requestCommandName(i).map(
            (commandName: string) => {
              let commandInfo = {
                id: i-1,
                name: commandName
              };
              return commandInfo;
            },
            (err: Error) => {
              throw new Error('something went wrong in requestCommandNames');
            }
          );
          commandNameStreams.push(nameStream);
        }

        return commandNameStreams;
      },
      (err: Error) => {
        throw new Error('requestCommandNames: request failed');
      }
    );
  }

}
