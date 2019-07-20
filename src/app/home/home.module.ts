import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TestGeofencePage } from './testGeofence/testGeofence.page';
import { Geofence } from '@ionic-native/geofence/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      { path: '', component: HomePage },
      { path: 'testGeofence', component: TestGeofencePage },
    ])
  ],
  providers: [
    Geofence,
  ],
  declarations: [HomePage, TestGeofencePage]
})
export class HomePageModule {}
