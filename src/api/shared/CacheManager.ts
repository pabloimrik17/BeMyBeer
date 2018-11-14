import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { classTypes } from '../ioc/types';
import Cache from './Cache';

@injectable()
export default class CacheManager {
  @inject(classTypes.Cache)
  private cache: Cache;

  constructor() {
  }

  public async retrieve(key: string): Promise<any> {
    try {
      await this.startServerIfNotActive();

      return await this.cache.get(key);
    } catch (e) {
      throw new Error('TODO RETRIEVE');
    }
  }

  public async store(key: string, value: any): Promise<void> {
    try {
      await this.startServerIfNotActive();

      await this.cache.set(key, value);
    } catch (e) {
      throw new Error('TODO STORE');
    }
  }

  public async storeWithExpiration(key: string, value: any, expirationInSecs: number = 100): Promise<void> {
    try {
      await this.startServerIfNotActive();

      await this.cache.setex(key, expirationInSecs, value);
    } catch (e) {
      throw new Error('TODO STOREWITHEXPIRATION');
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      await this.startServerIfNotActive();

      await this.cache.del(key);
    } catch (e) {
      throw new Error('TODO DEL');
    }
  }

  private async startServerIfNotActive(): Promise<void> {
    try {
      if (!this.cache.isServerActive()) {
        await this.cache.connnect();
      }
    } catch (e) {
      throw new Error('TODO startServerIfNotActive');
    }
  }
}
