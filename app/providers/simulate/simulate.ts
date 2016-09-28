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
  public directionService: google.maps.DirectionsService;
  public myRoute: any;
  public myRouteIndex: number;

  constructor() {
    this.directionService = new google.maps.DirectionsService();
  }

  getPickupCar(){
    return Observable.create(observable => {
      let car = this.myRoute[this.myRouteIndex];
      observable.next(car);
      this.myRouteIndex++;
    })
  }

  getSegmentedDirections(directions){
    let route = directions.routes[0];
    let legs = route.legs;
    let path = [];
    let increments = [];
    let duration = 0;

    let numOfLegs = legs.length;

    // work backwards though each leg in directions route
    while (numOfLegs--){

      let leg = legs[numOfLegs];
      let steps = leg.steps;
      let numOfSteps = steps.length;

      while(numOfSteps--){

        let step = steps[numOfSteps];
        let points = step.path;
        let numOfPoinys = points.length;

        duration += step.duration.value;

        while(numOfPoinys--){

          let point = points[numOfPoinys];
          path.push(point);

          increments.unshift({
            position: point, // car position
            time: duration, // time left before arrival
            path: path.slice(0) // clone array to prevent referencing final path array
          })
        }
      }
    }

  }

  calculateRoute(start, end){

    return Observable.create(observable => {

      this.directionService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }, (responce, status) => {
        if(status === google.maps.DirectionsStatus.OK){
          observable.next(responce);
        }
        else{
          observable.error(status);
        }
        }
      )
    })
  }

  simulateRoute(start, end){

    return Observable.create(observable => {
      this.calculateRoute(start, end).subscribe(directions => {
        // get route path
        this.myRoute = this.getSegmentedDirections(directions);
        // return pickup car
        this.getPickupCar().subscribe(car => {
          observable.next(car); // first increment in car path
        })
      })
    });
  }

  findPickupCar(pickupLocation){

    this.myRouteIndex = 0;

    let car = this.cars1.cars[0]; // pickup one of the cars to simulate pickup
    let start = new google.maps.LatLng(car.coord.lat, car.coord.lng);
    let end = pickupLocation;

    return this.simulateRoute(start, end);
  }

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

