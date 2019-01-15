import auth0 from 'auth0-js';
import Auth0LockPasswordless from 'auth0-lock'

class PasswordlessAuth{
  constructor(){
    this.lock = new Auth0LockPasswordless("UFuQOeLyTA3p2rgsagyy1xuXkv8g3Tf9", "prismcore.auth0.com", {
      passwordlessMethod: "code",
      allowedConnections: ['email'],
      auth: {
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token'
      }
    });

    this.authFlag = 'isLoggedIn';

    this.lock.on('authenticated', function(authResult) {
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('access_token', authResult.accessToken);
   });
  }

  login() {
    this.lock.show();
  }

  signIn() {
    this.lock.show();
  }

  logout() {
    this.lock.logout({
      returnTo: 'http://localhost:3000',
      clientID: "UFuQOeLyTA3p2rgsagyy1xuXkv8g3Tf9",
    });
  }

  signOut() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.lock.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'UFuQOeLyTA3p2rgsagyy1xuXkv8g3Tf9',
    });
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  silentAuth() {
    if(this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.lock.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
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



const auth = new PasswordlessAuth();

export default auth;