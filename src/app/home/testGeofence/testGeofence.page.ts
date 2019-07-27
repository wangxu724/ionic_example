import { Component } from '@angular/core';
// import { Geofence } from '@ionic-native/geofence/ngx';
import { Platform } from '@ionic/angular';

declare var GeofencePlugin: GeofencePlugin;

@Component({
  selector: 'test-geofence',
  templateUrl: 'testGeofence.page.html',
  styleUrls: ['testGeofence.page.scss'],
})
export class TestGeofencePage {

  constructor(private platform: Platform) {
    this.platform.ready()
      .then(() => {
        GeofencePlugin.initialize().then(
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

    GeofencePlugin.addOrUpdate(fence).then(
       () => console.log('Geofence added'),
       (err) => console.log('Geofence failed to add')
     );
  }

}
