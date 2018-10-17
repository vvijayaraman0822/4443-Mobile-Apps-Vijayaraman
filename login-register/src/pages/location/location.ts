import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from '../../providers/data/data';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';


declare var google;


@IonicPage()
@Component({
  selector: 'location-page',
  templateUrl: 'location.html'
})
export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  position: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, 
              private data: DataProvider, private toastCtrl: ToastController,
              private menu: MenuController, private auth: AuthService) {
  }

  //Calls loadMap
  ionViewDidLoad() {
    this.loadMap();
    
  }

  //Loads map with user's location
  loadMap() {
    //If Promise resolves current location, load map
    this.geolocation.getCurrentPosition().then((position) => {
      this.position = position;
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();

    }, (err) => {
      console.log(err);
    
    });
  }

  //Has data provider upload location
  //Displays message if successfuly uploaded
  addLocation()
  {
    this.data.addLocation(this.position)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Location was uploaded successfully',
          duration: 3000
        });
        toast.present();
      }, err => {
        console.log(err)
      })
    
  }
  
  //Adds a marker to the google map
  //Creates info window 
  addMarker() {

    //Pin that drops on user's location
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    //Information to be displayed in info window
    let content = String(this.map.getCenter());

    this.addInfoWindow(marker, content);

  }

  //Shows an info window when the marker is clicked
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  logout()
  {
    this.menu.close();
    this.auth.signOut();
    this.navCtrl.setRoot('SignInPage');
  }

}