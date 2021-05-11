import { MongoClient } from 'mongodb';
require('dotenv').config();

const dbUrl = process.env.MONGODB_URL;

export async function connectToDatabase() {
    const client = await MongoClient.connect(dbUrl)
    return client;
}