import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user/user.service';
import { LocationService } from '../../services/location/location.service';
import { DatabaseReference } from '../../../../node_modules/angularfire2/database/interfaces';
import { Location } from '../../classes/location';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit, OnDestroy {


  public fetchingData;

  public currentUser: IUser;

  public carLocation: Location;
  public carAddress: string;

  public userLocation: Location;
  public userAddress: string;

  private locationRef: DatabaseReference;
  private onValueChange;
  private geoCoder: google.maps.Geocoder;

  public renderOptions;

  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private ref: ChangeDetectorRef, private locationService: LocationService, private router: Router) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.fetchingData = true;
    if (this.userService.isLoggedIn()) {
      this.userService.getUserInfo().subscribe(
        (user: IUser) => {
          this.currentUser = user;
          this.ref.detectChanges();
        }
      );
      this.locationRef = this.locationService.getLocationRef();
      // attach listener to carLocation so that it gets updated when the db changes
      this.onValueChange = this.locationRef.on('value', (snapshot) => {
        this.carLocation = snapshot.val();
        if (navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.userLocation = new Location(position.coords.latitude, position.coords.longitude);
            // call this once both location values are set inside async call
            this.geoCoder = new google.maps.Geocoder;
            this.reverseGeoCodeAddress();
          });
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  private reverseGeoCodeAddress() {
    this.renderOptions = {
      suppressMarkers: true,
    };
    this.userLocation = new Location(34.74, -85.38); // this is only for testing
    this.geoCoder.geocode({ 'location': { lat: this.userLocation.lat, lng: this.userLocation.lng } },
      (results, status) => {
        if (status.toString() === 'OK') {
          if (results[0]) {
            this.userAddress = results[0].formatted_address;
          } else {
            this.userAddress = 'No street address was found for your location';
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
    this.geoCoder.geocode({ 'location': { lat: this.carLocation.lat, lng: this.carLocation.lng } },
      (carResults, carStatus) => {
        if (carStatus.toString() === 'OK') {
          if (carResults[0]) {
            this.carAddress = carResults[0].formatted_address;
          } else {
            this.carAddress = 'No street address was found for your car';
          }
        } else {
          window.alert('Geocoder failed due to: ' + carStatus);
        }
        this.fetchingData = false;
        this.ref.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.locationRef.off('value', this.onValueChange);
  }

}
