import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Loaded, Loading } from './loading-status.reducer'

@Injectable()
export class LoadingStatusInterceptor implements HttpInterceptor {
  constructor(private store: Store<any>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new Loading())
    return next.handle(req).pipe(tap(() => this.store.dispatch(new Loaded())))
  }
}
