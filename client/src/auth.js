import auth0 from 'auth0-js';
import config from './config';

class Auth {
  constructor() {

    this.auth0 = new auth0.WebAuth({
      domain: "prismcore.auth0.com",
      clientID: "UFuQOeLyTA3p2rgsagyy1xuXkv8g3Tf9",
      redirectUri: config.appUrl+'/callback',
      audience: 'http://157.230.5.241',
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.authFlag = 'isLoggedIn';
    this.tokenLoading = false;

  }

  login() {
    this.auth0.authorize();
  }

  signIn() {
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    }) 
    .catch(err => {
      console.log(err);
      this.signOut();
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.tokenLoading = true;
  
    console.log(this.idToken);
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  logout() {
    this.auth0.logout({
      returnTo: config.appUrl,
      clientID: "UFuQOeLyTA3p2rgsagyy1xuXkv8g3Tf9",
    });
  }

  signOut() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: config.appUrl,
      clientID: 'UFuQOeLyTA3p2rgsagyy1xuXkv8g3Tf9',
    });
  }

  silentAuth() {
    if(this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            this.signOut();
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the token's expiry time
    return JSON.parse(localStorage.getItem(this.authFlag));
  }
}

const auth = new Auth();

export default auth;