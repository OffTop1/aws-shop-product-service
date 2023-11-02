import { SNSClient } from '@aws-sdk/client-sns';
import SNSService from '../services/sns-service.js';

const client = new SNSClient();
const snsService = new SNSService(client);

async function catalogBatchProcess(event) {
  const messages = event.Records.map(({ body }) => body);
  const publishCommands = messages.map(message => snsService.publish(message));
  await Promise.all(publishCommands);
}

export default catalogBatchProcess;
