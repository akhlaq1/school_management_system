import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodingApiService {
    
    constructor(private http: Http) {
       
    }

    //findFromAddress(address: string, postalCode?: string, place?: string, province?: string, region?: string, country?: string): Observable<any> {
    findFromAddress(address: string, country?: string): Observable<any> {
        let compositeAddress = [address];

        // if (postalCode) compositeAddress.push(postalCode);
        // if (place) compositeAddress.push(place);
        // if (province) compositeAddress.push(province);
        // if (region) compositeAddress.push(region);
     //if (country) compositeAddress.push(country);



    let _address = compositeAddress.join(',');
  
        //let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAWubVBlol2njoEldMQK5FQ7W2nXua1MsE&address=karachi,pakistan'
     //   console.log(url)

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${_address}&key=AIzaSyBZVs2PkDv9btc_nqQvBytm_JFTVzjyd4k&callback=initMap`

        return this.http.get(url).map(response => <any>response.json());
    }
}