import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

require('dotenv').config();


const options = {
    seesion: {
        jwt: true
    },
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: "user",
            authorizationUrl: "https://github.com/login/oauth/authorize",
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            scope: "email",
            authorizationUrl: "https://www.facebook.com/v7.0/dialog/oauth?response_type=code",
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
            authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code"
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
};

export default NextAuth(options)