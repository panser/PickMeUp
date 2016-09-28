import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

/*
  Generated class for the Simulate provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SimulateService {

  private carIndex: number = 0;

  constructor() {}

  getCars(lat, lng){
    let carData = this.cars[this.carIndex];
    this.carIndex++;
    if(this.carIndex > this.cars.length -1){
      this.carIndex = 0;
    }

    return Observable.create(
      observer => observer.next(carData)
    )
  }

  private cars1 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.509900,
        lng: 30.457610
      }
    },
      {
        id: 2,
        coord: {
          lat: 30.457610,
          lng: 30.454638
        }
      }
    ]
  };

  private cars2 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.510855,
        lng: 30.457685
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.507949,
          lng: 30.456676
        }
      }
    ]
  };

  private cars3 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.506775,
        lng: 30.462610
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.507847,
          lng: 30.456376
        }
      }
    ]
  };

  private cars4 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.507410,
        lng: 30.461172
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.507089,
          lng: 30.458243
        }
      }
    ]
  };

  private cars5 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.508959,
        lng: 30.461676
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.510030,
          lng: 30.457095
        }
      }
    ]
  };

  private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];

}

