import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapDirective } from '../../components/map/map';
import {PickupPubSub} from "../../providers/pickup-pub-sub/pickup-pub-sub";

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [MapDirective],
  providers: [PickupPubSub],
})
export class HomePage {

  public isPickupRequested: boolean;

  constructor(public navCtrl: NavController) {

  }

  confirmPickup(){
    this.isPickupRequested = true;
  }

  cancelPickup(){
    this.isPickupRequested = false;
  }

}
