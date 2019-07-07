import { Component } from '@angular/core';
import { Geofence } from '@ionic-native/geofence/ngx';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private platform: Platform, private geofence: Geofence) {
    this.platform.ready()
      .then(() => {
        this.geofence.initialize().then(
        // resolved promise does not return a value
        () => {
          console.log('Geofence Plugin Ready')
          this.addGeofence();
        },
        (err) => console.log(err)
      )
    });
  }

  private addGeofence() {
    //options describing geofence
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude: 47.5786, //center of geofence radius
      longitude: -122.0110,
      radius: 100, //radius to edge of geofence in meters
      transitionType: 3 //see 'Transition Types' below
    }

    this.geofence.addOrUpdate(fence).then(
       () => console.log('Geofence added'),
       (err) => console.log('Geofence failed to add')
     );
  }

}
