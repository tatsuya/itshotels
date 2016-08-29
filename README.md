# itshotels

ITS健保（関東ITソフトウェア健康保険組合）で利用可能な保養施設の空き状況を検索するウェブサイト（[http://itshotels.info/](http://itshotels.info/)）

<!-- ![screenshot](/screenshot.png?raw=true) -->

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

### Setup custom domain for the app

To make a Heroku app accessible via non-Heroku domains (for example, `itshotels.info`) you must add custom domain(s) to your application as described below.

General steps:

1. Own the custom domain name.
2. Add the custom domain to your app with the `heroku domains:add` command.

    ```
    heroku domains:add itshotels.info
    ```

3. Look up the Heroku-supplied DNS Target for the custom domain using the `heroku domains` command.
4. Configure your app’s DNS provider to point to the Heroku-supplied DNS Target.
5. Test that your app is accessible via the custom domain.

See [Custom Domain Names for Apps | Heroku Dev Center](https://devcenter.heroku.com/articles/custom-domains) for more details.
