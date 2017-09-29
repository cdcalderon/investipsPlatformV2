interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'gh3DJB5h5gPWGxtUkHMwdXFqpj92klVX',
    domain: 'investips.auth0.com',
    callbackURL: 'http://localhost:4200/callback'
};
