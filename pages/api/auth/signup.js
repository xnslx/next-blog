import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    console.log('req.body', req.body)
    const data = req.body;
    const email = req.body.enteredEmail;
    const password = req.body.enteredPassword;
    const confirmPassword = req.body.enteredConfirmPassword;

    if (!email || !email.includes('@') || !password || password.trim().length < 7 || password !== confirmPassword) {
        res.status(422).json({ message: 'Invalid input' });
        return;
    }
    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
        res.status(422).json({ message: 'User exists already!' });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword
    });

    res.status(201).json({ message: 'Created user!' })
    client.close();
};

export default handler;