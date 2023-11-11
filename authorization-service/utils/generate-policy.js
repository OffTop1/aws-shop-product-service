import { POLICY_EFFECT } from '../constants/policy-effect.js';

function generatePolicy({ username: principalId, isAuthorized }, resource) {
  const effect = isAuthorized ? POLICY_EFFECT.ALLOW : POLICY_EFFECT.DENY;

  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}

export { generatePolicy };
