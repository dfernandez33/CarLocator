import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private af: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

  loginFb() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    this.af.auth.signInWithPopup(provider).then(
      (x: any) => {
        const currentUserId = this.af.auth.currentUser.uid;
        this.db.database.ref('Users/' + currentUserId).set({
          name: x.additionalUserInfo.profile.name,
          email: x.additionalUserInfo.profile.email,
          profile_picture: x.additionalUserInfo.profile.picture.data.url
        });
        this.router.navigate(['home']);
      }
    );
  }

  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    this.af.auth.signInWithPopup(provider).then(
      (x: any) => {
        const currentUserId = this.af.auth.currentUser.uid;
        this.db.database.ref('Users/' + currentUserId).set({
          name: x.additionalUserInfo.profile.name,
          email: x.additionalUserInfo.profile.email,
          profile_picture: x.additionalUserInfo.profile.picture
        });
        this.router.navigate(['home']);
      }
    );
  }

  logOut(): Promise<any> {
   return this.af.auth.signOut().then(() => this.router.navigate(['']));
  }
}
