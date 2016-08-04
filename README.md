# kanto-it-hotel-availability

## Development

Feed data:

```
npm run feed
```

Start application:

```
npm start
```

Start application in debug mode:

```
npm run debug
```

Run unit test:

```
npm test
```

## Deployment

Redis add-on is needed to run the application. To install the add-on run the following command:

```
heroku addons:create heroku-redis:hobby-dev
```

Deploy the application to Heroku:

```
npm run deploy
```