import { Constants } from './../../../utils/Constants';
import { ChallengeServiceService } from './../../../services/challenge-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GroundsService } from 'src/app/services/grounds.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';


// 1. get Data from getAllGrounds
// 2. Populate Grounds
// 3. Based on which ground selected
// 4. Block dates which cannot be selected. [...challenges.reduce(toRemoveBlockedDates), ...ground_bookings.reduce(toRemoveBlockedDates)].reduce(toRemoveBlockedDates)

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
  challengeDate = moment().format('YYYY-MM-DD');
  closedSlots: any = [];
  selectedGround: any;
  bookingTime: any = [];
  allTimeSlots = Constants.timeSlots;

  editChallengeId: string;
  editChallengeObj: any;
  today = moment().format('YYYY-MM-DD');


  // TODO: For Edit
  // 1. select dates
  // 2. disable dates not in use.


  constructor(private router: Router, groundService: GroundsService,
    private authService: AuthServiceService, private challengeService: ChallengeServiceService,
    private activatedRoute: ActivatedRoute) {

    this.editChallengeId = this.activatedRoute.snapshot.queryParamMap.get('challenge') || "";

    if (this.editChallengeId) {
      challengeService.getChallengeById(this.editChallengeId).subscribe(
        (challenge: any) => {
          console.log("challenge ana mangta ===>", challenge);

          // this.createChallengeForm.controls["start_time"].setValue(challenge.start_time)
          // this.createChallengeForm.controls["end_time"].setValue(challenge.end_time);
          this.selectedGround = challenge.ground;
          this.editChallengeObj = challenge;

          this.populateClosedSlots(this.editChallengeObj.match_date);

          this.createChallengeForm.controls["ground"].setValue(challenge.ground.id);
          this.createChallengeForm.controls["match_date"].setValue(challenge.match_date);
          this.createChallengeForm.controls["number_of_players"].setValue(challenge.number_of_players);
        }
      )
    }

    authService.getUserData().subscribe(
      (data) => {
        this.user = data;
        if (this.user.team) {
          this.createChallengeForm.controls["creator"].setValue(this.user?.team);
        }
        else {
          console.log("Team Not Found: Redirecting to create team page");
          this.router.navigate(["team"]);
        }


      },
      (err) => {
        console.log("Error Fetching User Data from createChallenge", err);


      }
    )
    groundService.getAllGrounds().subscribe(
      (data) => {
        this.allGrounds = data;
        console.log("ALL Ground are --->", this.allGrounds);
        if (this.editChallengeId) {
          this.selectedGround = this.allGrounds.find((ground) => {
            return ground['id'] === this.editChallengeObj.ground.id;
          });
        }
        console.log("SelectedGround ====>", this.selectedGround)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {

  }

  onGroundSelect(event: any) {
    this.selectedGround = this.allGrounds.find((ground) =>
      ground['id'] === event.target.value
    );
  }

  onDateSelection(event: any) {
    console.log("Challenge Date ===>", event.target?.value);
    let challengeDate = event.target?.value;

    this.populateClosedSlots(challengeDate);
  }

  populateClosedSlots(challengeDate: any) {
    console.log("ChallengeDate ===> ", challengeDate);

    console.log("Selected Ground ===> ", this.selectedGround);
    this.closedSlots = [];
    // TODO: if there are too many challenges to check, then make a call to the backend for getChallenges with date from today and selected ground.
    let challengesForSelectedGround = [
      ...this.selectedGround.challenges,
      ...this.selectedGround.ground_bookings,
    ];

    let ClosedSlotObj = challengesForSelectedGround.filter(
      (challenge: any) =>
      (challenge.match_date === challengeDate ||
        challenge.booking_date === challengeDate)
    );
    // this.closedSlot;

    console.log("Closed challengesForSelectedGround Slot ==>", challengesForSelectedGround)
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
    console.log("Closed Time Slot ==>", this.closedSlots)
  }

  isTimeSlotDisabled(timeSlot: String) {
    console.log("=========== TIMESLOT ===========", timeSlot)
    let isClosed = this.closedSlots.find((time: any) => timeSlot.includes(time));
    console.log('isClosed', isClosed)
    console.log("=========== TIMESLOT ===========")
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
    // TODO: if edit challenge ===> make put call.
    console.log("this.bookingTime", this.bookingTime)
    console.log("this.createChallengeForm", this.createChallengeForm)
    if (this.bookingTime.length > 0 && this.createChallengeForm.valid) {

      this.bookingTime.forEach((timeSlot: string, index: number) => {
        let timeSlotArr = timeSlot.split(' - ')
        this.createChallengeForm.controls["start_time"].setValue(timeSlotArr[0].trim().concat(":00.000"))

        this.createChallengeForm.controls["end_time"].setValue(timeSlotArr[1].trim().concat(":00.000"));

        this.createChallengeForm.controls["number_of_players"].setValue(parseInt(this.createChallengeForm.get('number_of_players')?.value));
        console.log("createChallengeForm: ", this.createChallengeForm.value);

        if (this.editChallengeId) {
          this.challengeService.updateChallenge(this.editChallengeId, this.createChallengeForm.value).subscribe(
            data => {
              console.log("Challenge Updated Successfully:", data)
              this.router.navigateByUrl('');
            }
          )
        }
        else {
          this.challengeService.createChallenge(this.createChallengeForm.value).subscribe(
            data => {
              console.log("Challenge Created Successfully:", data)
              this.router.navigateByUrl('');
            },
            err => {
              console.log("Error Saving create Challenge on backend:", err)
            }
          )
        }
      })
      this.createChallengeForm.reset();
    } else {
      console.log("error that for is incomplete")
    }
  }

  isTimeSlotSelected(timeSlot: string) {

    if (this.editChallengeObj) {
      let selectedTimeSlot = `${this.editChallengeObj.start_time.substr(0, 5)} - ${this.editChallengeObj.end_time.substr(
        0,
        5
      )}`;

      // console.log("Selected TimeSlot ===>", selectedTimeSlot);
      if (selectedTimeSlot == timeSlot) {
        return true
      }
    }
    return false
  }


}
