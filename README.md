# its-hotel-availability

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

## Deploying on Heroku

Redis add-on is needed to run the application. To install the add-on run the following command:

```
heroku addons:create heroku-redis:hobby-dev
```

Deploy the application to Heroku:

```
npm run deploy
```

### Clock process on Heroku

There is a scheduled job implemented to feed the information about the latest hotels availability. To run this scheduled job on Heroku, I use [Heroku's clock process model](https://devcenter.heroku.com/articles/scheduled-jobs-custom-clock-processes). In `Procfile`, there is a following line:

```
clock: node scraper/clock.js
```

where the `clock.js` is responsible for running periodical feed job. To configure this clock process use the following command:

```
heroku ps:scale clock=1
```

### Renaming the app

Heroku by default sets the application name randomly which is sometimes hard to remember. `heroku apps:rename` command allows us to rename the app with custom name from the CLI. For example, to rename the app named `its-kenpo-hotels`:

```
heroku apps:rename its-kenpo-hotels
```