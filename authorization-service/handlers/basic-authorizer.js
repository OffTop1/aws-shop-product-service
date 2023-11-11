import AuthorizationService from '../services/authorization-service.js';
import { generatePolicy } from '../utils/generate-policy.js';

const authorizationService = new AuthorizationService();

function basicAuthorizer(event) {
  const authorizationHeader = event.headers['authorization'];
  const [authorizationType, token] = authorizationHeader.split(' ');

  if (authorizationType !== 'Basic' || !token) {
    return {
      statusCode: 401,
      body: 'Unauthorized'
    }
  }

  try {
    const credentials = atob(token);
    const authorizationResult = authorizationService.authorize(credentials);

    return generatePolicy(authorizationResult, event.routeArn);
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify(error)
    }
  }
}

export default basicAuthorizer;
