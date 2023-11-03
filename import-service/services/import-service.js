import { PutObjectCommand, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BUCKET } from "../utils/constants.js";


class ImportService {
  constructor(client) {
    this.client = client;
  }

  createPresignedUrl(params) {
    const command = new PutObjectCommand(params);
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  async getObject(key) {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    const { Body } = await this.client.send(command);
    return Body;
  }

  async moveObject(key) {
    const copyCommand = new CopyObjectCommand({
      Bucket: BUCKET,
      CopySource: BUCKET + '/' + key,
      Key: key.replace('uploaded', 'parsed')
    });
    await this.client.send(copyCommand);

    const deleteCommand = new DeleteObjectCommand({ Bucket: BUCKET, Key: key });
    await this.client.send(deleteCommand);
  }
}

export default ImportService;
