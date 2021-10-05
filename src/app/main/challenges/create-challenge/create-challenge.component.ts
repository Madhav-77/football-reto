import { Constants } from './../../../utils/Constants';
import { ChallengeServiceService } from './../../../services/challenge-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GroundsService } from 'src/app/services/grounds.service';
import { Router } from '@angular/router';

// TODO:
// 1. get Data from getAllGrounds
// 2. Populate Grounds
// 3. Based on which ground selected
// 4. Block dates which cannot be selected. [...challenges.reduce(toRemoveBlockedDates), ...ground_bookings.reduce(toRemoveBlockedDates)].reduce(toRemoveBlockedDates)
// 5.
@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.sass'],
})
export class CreateChallengeComponent implements OnInit {
  createChallengeForm = new FormGroup({
    ground: new FormControl('', Validators.required),
    match_date: new FormControl(new Date(), Validators.required),
    start_time: new FormControl(''),
    creator: new FormControl(''),
    end_time: new FormControl(''),
    number_of_players: new FormControl(0, Validators.required),
  });

  user: any;
  allGrounds = [];
  challengeDate: any;
  closedSlots: any = [];
  selectedGround: any;
  bookingTime: any = [];
  allTimeSlots = Constants.timeSlots;

  constructor(private router: Router, groundService: GroundsService, private authService: AuthServiceService, private challengeService: ChallengeServiceService) {
    authService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.createChallengeForm.controls["creator"].setValue(this.user?.team);
      },
      (err) => {
        console.log("Error Fetching User Data from createChallenge", err);
      }
    )
    groundService.getAllGrounds().subscribe(
      (data) => {
        this.allGrounds = data;
        console.log('All Grounds ===>', this.allGrounds);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {

  }

  onGroundSelect(event: any) {
    this.selectedGround = this.allGrounds.find((ground) => {
      return ground['id'] === event.target.value;
    });
  }

  onDateSelection(event: any) {
    let challengeDate = event.target.value;
    this.closedSlots = [];
    let challengesForSelectedGround = [
      ...this.selectedGround.challenges,
      ...this.selectedGround.ground_bookings,
    ];

    let ClosedSlotObj = challengesForSelectedGround.filter(
      (challenge: any) =>
        challenge.match_date === challengeDate ||
        challenge.booking_date === challengeDate
    );
    // this.closedSlot;
    ClosedSlotObj.forEach((slot) => {
      console.log(slot);
      console.log(
        `${slot.start_time.substr(0, 5)} - ${slot.end_time.substr(0, 5)}`
      );
      console.log('end_time: ', slot.end_time.substr(0, 5));
      let timeSlot = `${slot.start_time.substr(0, 5)} - ${slot.end_time.substr(
        0,
        5
      )}`;
      this.closedSlots.push(timeSlot);
    });
    console.log('closed Slots are ====>', this.closedSlots);
  }

  isTimeSlotDisabled(timeSlot: any) {
    let isClosed = this.closedSlots.find((time: any) => time === timeSlot);
    // console.log('isClosed', isClosed)
    if (isClosed) {
      return true;
    } else {
      return false;
    }
  }

  onTimeSlotSelect(timeSlot: any) {

    let index = this.bookingTime.findIndex(
      (booking: string, index: number) => booking == timeSlot
    );

    if (index != -1) {
      this.bookingTime.splice(index, 1);
    } else {
      this.bookingTime.push(timeSlot);
    }
    // console.log("allBookings ===>", this.bookingTime)
  }


  submitCreateChallengeForm() {
    console.log("this.bookingTime", this.bookingTime)
    console.log("this.createChallengeForm", this.createChallengeForm)
    if (this.bookingTime.length > 0 && this.createChallengeForm.valid) {

      this.bookingTime.forEach((timeSlot: string, index: number) => {
        console.log("timeSlot ===>",);
        let timeSlotArr = timeSlot.split(' - ')
        console.log("timeSlotArr", timeSlotArr)
        this.createChallengeForm.controls["start_time"].setValue(timeSlotArr[0].trim().concat(":00.000"))

        this.createChallengeForm.controls["end_time"].setValue(timeSlotArr[1].trim().concat(":00.000"));

        this.createChallengeForm.controls["number_of_players"].setValue(parseInt(this.createChallengeForm.get('number_of_players')?.value));
        console.log("x", this.createChallengeForm.value);
        this.challengeService.createChallenge(this.createChallengeForm.value).subscribe(
          data => {
            console.log("Challenge Created Successfully:", data)
            this.router.navigateByUrl('');
          },
          err => {
            console.log("Error Saving create Challenge on backend:", err)
          }
        )

      })
      this.createChallengeForm.reset();
    } else {
      console.log("error that for is incomplete")
    }
  }

 
}
