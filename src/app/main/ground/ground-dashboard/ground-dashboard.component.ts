import { ChallengeServiceService } from './../../../services/challenge-service.service';
import { GroundsService } from 'src/app/services/grounds.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import * as moment from 'moment';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-ground-dashboard',
  templateUrl: './ground-dashboard.component.html',
  styleUrls: ['./ground-dashboard.component.sass']
})
export class GroundDashboardComponent implements OnInit {

  ground_owner: any;
  ground_id: any;
  ground: any
  today: any;
  selected_date: any;
  selected_date_challenges: any;
  booking_details: any = [];
  selected_date_booked_slots: any = [];

  constructor(private groundService: GroundsService, private authService: AuthServiceService, private challengeService: ChallengeServiceService) { }

  ngOnInit(): void {
    this.selected_date = this.today = moment().format('DD-MM-YYYY');

    this.authService.getUserData().subscribe((data: any) => {
      this.ground_owner = data
      this.ground_id = data.ground_owned;
      console.log("Ground Owner Details are ==>", this.ground_owner)
      console.log("Ground ID  ==>", this.ground_id)

      this.filterBookingsByDate();
      this.groundService.getGroundById(this.ground_id).subscribe((ground_data: any) => {
        this.ground = ground_data
        // this.filterBookingsByDate();


        console.log("Ground Details are  ==>", this.ground)

      },
        err => {
          console.log("Error Retrieving Ground Information")
          console.log(err)
        })
    },
      err => {
        console.log("Error Retrieving Ground Owner Info: ");
        console.log(err)
      })
  }


  private filterBookingsByDate() {

    this.selected_date_booked_slots = [];
    this.booking_details = [];
    Constants.timeSlots.forEach((time) => {
      this.booking_details.push({
        "time": time
      });
    })

    this.challengeService.getChallengesByGroundAndDate(this.ground_id, moment(this.selected_date, "DD-MM-YYYY").format("YYYY-MM-DD")).subscribe((data: any) => {
      this.selected_date_booked_slots = [...this.selected_date_booked_slots, ...data]
      data.forEach((challenge: any) => {
        let closeSlot = `${challenge.start_time.substr(0, 5)} - ${challenge.end_time.substr(0, 5)}`

        let booked_slot_index = this.booking_details.findIndex((booking_detail: any) => closeSlot.includes(booking_detail.time));

        if (booked_slot_index != -1 && challenge.acceptor) {
          this.booking_details[booked_slot_index] = { ...this.booking_details[booked_slot_index], ...challenge }
        }
      })

      console.log("this.booking_details ==> ", this.booking_details)
    },
      err => {
        console.error("getChallengesByGroundAndDate API call  Failed ===>", err);
      })

    this.groundService.getGroundBookingsByGroundAndDate(this.ground_id, moment(this.selected_date, "DD-MM-YYYY").format("YYYY-MM-DD")).subscribe((data: any) => {
      this.selected_date_booked_slots = [...this.selected_date_booked_slots, ...data];
      console.log("ground_booking data ==>", data)
      data.forEach((ground_booking: any) => {
        let closeSlot = `${ground_booking.start_time.substr(0, 5)} - ${ground_booking.end_time.substr(0, 5)}`
        console.log("Closed Slot Detials ===>", closeSlot)
        let booked_slot_index = this.booking_details.findIndex((booking_detail: any) => closeSlot.includes(booking_detail.time));
        console.log("Closed Slot Index ===>", booked_slot_index)

        if (booked_slot_index != -1) {
          this.booking_details[booked_slot_index] = { ...this.booking_details[booked_slot_index], ...ground_booking }
        }
      })
    },
      err => {
        console.error("getGroundBookingsByGroundAndDate API call  Failed ===>", err);
      })
  }



  add_ground_booking(time: any) {
    console.log("add_ground_booking time ===>", time)

    let timeSlotArr = time.split(' - ')
    let data = {
      "booking_date": moment(this.selected_date, "DD-MM-YYYY").format("YYYY-MM-DD"),
      "start_time": timeSlotArr[0].trim().concat(":00.000"),
      "end_time": timeSlotArr[1].trim().concat(":00.000"),
      "ground": this.ground_id
    }

    this.groundService.createGroundBooking(data).subscribe(data => {
      console.log("data ===>", data);
      this.filterBookingsByDate();
    },
      err => {
        console.log("Error Creating Ground Bookings ===>", err)
      })
  }

  remove_ground_booking(booking_detail: any) {
    console.log("remove_ground_booking booking_details ===>", booking_detail.id);
    this.groundService.deleteGroundBooking(booking_detail.id).subscribe((data: any) => {
      console.log("data ===>", data);
      this.filterBookingsByDate();
    },
      err => {
        console.log("Error Creating Ground Bookings ===>", err)
      })
  }

  changeDate(date_type: string) {
    if (date_type == 'next') {
      console.log("this.selected_date ==>", this.selected_date);
      let temp_date = moment(this.selected_date, "DD-MM-YYYY");
      temp_date.format();
      temp_date.add(1, "day");
      this.selected_date = temp_date.format("DD-MM-YYYY")
    }
    else if (date_type == 'previous') {
      let temp_date = moment(this.selected_date, "DD-MM-YYYY");
      temp_date.format();
      temp_date.subtract(1, "day");
      this.selected_date = temp_date.format("DD-MM-YYYY");
    }

    this.filterBookingsByDate();
  }
}
