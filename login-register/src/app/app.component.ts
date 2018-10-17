import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MenuController, Nav, Platform } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'SignInPage';
  pages: Array<{title: string, component: any, icon: any}>

  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private menu : MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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

