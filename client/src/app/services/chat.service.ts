import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private credentials = {};
  private ctx = {};

  constructor(
    private http: Http
  ) { }

  setCredentials(credentials) {
    this.credentials = credentials;
  }

  setCtx(ctx) {
    this.ctx = ctx;
  }

  callWatson(msg) {
    const body = {
      msg: msg,
      ctx: this.ctx,
      credentials: this.credentials
    };
    return this.http.post(`/message`, body)
      .pipe(
        map((res) => {
          return res.json();
        })
      );
  }
}
