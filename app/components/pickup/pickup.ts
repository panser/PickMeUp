import { Component } from '@angular/core';

/*
  Generated class for the Pickup component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pickup',
  templateUrl: 'build/components/pickup/pickup.html'
})
export class PickupDirective {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }
}
