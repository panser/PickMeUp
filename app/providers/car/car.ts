import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {SimulateService} from "../simulate/simulate";

/*
  Generated class for the Car provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CarService {

  public simulate: SimulateService;

  constructor() {
    this.simulate = new SimulateService();
  }

  pollForRiderPickup(){
    return this.simulate.riderPickedUp();
  }

  pollForRiderDropoff(){
    return this.simulate.riderDroppedOff();
  }

  getPickupCar(){
    return this.simulate.getPickupCar();
  }

  findPickupCar(pickupLocation){
    return this.simulate.findPickupCar(pickupLocation);
  }

  getCars(lat, lng){
    return Observable
      .interval(2000)
      .switchMap(() =>
        this.simulate.getCars(lat, lng)
      )
      .share();
  }
}

