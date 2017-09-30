import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid',
        internalOptions: {
            audience: 'https://api.investips.com'
        }
    });

    constructor(public router: Router) {}

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.auth0.getUserInfo(authResult.accessToken, (error, profile) => {
                    if(error)
                        throw error;


                });
                this.router.navigate(['/']);
            } else if (err) {
                this.router.navigate(['/']);
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        //localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        //localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

}

//
// <!DOCTYPE html>
// <html>
//     <head>
//         <meta charset="utf-8">
// <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
//     <title>Sign In with Auth0</title>
// <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     </head>
//     <body>
//
//         <!--[if IE 8]>
// <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
//     <![endif]-->
//
//     <!--[if lte IE 9]>
// <script src="https://cdn.auth0.com/js/base64.js"></script>
// <script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
// <![endif]-->
//
// <script src="https://cdn.auth0.com/js/lock/10.18/lock.min.js"></script>
//     <script>
// // Decode utf8 characters properly
// var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
// config.extraParams = config.extraParams || {};
// var connection = config.connection;
// var prompt = config.prompt;
// var languageDictionary;
// var language;
//
// if (config.dict && config.dict.signin && config.dict.signin.title) {
//     languageDictionary = { title: config.dict.signin.title };
// } else if (typeof config.dict === 'string') {
//     language = config.dict;
// }
// var loginHint = config.extraParams.login_hint;
//
// var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
//     auth: {
//         redirectUrl: config.callbackURL,
//         responseType: 'token',
//         params: config.internalOptions
//     },
//     assetsUrl:  config.assetsUrl,
//     allowedConnections: connection ? [connection] : null,
//     rememberLastLogin: !prompt,
//     language: language,
//     languageDictionary: languageDictionary,
//     theme: {
//         //logo:            'YOUR LOGO HERE',
//         //primaryColor:    'green'
//     },
//     prefill: loginHint ? { email: loginHint, username: loginHint } : null,
//     closable: false,
//     // uncomment if you want small buttons for social providers
//     // socialButtonStyle: 'small'
// });
//
// lock.show();
// </script>
// </body>
// </html>
