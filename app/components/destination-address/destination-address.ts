import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'destination-address',
  templateUrl: 'build/components/destination-address/destination-address.html'
})
export class DestinationAddressDirective {

  @Output() newDest: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }
}
