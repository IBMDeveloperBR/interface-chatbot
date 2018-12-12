import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { pipe, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private credentials = null;
  private ctx = {};
  public setNewValue = new BehaviorSubject <boolean>(false);
  public outputAssistant = new BehaviorSubject <Object>(null);

  constructor(
    private http: Http
  ) { }

  setCredentials(credentials) {
    this.credentials = credentials;
    this.setNewValue.next(true);
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
    return this.http.post(`/api/message`, body)
      .pipe(
        map((res) => {
          this.outputAssistant.next(res.json());
          return res.json();
        })
      );
  }
}
