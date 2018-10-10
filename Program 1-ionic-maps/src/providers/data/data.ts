import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {  map } from 'rxjs/operators';
import * as firebase from 'firebase'



@Injectable()
export class DataProvider {

  constructor(private firestore: AngularFirestore) {
    console.log('Hello DataProvider Provider');
}

//Adds id, location and time to firebase
addLocation(position){
  console.log('Sending your coords');

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let stamp = Date.now();

  return new Promise<any>((resolve, reject) => {
    this.firestore.collection('/locations').add({
      id: 1,
      point: new firebase.firestore.GeoPoint(lat, lon),
      time: new Date(stamp)
    })
    .then(
      (res) => {
        resolve(res)
      },
      err => reject(err)
    )
  });
}


}
