const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const session = require('koa-session');
const Redis = require('ioredis');
const axios = require('axios');
const RedisSessionStore = require('./src/server/session-store');
const config = require('./src/utils/getNextConfig');
const auth = require('./src/server/auth');

const { request_token_url, ClientID, ClientSecrets } = config.github;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const redis = new Redis();

const SESSION_CONFIG = {
  key: 'jid',
  store: new RedisSessionStore(redis),
};

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.keys = ['aaa'];
  server.use(session(SESSION_CONFIG, server));
  auth(server);
  router.get('/api/user/info', async ctx => {
    const { userInfo } = ctx.session || {};
    if (userInfo) {
      ctx.body = userInfo;
      ctx.set('Content-Type', 'application/json');
    } else {
      ctx.status = 401;
      ctx.body = 'Need Login';
    }
  });
  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    await next();
  });

  server.listen(3000, () => {
    console.log('koa listen on 3000');
  });
});
