import { SendMessageCommand } from '@aws-sdk/client-sqs';

class SQSService {
  constructor(client) {
    this.client = client;
  }

  async sendMessage(body) {
    const messageParams = {
      QueueUrl: process.env.SQS_URL,
      MessageBody: JSON.stringify(body)
    };
    const sendMessageCommand = new SendMessageCommand(messageParams);
    await this.client.send(sendMessageCommand);
  }
}

export default SQSService;
