import {Component, OnInit, Input} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'build/components/map/map.html'
})
export class MapDirective implements OnInit {

  @Input() isPickupRequested: boolean;

  public map;

  constructor(public nav: NavController,
              public loadingCtrl: LoadingController
  ) {
  }

  ngOnInit(): any {
    this.map = this.createMap();

    this.getCurrentLocation().subscribe(location => {
      this.map.panTo(location);
    })
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
