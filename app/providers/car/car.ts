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

  findPickupCar(pickupLocation){
    this.simulate.findPickupCar();
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

