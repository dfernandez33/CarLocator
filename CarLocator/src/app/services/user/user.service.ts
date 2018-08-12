import { Injectable } from '@angular/core';
import { DatabaseReference } from '../../../../node_modules/angularfire2/database/interfaces';
import { AngularFireAuth } from '../../../../node_modules/angularfire2/auth';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { from, Observable } from '../../../../node_modules/rxjs';
import { IUser } from '../../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbRef: DatabaseReference;

  constructor(private af: AngularFireAuth, private db: AngularFireDatabase) {
    this.dbRef = this.db.database.ref('Users');
   }

   getCurrentUserId(): string {
     return this.af.auth.currentUser.uid;
   }
   isLoggedIn(): boolean {
     return this.af.auth.currentUser ? true : false;
   }

   getUserInfo(): Observable<IUser> {
     return from(this.dbRef.child(this.af.auth.currentUser.uid).once('value').then(
       (x) => {
         return x.val();
       }
     ));
   }

   userExists(currentUserId: string): Observable<boolean> {
    return from(this.dbRef.child(currentUserId).once('value').then(
      (data) => {
        return data.val() !== null ? true : false;
      }
    ));
   }
}