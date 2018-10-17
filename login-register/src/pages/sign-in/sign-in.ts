import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validator';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {

  credentialsForm: FormGroup;
  loginError: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private auth: AuthService) {

    //Creates a formGroup that has email and password
    //Validators.require means that it must be of non-null value
    //The Validators.pattern() validator ensures that a control matches a regex to its value 
    this.credentialsForm = this.formBuilder.group({
      email: [
        '', Validators.compose([
          Validators.pattern(regexValidators.email),
          Validators.required
        ])
      ],
      password: [
        '', Validators.compose([
          Validators.pattern(regexValidators.password),
          Validators.required
        ])
      ]
    });
  }

  //When sign in button hit, log user in if already exists
  onSignIn() {

    if (this.credentialsForm.valid) {
      console.log('Email: ' +
        this.credentialsForm.controls['email'].value);
      console.log('Password: ' +
        this.credentialsForm.controls['password'].value);

      let data = this.credentialsForm.value;

      if (!data.email) {
        return;
      }

      //form values
      let credentials = {
        email: data.email,
        password: data.password
      };
      //Relocates user if successful
      this.auth.signInWithEmail(credentials)
        .then(
          () => this.navCtrl.setRoot('LocationPage'),
          error => this.loginError = error.message
        );
    }
  }

  //Tries to log user in with google account
  //Otherwise, catches error
  tryGoogleLogin(){
    this.auth.signInWithGoogle()
    .then((res) => {
      this.navCtrl.push('LocationPage');
    }, (err) => {
      this.loginError = err.message;
    });
  }

  //Not implemented yet
  onForgotPassword() {
    console.log('SignInPage: onForgotPassword()');
  }
  
  //Redirects user to sign up page
  signup() {
    this.navCtrl.push(SignupPage);
  }

}