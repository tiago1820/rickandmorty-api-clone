import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } from "../../config.js";
import fs from 'fs';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3Service {
    constructor() {
        this.client = new S3Client({
            region: AWS_BUCKET_REGION,
            credentials: {
                accessKeyId: AWS_PUBLIC_KEY,
                secretAccessKey: AWS_SECRET_KEY
            }
        });
    }

    uploadFile = async (file) => {
        const stream = fs.createReadStream(file.tempFilePath);
        const uploadParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: file.name,
            Body: stream
        }
        const command = new PutObjectCommand(uploadParams);
        return await this.client.send(command);
    }

    getFileURL = async (filename) => {
        const command = new GetObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: filename
        })
        return await getSignedUrl(this.client, command, { expiresIn: 60 })
    }

    getImageURL = async (characters) => {
        for (const character of characters) {

            if (character.image) {
                const imageURL = await this.getFileURL(character.image);
                character.image = imageURL;
            }

        }

        return characters;
    }
}