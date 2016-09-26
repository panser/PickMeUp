import {Component, Input, OnInit} from '@angular/core';

/*
  Generated class for the AvailableCars component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'available-cars',
  templateUrl: 'build/components/available-cars/available-cars.html'
})
export class AvailableCarsDirective implements OnInit{
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;

  constructor() {

  }

  ngOnInit(): any {
    this.fetchAndRefreshCars();
  }

  fetchAndRefreshCars(){

  }

}
