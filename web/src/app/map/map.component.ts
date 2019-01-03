import { Component, OnInit, ChangeDetectionStrategy, EventEmitter ,ChangeDetectorRef } from '@angular/core';
import { GeocodingApiService } from './mapService'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GeocodingApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  outputs: ['AreaDetail']
})


export class MapComponent implements OnInit {
  
  AreaDetail: EventEmitter<any>;
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(private cd: ChangeDetectorRef, private geocodingAPIService: GeocodingApiService) {
    this.AreaDetail = new EventEmitter();
  }

 
  updateLatLngFromAddress(address, country) {
    this.geocodingAPIService
      //.findFromAddress(this.address.value, this.postalCode.value, this.selectedPlace.value.place, this.selectedPlace.value.province, this.selectedPlace.value.region, this.selectedPlace.value.country)
      .findFromAddress(address, country)
      .subscribe(response => {

        // if (response.status == 'OK') {
        let data = {
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng,
        }

        this.lat = data.lat;
        this.lng = data.lng;

         this.cd.markForCheck();

        this.AreaDetail.emit(response)
        // } else if (response.status == 'ZERO_RESULTS') {
        //   console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
        // } else {
        //   console.log('geocodingAPIService', 'Other error', response.status);
        // }
      });
  }

  ngOnInit() {
  }

}
