import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Google maps components
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];

export const firebaseConfig = {
  apiKey: 'AIzaSyDhYu1nGnzRP1rvuFB-yum_WpS4qwxsWc0',
  authDomain: 'car-locator-a8b2d.firebaseapp.com',
  databaseURL: 'https://car-locator-a8b2d.firebaseio.com',
  projectId: 'car-locator-a8b2d',
  storageBucket: '',
  messagingSenderId: '412988672054'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyAq-2fYK9-xbAzil1Vh8wmnvbgsAkn0Tzw'
      }
    ),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
