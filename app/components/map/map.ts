import {Component, OnInit, Input} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import {PickupDirective} from '../pickup/pickup'
import {AvailableCarsDirective} from "../available-cars/available-cars";

/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'build/components/map/map.html',
  directives: [PickupDirective, AvailableCarsDirective],
})
export class MapDirective implements OnInit {

  @Input() isPickupRequested: boolean;

  public map;
  public isMapIdle: boolean;

  constructor(public nav: NavController,
              public loadingCtrl: LoadingController
  ) {
  }

  ngOnInit(): any {
    this.map = this.createMap();
    this.addMapEventListener();

    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    })
  }

  addMapEventListener(){
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    });
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    });
  }

  createMap(location = new google.maps.LatLng(40.712784, -74.005941)){
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);

    return map;
  }

  centerLocation(location){
    if(location){
      this.map.panTo(location);
    }
    else{
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      })
    }

  }

  getCurrentLocation(){

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();

    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    let locationObs = Observable.create(observable => {
      Geolocation.getCurrentPosition(options)
        .then(resp => {
            let lat = resp.coords.latitude;
            let lng = resp.coords.longitude;

            let location = new google.maps.LatLng(lat, lng);
            observable.next(location);

            loading.dismiss();
          },
          (err) => {
            console.log('Geolocation err" ' + err);
          }
        )

    })

    return locationObs;
  }

}
