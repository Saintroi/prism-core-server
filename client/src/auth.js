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
    this.idTokenFlag = 'idToken';
    this.tokenLoading = false;
    this.adminFlag = "isAdmin";
    this.currUserId = null;

  }

  login() {
    this.auth0.authorize();
  }

  signIn() {
    this.auth0.authorize();
  }

  getIdToken() {
    try{
      return localStorage.getItem(this.idTokenFlag);
    }
    catch (error){
      this.signOut()
    }
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
  
    localStorage.setItem(this.idTokenFlag, this.idToken);
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  setAdmin() {
    localStorage.setItem(this.adminFlag, JSON.stringify(true));
  }
  
  isAdmin() {
    return JSON.parse(localStorage.getItem(this.adminFlag));
  }

  setId(id) {
    localStorage.setItem(this.currUserId, JSON.stringify(id));
  }

  getId() {
    return JSON.parse(localStorage.getItem(this.currUserId));
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
            localStorage.removeItem(this.adminFlag);
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