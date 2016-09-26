import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapDirective } from '../../components/map/map';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [MapDirective]
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
