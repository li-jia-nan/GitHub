const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';

const scope = 'user';

const github = {
  request_token_url: 'https://github.com/login/oauth/access_token',
  ClientID: 'ba73feb9e2f47f18e8ff',
  ClientSecrets: 'f4d8e951f205001bfc3c44643f7bda8ae29e336d',
};

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL: GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${github.ClientID}&scope=${scope}`,
    github,
  },
};

module.exports = nextConfig;
