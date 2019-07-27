// Orginal file locate at app_native_code/typings/app-native-code.d.ts
// Make change there

interface TransitionType {
    ENTER: number;
    EXIT: number;
    BOTH: number;
}

interface GeofencePlugin {
    initialize(
      successCallback?: (result: any) => void,
      errorCallback?: (error: string) => void
    ): Promise<any>;

    addOrUpdate(
      geofence: Geofence | Geofence[],
      successCallback?: (result: any) => void,
      errorCallback?: (error: string) => void
    ): Promise<any>;

    remove(
      id: number | number[],
      successCallback?: (result: any) => void,
      errorCallback?: (error: string) => void
    ): Promise<any>;

    removeAll(
      successCallback?: (result: any) => void,
      errorCallback?: (error: string) => void
    ): Promise<any>;

    getWatched(
      successCallback?: (result: any) => void,
      errorCallback?: (error: string) => void
    ): Promise<string>;
}

interface Geofence {
    id: string;
    latitude: number;
    longitude: number;
    radius: number;
    transitionType: number;
}