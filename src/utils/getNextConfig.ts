import getConfig from 'next/config';

interface Config {
  serverRuntimeConfig: {};
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL: string;
    OAUTH_URL: string;
    github: {
      request_token_url: string;
      ClientID: string;
      ClientSecrets: string;
    };
  };
}

const { publicRuntimeConfig }: Config = getConfig();

export const { GITHUB_OAUTH_URL, OAUTH_URL, github } = publicRuntimeConfig;
