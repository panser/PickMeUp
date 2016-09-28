import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, Observer} from "rxjs";

@Injectable()
export class PickupPubSub {

  public pickup$: Observable<any>;
  public _observer: Observer<any>;

  public EVENTS = {
    PICKUP: 'pickup',
    DROPOFF: 'dropoff',
    ARRIVAL_TIME: 'arrival-time'
  };

  constructor() {
    this.pickup$ = new Observable(observer => {
      this._observer = observer;
    })
      .share(); // share() allows multiple subscribers
  }

  watch(){
    return this.pickup$;
  }

  emitArrivakTime(time){
    this._observer.next({
      event: this.EVENTS.ARRIVAL_TIME,
      data: time
    })
  }

  emitDropOff(){
    this._observer.next({
      event: this.EVENTS.DROPOFF,
      data: null
    })
  }

  emitPickUp(){
    this._observer.next({
      event: this.EVENTS.PICKUP,
      data: null
    })
  }

}

