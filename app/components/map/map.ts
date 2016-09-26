import {Component, OnInit, Input} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): any {
    this.map = this.createMap()
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
}
