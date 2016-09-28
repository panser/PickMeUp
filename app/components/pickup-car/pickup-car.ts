import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {CarService} from "../../providers/car/car";

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

  requestCar(){
    console.log('request car ' + this.pickupLocation);
    this.carService.findPickupCar(this.pickupLocation)
      .subscribe(car => {
        // show car marker
        // show car path/directions to you
        // keep updating car
      })
  }

  removeCar(){

  }

}
