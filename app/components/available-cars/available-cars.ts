import {Component, Input, OnInit} from '@angular/core';
import {CarService} from "../../providers/car/car";
import * as SlidingMarker from 'marker-animate-unobtrusive';

/*
  Generated class for the AvailableCars component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'available-cars',
  templateUrl: 'build/components/available-cars/available-cars.html',
  providers: [CarService],
})
export class AvailableCarsDirective implements OnInit{
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;

  public carMarkers: Array<google.maps.Marker>;

  constructor(
    public carService: CarService
  ) {
    this.carMarkers = [];
  }

  ngOnInit(): any {
    this.fetchAndRefreshCars();
  }

  addCarMarker(car){
    let carMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: 'img/car-icon.png'
    });
    carMarker.setDuration(2000);
    carMarker.setEasing('linear');

    carMarker.set('id', car.id); //MVCObject()
    this.carMarkers.push(carMarker);
  }

  updateCarMarker(car){
    for(var i=0, numOfCars=this.carMarkers.length; i< numOfCars; i++){
      // find car and update it
      if((<any>this.carMarkers[i]).id === car.id){
        this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
        return;
      }
    }

    // car does not exist
    this.addCarMarker(car);
  }

  fetchAndRefreshCars(){
    this.carService.getCars(9,9)
      .subscribe(carsData => {

        if(!this.isPickupRequested){
          (<any>carsData).cars.forEach( car =>{
            this.updateCarMarker(car);
          })
        }
      })
  }

}
