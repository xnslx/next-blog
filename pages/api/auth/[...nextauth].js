import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

require('dotenv').config();


export default NextAuth({
    seesion: {
        jwt: true
    },
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({ email: credentials.email })

                if (!user) {
                    client.close()
                    throw new Error('No user found!')
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    throw new Error('Could not log you in.')
                }

                return { email: user.email }

                client.close()
            }
        })
    ]
})