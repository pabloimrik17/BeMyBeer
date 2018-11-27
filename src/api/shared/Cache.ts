import { inject, injectable } from 'inversify';
import { RedisClient } from 'redis';
import { Promisify, Redis } from '../ioc/interfaces';
import { npmTypes } from '../ioc/types';

// https://community.risingstack.com/redis-node-js-introduction-to-caching/

@injectable()
export default class Cache {
  private promisify: Promisify;
  private redis: Redis;
  private client: RedisClient;

  private getAsync: (key: string) => Promise<any>;
  private setexAsync: (key: string, durationInSecs: number, value: any) => Promise<void>;
  private setAsync: (key: string, value: any) => Promise<void>;
  private delAsync: (key: string) => Promise<void>;
  private keysAsync: (key: string) => Promise<string[]>;

  constructor(@inject(npmTypes.Redis) redis: Redis,
              @inject(npmTypes.Promisify) promisify: Promisify) {
    this.redis = redis;
    this.promisify = promisify;

    this.client = undefined;
    this.getAsync = undefined;
    this.setexAsync = undefined;
    this.setAsync = undefined;
    this.delAsync = undefined;
    this.keysAsync = undefined;
  }

  public async connect(): Promise<void> {
    try {
      this.client = await this.redis.createClient(6379);

      this.getAsync = this.promisify(this.client.get).bind(this.client);
      this.setexAsync = this.promisify(this.client.setex).bind(this.client);
      this.setAsync = this.promisify(this.client.set).bind(this.client);
      this.delAsync = this.promisify(this.client.del).bind(this.client);
      this.keysAsync = this.promisify(this.client.keys).bind(this.client);
    } catch (e) {
      throw new Error('TODO CONNECT');
    }
  }

  /*public async disconnect(): Promise<void> {
    // TODO
  }*/

  public isServerActive(): boolean {
    return this.client !== undefined;
  }

  public async get(key: string): Promise<any> {
    if (!this.getAsync) {
      throw new Error('TODO GET ASYNC');
    }

    const data = await this.getAsync(key);

    return JSON.parse(data);
  }

  public async set(key: string, value: any): Promise<void> {
    if (!this.setAsync) {
      throw new Error('TODO SET ASYNC');
    }

    const stringified = JSON.stringify(value);

    await this.setAsync(key, stringified);
  }

  public async setex(key: string, durationInSecs: number, value: any): Promise<void> {
    if (!this.setexAsync) {
      throw new Error('TODO SETEX ASYNC');
    }

    const stringified = JSON.stringify(value);

    await this.setexAsync(key, durationInSecs, stringified);
  }

  public async del(key: string): Promise<void> {
    if (!this.delAsync) {
      throw new Error('TODO DEL ASYNC');
    }

    await this.delAsync(key);
  }

  public async keys(key: string): Promise<string[]> {
    if (!this.keysAsync) {
      throw new Error('TODO KEYS ASYNC');
    }

    return await this.keysAsync(key);
  }
}
