import {
  AccessTokenObject,
  DiscordUser,
  ExpiredAccessTokenError,
  InvalidCodeError,
  NoAccessTokenError,
} from '../types/Discord';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from 'firebase-functions';
import { Optional } from '../types/utils';
import qs from 'querystring';

const BASE_URL = config().app.base_url;

class DiscordService {
  private instance: AxiosInstance;
  private clientId: string;
  private clientSecret: string;
  // private botToken: string;
  private scopes: string[];
  public accessToken: Optional<AccessTokenObject>;

  public constructor(accessToken?: AccessTokenObject) {
    this.clientId = config().discord.client_id;
    this.clientSecret = config().discord.client_secret;
    // this.botToken = config().discord.bot_token;
    this.scopes = ['identify', 'guilds.join'];
    this.instance = axios.create({
      baseURL: 'https://discord.com/api/v6',
      timeout: 1000,
    });
    if (accessToken) {
      this.accessToken = accessToken;
    }
  }

  private serializeScopes(scopes?: string[]) {
    return (scopes || this.scopes).reduce((acc, val) => acc + val + ' ', '').trim();
  }

  public generateRedirectURI(): string {
    return (
      `${this.instance.defaults.baseURL}/oauth2/authorize?` +
      qs.stringify({
        client_id: this.clientId,
        redirect_uri: `${BASE_URL}/api/discord/return`,
        response_type: 'code',
        scope: this.serializeScopes(),
      })
    );
  }

  public generateBotRedirectURI(): string {
    return (
      `${this.instance.defaults.baseURL}/oauth2/authorize?` +
      qs.stringify({
        client_id: this.clientId,
        scope: this.serializeScopes(['bot']),
        permissions: 402653187,
      })
    );
  }

  public async getAccessToken(code: string): Promise<void> {
    const requestData = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${BASE_URL}/api/discord/return`,
      scope: this.serializeScopes(),
    };

    const config: AxiosRequestConfig = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await this.instance.post<AccessTokenObject>('/oauth2/token', qs.stringify(requestData), config);

      this.accessToken = response.data;
    } catch (e) {
      console.error('Error getting access token', e.response.data);
      if (e.response.status === 400) {
        throw new InvalidCodeError();
      } else {
        throw new Error(e);
      }
    }
  }

  public async refreshToken(): Promise<void> {
    if (!this.accessToken) {
      throw new NoAccessTokenError();
    }

    const requestData = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: this.accessToken.refresh_token,
      redirect_uri: this.generateRedirectURI(),
      scope: this.serializeScopes(),
    };

    const config: AxiosRequestConfig = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await this.instance.post<AccessTokenObject>('/oauth2/token', qs.stringify(requestData), config);

      this.accessToken = response.data;
    } catch (e) {
      console.error('Error refreshing access token', e.response.data);
      if (e.response.status === 400) {
        throw new InvalidCodeError();
      } else {
        throw new Error(e);
      }
    }
  }

  public async getProfile(): Promise<DiscordUser> {
    if (!this.accessToken) {
      throw new NoAccessTokenError();
    }

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + this.accessToken.access_token,
      },
    };

    try {
      const response = await this.instance.get<DiscordUser>('/users/@me', config);

      return response.data;
    } catch (e) {
      console.error('error fetching profile', e, true);
      if (e.response.status === 401 || e.response.status === 403) {
        throw new ExpiredAccessTokenError();
      } else {
        throw new Error(e);
      }
    }
  }
}

export default DiscordService;
