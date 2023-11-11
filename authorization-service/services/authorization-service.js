
class AuthorizationService {
  constructor() { }

  authorize(credentials) {
    const [username] = credentials(':');
    const isAuthorized = process.env.CREDENTIALS === credentials;

    return { isAuthorized, username };
  }
}

export default AuthorizationService;
