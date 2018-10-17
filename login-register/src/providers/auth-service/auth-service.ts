import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
	private user: firebase.User;


	constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	//Signs existing user in with email and password
	signInWithEmail(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			credentials.password);
	}

	//Creates a new firebase user with email and password
	signUp(credentials) {
		return new Promise<any>((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
				.then(res => {
					resolve(res);
				}, err => reject(err))
		})
	}

	//Creates user and adds to collection with an id
	//A user is composed of:
	//						first name
	//						last name
	//						email
	//						id
	createUser(
		first: any,
		last: any,
		email: any
	): Promise<void> {
		const id = this.firestore.createId();
		console.log(id);
		return this.firestore.doc(`Users/${id}`).set({
			id,
			first,
			last,
			email
		});
	}

	//Logs user in with google account
	signInWithGoogle(): Promise<any> {
		console.log('Sign in with google');
		//Creates an instance of the Google provider object, as provided by Firebase.
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}


	//User is prompt to sign in with their Google Account.
	//If on browser, popup window is displayed to login.
	//If on mobile, redirected to the sign-in page inside the application page 
	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
				.then(() => {
					return this.afAuth.auth.getRedirectResult().then(result => {
						let myProp = 'accessToken';
						if (result.credential) {
							// This gives you a Google Access Token.
							// You can use it to access the Google API.
							let token = result.credential[myProp];
						}
						// The signed-in user info.
						let user = result.user;

					}).catch(function (error) {
						// Handle Errors here.
						alert(error.message);
					});
				});
		}
	}

	//checks whether user is logged in ot not
	get authenticated(): boolean {
		return this.user !== null;
	}

	//Gets user's email
	getEmail() {
		return this.user && this.user.email;
	}

	//Signs user out
	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

}