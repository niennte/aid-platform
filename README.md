# Community Aid Platform

A prototype of a one-to-many match making platform, based on geolocation and offering to members an ability to either publish a "request" or respond / volunteer for a "request" published by another member. 

![](https://s3.amazonaws.com/quod.erat.demonstrandum/portfolio/img/aid-platform/Screen+Shot+2019-02-08+at+12.10.53.png)

- [Live demo](https://infinite-sierra-74007.herokuapp.com/)
- [More screenshots](https://github.com/niennte/aid-platform/wiki#screenshots)

#### Documentation / Wiki
- [What does it do?](https://github.com/niennte/aid-platform/wiki#what-does-it-do)
- [Stack and architecture](https://github.com/niennte/aid-platform/wiki#stack-and-architecture)
- [Is it perfect?](https://github.com/niennte/aid-platform/wiki#is-it-perfect)
- [Is it any good?](https://github.com/niennte/aid-platform/wiki#is-it-any-good)
- [What is it good for?](https://github.com/niennte/aid-platform/wiki#what-is-it-good-for)
- [Why would I want to build ~~anything as crazy as that~~ an abstract prototype?](https://github.com/niennte/aid-platform/wiki#why-would-i-want-to-build-anything-as-crazy-as-that-an-abstract-prototype)

#### Live demo
- [is here](https://infinite-sierra-74007.herokuapp.com/) (please bear with two heroku instances waking up)


#### Initial setup

- install or update node if needed:
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- install or update yarn if needed
```
curl -o- -L https://yarnpkg.com/install.sh | bash
```


```
$ git clone [this-repo] [project-path]
$ cd [project-path]
$ yarn install
$ yarn start # run demo with babel-node
```
- ESLint: IntelliJ setup: add .eslinrc as configuration file, local Node path as Node interpreter (if not visible, install the Node plugins and restart). If need to update package included with this repo: ESLint rules, including ECMAScript 6+ and React from AirBNB:
[AirBNB instructions](https://www.npmjs.com/package/eslint-config-airbnb)

```
npm info eslint-config-airbnb@latest peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev eslint-config-airbnb@latest
```
- Jest: configured in .eslintrc, package.scripts
```
yarn test
```

___

- webpack, dev environment
```
$ yarn start
```
in another tab:
```
$ yarn dev:wds
```
*- note: to find source maps, in Chrome, switch "Sources" tab to "Page" in the file tree:
```
webpack://./src
```
___
*- note: after adding React, make sure generated files are excluded in IDE:
```$xslt
/coverage
/dist
/lib
/node_modules
```


Initial setup (thankfully) based on [JavaScript Stack from Scratch by Verekia](https://github.com/verekia/js-stack-from-scratch)

#

### Deployment
(requires a Heroku free account and Heroku CLI installed)
```
$ cd [project root]
```
Deploy to Heroku
```
# create and connect the remote app
$ heroku create
# verify:
$ git remote -v
...
heroku	https://git.heroku.com/[heroku app name].git (fetch)
heroku	[heroku app name].git (push)
...
# deploy
$ git push heroku master
...
remote:        https://[heroku app name].herokuapp.com/ deployed to Heroku
...
remote: Verifying deploy... done.
To https://git.heroku.com/[heroku app name].git
```

#
### Redis
- Attach the heroku rediscloud instance that the API is using, or, if the API is not deployed yet, create one to be later attached to thte API app

Setup Redis notifications for the [interesting events (all of the keyspace events)](https://redis.io/topics/notifications), for the app to receive:
```
# in the Redis client
> config set notify-keyspace-events KA
OK
```
#

