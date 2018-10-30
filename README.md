Starter boilerplate with Babel, yarn, ES6 setup.
ESLint + Jest included, skipping Flow and Husky.

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

