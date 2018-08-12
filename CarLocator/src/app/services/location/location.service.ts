import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { UserService } from '../user/user.service';
import { DatabaseReference, DatabaseSnapshot } from '../../../../node_modules/angularfire2/database/interfaces';
import { ILocation } from '../../interfaces/ilocation';
import { from, Observable } from '../../../../node_modules/rxjs';
import { database } from '../../../../node_modules/firebase';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public dbRef: DatabaseReference;
  public currentUserId: string;

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.currentUserId = this.userService.getCurrentUserId();
    this.dbRef = this.db.database.ref(`Locations/${this.currentUserId}`);
   }

   getLocationRef() {
    return this.dbRef;
   }
}
