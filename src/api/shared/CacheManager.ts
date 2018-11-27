import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { classTypes } from '../ioc/types';
import Cache from './Cache';

export enum ResourceType {
  Get = 'get',
  Create = 'create',
  Update = 'update',
}

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

  public async deleteResource(type: ResourceType, resourceName: string): Promise<void> {
    try {
      await this.startServerIfNotActive();

      const keys: string[] = await this.getKeys(`${type}_*/${resourceName}`);
      // let test = await this.getKeys(`*`);

      for (const key of keys) {
        await this.delete(key);
      }

      // test = await this.getKeys(`*`);
    } catch (e) {
      throw new Error('TODO DELETERESOURCE');
    }
  }

  public async deleteResourceById(type: ResourceType, resourceName: string, resourceId: number): Promise<void> {
    try {
      await this.startServerIfNotActive();

      const keys: string[] = await this.getKeys(`${type}_*/${resourceName}/${resourceId}`);
      // let test = await this.getKeys(`*`);
      await this.deleteResource(type, resourceName);
      // test = await this.getKeys(`*`);

      for (const key of keys) {
        await this.delete(key);
      }

      // test = await this.getKeys(`*`);
    } catch (e) {
      throw new Error('TODO DELETERESOURCEBYID');
    }
  }

  private async delete(key: string): Promise<void> {
    try {
      await this.startServerIfNotActive();

      await this.cache.del(key);
    } catch (e) {
      throw new Error('TODO DELETE');
    }
  }

  private async getKeys(key: string): Promise<string[]> {
    try {
      await this.startServerIfNotActive();

      return await this.cache.keys(key);
    } catch (e) {
      throw new Error('TODO GETKEYS');
    }
  }

  private async startServerIfNotActive(): Promise<void> {
    try {
      if (!this.cache.isServerActive()) {
        await this.cache.connect();
      }
    } catch (e) {
      throw new Error('TODO startServerIfNotActive');
    }
  }
}
