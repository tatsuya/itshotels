# itshotels

ITS健保（関東ITソフトウェア健康保険組合）で利用可能な保養施設の空き状況を検索するウェブサイト（[http://itshotels.herokuapp.com/](http://itshotels.herokuapp.com/)）

![screenshot](/screenshot.png?raw=true)

## Development

- Server: Node.js (ExpressJS)
- Scraper: Node.js (PhantomJS)
- Persistent Storage: Redis (or local filesystem only for development)

### Scrape availability data

```
npm run feed
```

### Running application

Normal mode:

```
npm start
```

Debug mode:

```
npm run debug
```

### Running unit tests

```
npm test
```

## Deployment

`Procfile` is available for deploying on Heroku. Heroku's Redis add-on is required before running the application. To install the add-on run the following command:

```
heroku addons:create heroku-redis:hobby-dev
```

Deploy:

```
npm run deploy
```

### Clock process on Heroku

There is a scheduled job implemented to feed the information about the latest hotels availability. [Heroku's clock process model](https://devcenter.heroku.com/articles/scheduled-jobs-custom-clock-processes) is used to run this job periodically. In `Procfile`, there is a following line:

```
clock: node scraper/clock.js
```

where the `clock.js` is responsible for running periodical feed job. To configure this clock process use the following command:

```
heroku ps:scale clock=1
```

### Renaming the app

Heroku by default sets the application name randomly which is sometimes hard to remember. `heroku apps:rename` command allows us to rename the app with custom name from the CLI. For example, to rename the app named `itshotels`:

```
heroku apps:rename itshotels
```