import { MongoClient } from 'mongodb';
require('dotenv').config();

const dbUrl = process.env.MONGODB_URL;
// const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.zpjgq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

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

        // console.log(newMessage)

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