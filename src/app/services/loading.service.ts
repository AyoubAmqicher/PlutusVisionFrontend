import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading$ = new Subject<boolean>();

  constructor() { }

  showLoadingSpinner():void {
    this.isLoading$.next(true);
    console.log('Show loading spinner'); // Debug log
  }

  hideLoadingSpinner():void {
    this.isLoading$.next(false);
    console.log('Hide loading spinner'); // Debug log
  }
}
