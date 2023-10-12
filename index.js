import * as rl from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import 'dotenv/config';
import { AuthenticationClient } from 'auth0';

const readline = rl.createInterface({ input, output });

const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0ClientId = process.env.AUTH0_CLIENT_ID;
const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET;

const auth0 = new AuthenticationClient({
    domain: auth0Domain,
    clientId: auth0ClientId,
    clientSecret: auth0ClientSecret,
});

const main = async () => {
    const answer1 = await readline.question('Enter email address to recieve code: ');

    const res1 = await auth0.passwordless.sendEmail({
        email: answer1,
        send: 'code'
    })
    console.log("Send Email Response: ", res1.status);

    const answer2 = await readline.question('Enter code to recieve tokens: ');

    const res2 = await auth0.passwordless.loginWithEmail({
        email: answer1,
        code: answer2
    })
    console.log("Login Response: ", res2.data);

    readline.close();
}

main();



