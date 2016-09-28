import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {CarService} from "../../providers/car/car";
import * as SlidingMarker from 'marker-animate-unobtrusive';

/*
  Generated class for the PickupCar component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pickup-car',
  templateUrl: 'build/components/pickup-car/pickup-car.html'
})
export class PickupCarDirective implements OnInit, OnChanges{
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Input() pickupLocation: google.maps.LatLng;

  public pickupCarMarker: any;
  public polylinePath: google.maps.Polyline;

  constructor(
    public carService: CarService
  ) {
  }

  ngOnInit(): any {
    return null;
  }


  ngOnChanges(changes: SimpleChanges): any {
    if(this.isPickupRequested){
      this.requestCar();
    }
    else{
      this.removeCar();
    }
  }

  addCarMarker(position){
    this.pickupCarMarker = new SlidingMarker({
      map: this.map,
      position: position,
      icon: 'img/car-icon.png'
    });
    this.pickupCarMarker.setDuration(1000);
    this.pickupCarMarker.setEasing('linear');

  }

  showDirections(path){
    this.polylinePath = new google.maps.Polyline({
      path: path,
      strokeColor: '#FF0000',
      strokeWeight: 3
    });
    this.polylinePath.setMap(this.map);
  }

  updateCar(){
      this.carService.getPickupCar().subscribe(car =>{
        // animate car to next point
        this.pickupCarMarker.setPosition(car.position);
        // set direction path to car
        this.polylinePath.setPath(car.path);

        // keep updating car
        if (car.path.length > 1) {
          setTimeout(() => {
            this.updateCar();
          }, 1000);
        }
        else{
          // car arrived
        }
      })
  }

  requestCar(){
    console.log('request car ' + this.pickupLocation);
    this.carService.findPickupCar(this.pickupLocation)
      .subscribe(car => {
        // show car marker
        this.addCarMarker(car.position);
        // show car path/directions to you
        this.showDirections(car.path);
        // keep updating car
        this.updateCar();
      })
  }

  removeCar(){

  }

}
