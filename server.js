const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const session = require('koa-session');
const Redis = require('ioredis');
const RedisSessionStore = require('./src/server/session-store');

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
  router.get('/api/user', async (ctx, next) => {
    ctx.session.user = {
      name: 'sdsd',
      age: 18,
    };
    ctx.body = 'sdsffdf';
    await next();
  });
  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', 'userid:xxxxx')
    ctx.req.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.use(router.routes());
  server.listen(3000, () => {
    console.log('koa listen on 3000');
  });
});
