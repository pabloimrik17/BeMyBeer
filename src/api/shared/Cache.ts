import { inject, injectable } from 'inversify';
import { RedisClient } from 'redis';
import { promisify } from 'util';
import { Redis } from '../ioc/interfaces';
import { npmTypes } from '../ioc/types';

// https://community.risingstack.com/redis-node-js-introduction-to-caching/

@injectable()
export default class Cache {
  private redis: Redis;
  private client: RedisClient;

  private getAsync: (key: string) => Promise<any>;
  private setexAsync: (key: string, durationInSecs: number, value: any) => Promise<void>;
  private setAsync: (key: string, value: any) => Promise<void>;
  private delAsync: (key: string) => Promise<void>;

  constructor(@inject(npmTypes.Redis) redis: Redis) {
    this.redis = redis;
    this.client = undefined;
    this.getAsync = undefined;
    this.setexAsync = undefined;
    this.setAsync = undefined;
    this.delAsync = undefined;
  }

  public async connnect(): Promise<void> {
    try {
      this.client = await this.redis.createClient(6379);

      this.getAsync = promisify(this.client.get).bind(this.client);
      this.setexAsync = promisify(this.client.setex).bind(this.client);
      this.setAsync = promisify(this.client.set).bind(this.client);
      this.delAsync = promisify(this.client.del).bind(this.client);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async disconnect(): Promise<void> {
    // TODO
  }

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
    if (!this.setexAsync) {
      throw new Error('TODO DEL ASYNC');
    }

    await this.delAsync(key);
  }
}
