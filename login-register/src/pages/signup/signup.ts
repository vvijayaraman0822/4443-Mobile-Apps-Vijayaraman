import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { regexValidators } from '../validator';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupError: string;
  form: FormGroup;
 
  constructor(fb: FormBuilder, private navCtrl: NavController, private auth : AuthService) {
    //Form that requires first/last names, password and email
    this.form = fb.group({
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
      ],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }


  createUser(first:any, last:any, email: any){
    this.auth.createUser(first,last,email);
  }

  //Creates a new user and adds to firebase
  //If successful, relocates user to geolocation page
  signup() {
		let data = this.form.value;
		let credentials = {
			email: data.email,
      password: data.password,
      first: data.first_name,
      last: data.last_name
    };
    
		this.auth.signUp(credentials).then(() => {
        this.createUser(credentials.first,credentials.last,credentials.email);
        this.navCtrl.setRoot('LocationPage')
      },
			error => this.signupError = error.message
		);
}
}
