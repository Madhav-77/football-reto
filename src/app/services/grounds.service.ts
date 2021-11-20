import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class GroundsService {
  baseUrl = "https://reto-football.herokuapp.com/";
  constructor(private httpClient: HttpClient) { }

  getAllGrounds() {
    return this.httpClient.get<any>(Constants.domain + Constants.ground_endpoint);
    //console.log(loginFormObj)
  }


  getGroundById(id: string) {
    return this.httpClient.get<any>(Constants.domain + Constants.ground_endpoint + "/" + id)
  }


  getGroundBookingsByGroundAndDate(groundId: string, date: string) {
    return this.httpClient.get(Constants.domain + Constants.ground_bookings_endpoint + `?_where[ground.id]=${groundId}&_where[booking_date_eq]=${date}`)
    // {{url-qa}}/ground-bookings?_where[ground.id]={{groundId}}&_where[booking_date_eq]=2021-11-19
  }


  deleteGroundBooking(id: string) {
    return this.httpClient.delete(Constants.domain + Constants.ground_bookings_endpoint + `/${id}`)
    // {{url-qa}}/ground-bookings/6198d1f460d8db0015380444
  }

  createGroundBooking(data: any){
    return this.httpClient.post(Constants.domain + Constants.ground_bookings_endpoint, data);
  }
}
