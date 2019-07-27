import { Component } from '@angular/core';
// import { Geofence } from '@ionic-native/geofence/ngx';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private platform: Platform) {
  }
}
