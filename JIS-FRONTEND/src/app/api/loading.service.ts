import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
isLoading = new BehaviorSubject<boolean>(false);

  constructor(private ngZone: NgZone) {}

  show() {
    this.ngZone.run(() => {
      this.isLoading.next(true);
    });
  }

  hide() {
    this.ngZone.run(() => {
      this.isLoading.next(false);
    });
  }

}
