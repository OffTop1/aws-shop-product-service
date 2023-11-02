import { PublishCommand } from "@aws-sdk/client-sns";

class SNSService {
  constructor(client) {
    this.client = client;
  }

  async publish(message) {
    const publishCommand = new PublishCommand({
      Subject: 'New product has been created',
      Message: JSON.stringify(message),
      TopicArn: process.env.SNS_ARN
    });
    await this.client.send(publishCommand);
  }
}

export default SNSService;
