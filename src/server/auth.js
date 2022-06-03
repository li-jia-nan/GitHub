const axios = require('axios');
const config = require('../utils/getNextConfig');

const { request_token_url, ClientID, ClientSecrets } = config.github;

module.exports = server => {
  server.use(async (ctx, next) => {
    const { path, query } = ctx;
    if (path === '/auth') {
      const { code } = query;
      if (!code) {
        ctx.body = 'code 不存在';
        return;
      }
      const result = await axios({
        method: 'POST',
        url: request_token_url,
        data: { client_id: ClientID, client_secret: ClientSecrets, code },
        headers: { Accept: 'application/json' },
      });
      if (result.status === 200 && result.data && !result.data.error) {
        ctx.session.githubAuth = result.data;
        const { access_token, token_type } = result.data;
        const userInfoResp = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: { Authorization: `${token_type} ${access_token}` },
        });
        if (ctx.session && userInfoResp.data) {
          ctx.session.userInfo = userInfoResp.data;
        }
        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/');
        if (ctx.session) {
          ctx.session.urlBeforeOAuth = '';
        }
      } else {
        const errorMsg = result.data && result.data.error;
        ctx.body = `request token failed ${errorMsg}`;
      }
    } else {
      await next();
    }
  });

  server.use(async (ctx, next) => {
    const { path, method } = ctx;
    if (path === '/logout' && method === 'POST') {
      ctx.session = null;
      ctx.body = `logout success`;
    } else {
      await next();
    }
  });
  server.use(async (ctx, next) => {
    const { path, method, query } = ctx;
    if (path === '/prepare-auth' && method === 'GET') {
      const { url } = query;
      ctx.session.urlBeforeOAuth = url;
      // ctx.redirect(config.OAUTH_URL);
    } else {
      await next();
    }
  });
};
