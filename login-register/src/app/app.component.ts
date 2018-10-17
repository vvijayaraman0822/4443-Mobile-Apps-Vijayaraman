// Vasudev Vijayaraman 

// Imports so we can use it 
import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MenuController, Nav, Platform } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'SignInPage'; // first page that appears is the sign in page so it is the root page
  pages: Array<{title: string, component: any, icon: any}> // type string 

  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, // constructer taking in parameters
    private menu : MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide(); // hides the splash screen

      // all the pages have icons 
      this.pages = [
        {title: 'Login', component: 'SignInPage', icon: 'home'}, 
        {title: 'Signup', component: 'SignupPage', icon: 'home'},
        {title: 'Location', component: 'LocationPage', icon: 'home'}
      ];
    });
  }
  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
    }
  
}

