import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapDirective } from '../../components/map/map';
import {PickupPubSub} from "../../providers/pickup-pub-sub/pickup-pub-sub";
import {min} from "rxjs/operator/min";
import {DestinationAddressDirective} from "../../components/destination-address/destination-address";

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [MapDirective, DestinationAddressDirective],
  providers: [PickupPubSub],
})
export class HomePage {

  public isPickupRequested: boolean;
  public isRiderPickedUp: boolean;
  public pickupSubscription: any;
  public timeTillArrival: number;
  public destination: string;

  constructor(private pickupPubSub: PickupPubSub) {
    this.isPickupRequested = false;
    this.isRiderPickedUp = false;
    this.timeTillArrival = 5;
    this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
      this.processPickupSubscription(e);
    })

  }

  processPickupSubscription(e){
    switch(e.event){
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
        this.updateArrivalTime(e.data);
        break;
      case this.pickupPubSub.EVENTS.PICKUP:
        this.riderPickedUp();
        break;
    }
  }

  setDestination(destination){
    this.destination = destination
  }

  riderPickedUp(){
    this.isRiderPickedUp = true;
  }

  updateArrivalTime(seconds){
    let minutes = Math.floor(seconds/60);
    this.timeTillArrival = minutes;
  }

  confirmPickup(){
    this.isPickupRequested = true;
  }

  cancelPickup(){
    this.isPickupRequested = false;
  }

}
