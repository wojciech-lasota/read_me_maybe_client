import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookUpdateService {
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$.asObservable();
  }

  triggerRefresh() {
    this._refreshNeeded$.next();
  }
}
