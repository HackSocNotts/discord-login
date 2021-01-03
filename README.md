# Discord Login

Discord Signup/Login Service for HackNotts

Integrates tito check-ins with Discord authentication and uses Twilio phone auth to verify users.

Powered by Firebase

## Set Up Functions

This application uses the following firebase configuration settings

```JSON
{
  "tito": {
    "event": "TITO_EVENT", // slug for tito event
    "organization": "TITO_ORGANISATION", // slug for tito organization
    "token": "TITO_API_KEY", // tito api key
    "check_in_list": "TITO_CHECKIN_LIST_SLUG" // slug for tito checkin list of users that used discord (this is currently broken, I think)
  },
  "twilio": {
    "verify_service_id": "TWILIO_VERIFY_SERVICE_ID", // twilio verify service id
    "auth_token": "TWILIO_ACCOUNT_AUTH_TOKEN", // twilio account auth token
    "account_sid": "TWILIO_ACCOUNT_SID", // twilio account sid
    "verify_active": "true" // whether or not to use phone verification
  },
  "discord": {
    "token_key": "DISCORD_REFRESH_TOKEN_ENCRYPTION_KEY", // encryption key for discord token data
    "bot_token": "DISCORD_BOT_TOKEN", // discord bot token
    "client_id": "DISCORD_CLIENT_ID", // discord client id
    "client_secret": "DISCORD_CLIENT_SECRET", // discord client secret
    "guild_id": "DISCORD_GUILD_ID" // id of discord guild
  },
  "app": {
    "base_url": "http://localhost:5000", // base url of API
    "user_data_key": "USER_DATA_ENCRYPTION_KEY", // encryption key for user data
    "encrypt_user_data": "true", // whether or not to encrypt user data in firestore
    "checkin_code": "development" // secret key for downloading checkied-in hackers csv
  }
}
```

To run the functions server locally, create a `.runtimeconfig.json` file in `/functions` and populate it with the above object. You'll then be able to run the functions emulator using `firebase emulators:start`.

To deploy the application you will need to use `firebase functions:config:set` and `firebase deploy` to populate these functions.

## Running Locally

To run the website you will need to use the [Firebase Emulator suite](https://firebase.google.com/docs/emulator-suite) to emulate firestore, functions, and auth. 

The frontend will default to connecting to the emulators if you use `yarn start` in the `website` directory. You can change the ports it looks for in `website/src/firebase/index.ts` but they should the same as in `firebase.json`.

_A note about authentication within the emulators_

When authenticating with discord, the app will likely return on the wrong port, you'll need to change the port to react-scripts dev environment otherwise it will try and access the production environment. If you delete the `website/build` folder you'll likely just end up with an error page, and changing the port should work fine.

## Deploying

Provided you have setup the functions config correctly, `firebase deploy` should correctly build and deploy both the functions app, frontend, and the firestore rules. The app does not use an indexes. 