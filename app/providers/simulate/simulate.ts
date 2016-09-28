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

  riderPickedUp(){
    // simulate rider picked up after 1 seconds
    return Observable.timer(1000);
  }

  riderDroppedOff(){
    // simulate rider dropped off after 1 seconds
    return Observable.timer(1000);
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

    return increments;
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

  dropoffPickupCar(pickupLocation, destination){
    return this.simulateRoute(pickupLocation, destination);
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
        lat: 50.505668,
        lng: 30.468006
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.504876,
          lng: 30.442815
        }
      }
    ]
  };

  private cars2 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.505504,
        lng: 30.463414
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.505477,
          lng: 30.447235
        }
      }
    ]
  };

  private cars3 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.504794,
        lng: 30.459466
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.505204,
          lng: 30.454831
        }
      }
    ]
  };

  private cars4 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.507688,
        lng: 30.458221
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.504822,
          lng: 30.459337
        }
      }
    ]
  };

  private cars5 = {
    cars: [{
      id: 1,
      coord: {
        lat: 50.508916,
        lng: 30.457234
      }
    },
      {
        id: 2,
        coord: {
          lat: 50.501246,
          lng: 30.460324
        }
      }
    ]
  };

  private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];

}

