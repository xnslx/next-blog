import { MongoClient } from 'mongodb';
require('dotenv').config();

const dbUrl = process.env.URL;

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;
        if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({ message: 'Invalid input.' });
            return
        }
        const newMessage = {
            email,
            name,
            message
        };

        let client;
        try {
            client = await MongoClient.connect(dbUrl)
        } catch (error) {
            res.status(500).json({ message: 'Could not connect to the database.' })
            return
        }
        const db = client.db();

        try {
            const result = await db.collection('message').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({ message: 'Storing message failed.' })
            return;
        }

        client.close()
        res.status(201).json({ message: 'Successfully stored message!', message: newMessage })

    }
};

export default handler;