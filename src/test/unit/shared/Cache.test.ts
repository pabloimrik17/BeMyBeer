import { RedisClient } from 'redis';
import { Promisify, Redis } from '../../../api/ioc/interfaces';
import { container } from '../../../api/ioc/ioc';
import { classTypes, npmTypes } from '../../../api/ioc/types';
import Cache from '../../../api/shared/Cache';

const originalEnv = { ...process.env };

describe('Cache', () => {
  beforeEach(() => {
    container.snapshot();
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    container.restore();
  });

  describe('Constructor', () => {
    test('Expect to be instantiated properly', () => {
      expect(container.get<Cache>(classTypes.Cache)).toBeTruthy();
    });
  });

  describe('Connect', () => {
    test('Expect redis server to connect and promisify all methods', async () => {
      container.unbind(npmTypes.Promisify);
      const promisifyMock: any = jest.fn(() => () => {
      });
      container.bind<Partial<Promisify>>(npmTypes.Promisify).toConstantValue(promisifyMock);

      container.unbind(npmTypes.Redis);
      const clientMock: Partial<RedisClient> = {
        get: jest.fn(),
        setex: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        keys: jest.fn(),
      };
      const createClientMock = jest.fn(() => clientMock);
      const redisMock: Partial<Redis> = {
        createClient: createClientMock,
      };
      container.bind<Partial<Redis>>(npmTypes.Redis).toConstantValue(redisMock);

      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await cache.connect();

      expect(redisMock.createClient).toBeCalledTimes(1);
      expect(redisMock.createClient).toBeCalledWith(6379);
      expect(promisifyMock).toHaveBeenNthCalledWith(1, clientMock.get);
      expect(promisifyMock).toHaveBeenNthCalledWith(2, clientMock.setex);
      expect(promisifyMock).toHaveBeenNthCalledWith(3, clientMock.set);
      expect(promisifyMock).toHaveBeenNthCalledWith(4, clientMock.del);
      expect(promisifyMock).toHaveBeenNthCalledWith(5, clientMock.keys);
    });

    test('Expect to throw error if something goes wrong when connecting to client', async () => {
      container.unbind(npmTypes.Redis);
      const redisMock: Partial<Redis> = {
        createClient: jest.fn().mockRejectedValue(undefined),
      };
      container.bind<Partial<Redis>>(npmTypes.Redis).toConstantValue(redisMock);

      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await expect(cache.connect()).rejects.toThrowError('TODO CONNECT');
    });
  });

  describe('IsServerActive', () => {
    test('Expect to return true when server is up', async () => {
      container.unbind(npmTypes.Redis);
      const clientMock: Partial<RedisClient> = {
        get: jest.fn(),
        setex: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        keys: jest.fn(),
      };
      const createClientMock = jest.fn(() => clientMock);
      const redisMock: Partial<Redis> = {
        createClient: createClientMock,
      };
      container.bind<Partial<Redis>>(npmTypes.Redis).toConstantValue(redisMock);

      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await cache.connect();

      expect(cache.isServerActive()).toBe(true);
    });

    test('Expect to return falsse when server is down', async () => {
      const cache: Cache = container.get<Cache>(classTypes.Cache);
      expect(cache.isServerActive()).toBe(false);
    });
  });
  describe('Get', () => {
    test('Expect to return parsed json if key exist on database', async () => {
      container.unbind(npmTypes.Redis);
      const keyValueMock: string = '{"id": 1, "name": "Paul"}';
      const getAsyncMock = jest.fn(() => keyValueMock);
      const clientMock: Partial<RedisClient> = {
        get: getAsyncMock,
        setex: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        keys: jest.fn(),
      };
      const createClientMock = jest.fn(() => clientMock);
      const redisMock: Partial<Redis> = {
        createClient: createClientMock,
      };
      container.bind<Partial<Redis>>(npmTypes.Redis).toConstantValue(redisMock);

      container.unbind(npmTypes.Promisify);
      const promisifyMock: any = jest.fn().mockReturnValue(getAsyncMock);
      container.bind<Partial<Promisify>>(npmTypes.Promisify).toConstantValue(promisifyMock);

      const mockKey: string = 'mockKey';
      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await cache.connect();
      const cachedData = await cache.get(mockKey);

      await expect(getAsyncMock).toBeCalledTimes(1);
      await expect(getAsyncMock).toBeCalledWith(mockKey);
      await expect(cachedData).toEqual(JSON.parse(keyValueMock));
    });

    test('Expect to throw error because no getAsync function', async () => {
      const mockKey: string = 'mockKey';
      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await expect(cache.get(mockKey)).rejects.toThrowError('TODO GET ASYNC');
    });
  });

  describe('Set', () => {
    test('Expect to save json into the database', async () => {
      container.unbind(npmTypes.Redis);
      const key: string = 'mock/1';
      const keyValue = { id: 1, name: 'Paul' };

      const setAsyncMock = jest.fn();
      const clientMock: Partial<RedisClient> = {
        get: jest.fn(),
        set: setAsyncMock,
        setex: jest.fn(),
        del: jest.fn(),
        keys: jest.fn(),
      };
      const createClientMock = jest.fn(() => clientMock);
      const redisMock: Partial<Redis> = {
        createClient: createClientMock,
      };
      container.bind<Partial<Redis>>(npmTypes.Redis).toConstantValue(redisMock);

      container.unbind(npmTypes.Promisify);
      const promisifyMock: any = jest.fn().mockReturnValue(setAsyncMock);
      container.bind<Partial<Promisify>>(npmTypes.Promisify).toConstantValue(promisifyMock);

      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await cache.connect();
      await cache.set(key, keyValue);

      await expect(setAsyncMock).toBeCalledTimes(1);
      await expect(setAsyncMock).toBeCalledWith(key, JSON.stringify(keyValue));
    });

    test('Expect to throw error because no setAsync function', async () => {
      const key: string = 'mock/1';
      const keyValue = { id: 1, name: 'Paul' };
      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await expect(cache.set(key, keyValue)).rejects.toThrowError('TODO SET ASYNC');
    });
  });

  describe('Setex', () => {
    test('Expect to save json with expiration into the database', async () => {
      container.unbind(npmTypes.Redis);
      const key: string = 'mock/1';
      const keyValue = { id: 1, name: 'Paul' };
      const expiration: number = 100;

      const setexAsyncMock = jest.fn();
      const clientMock: Partial<RedisClient> = {
        get: jest.fn(),
        set: jest.fn(),
        setex: setexAsyncMock,
        del: jest.fn(),
        keys: jest.fn(),
      };
      const createClientMock = jest.fn(() => clientMock);
      const redisMock: Partial<Redis> = {
        createClient: createClientMock,
      };
      container.bind<Partial<Redis>>(npmTypes.Redis).toConstantValue(redisMock);

      container.unbind(npmTypes.Promisify);
      const promisifyMock: any = jest.fn().mockReturnValue(setexAsyncMock);
      container.bind<Partial<Promisify>>(npmTypes.Promisify).toConstantValue(promisifyMock);

      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await cache.connect();
      await cache.setex(key, expiration, keyValue);

      await expect(setexAsyncMock).toBeCalledTimes(1);
      await expect(setexAsyncMock).toBeCalledWith(key, expiration, JSON.stringify(keyValue));
    });

    test('Expect to throw error because no getAsync function', async () => {
      const key: string = 'mock/1';
      const keyValue = { id: 1, name: 'Paul' };
      const expiration: number = 100;
      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await expect(cache.setex(key, expiration, keyValue)).rejects.toThrowError('TODO SETEX ASYNC');
    });
  });

  describe('Del', () => {
    test('Expect to delete a key from the database', async () => {
      container.unbind(npmTypes.Redis);
      const key: string = 'mock/1';

      const delAsyncMock = jest.fn();
      const clientMock: Partial<RedisClient> = {
        get: jest.fn(),
        set: jest.fn(),
        setex: jest.fn(),
        del: delAsyncMock,
        keys: jest.fn(),
      };
      const createClientMock = jest.fn(() => clientMock);
      const redisMock: Partial<Redis> = {
        createClient: createClientMock,
      };
      container.bind<Partial<Redis>>(npmTypes.Redis).toConstantValue(redisMock);

      container.unbind(npmTypes.Promisify);
      const promisifyMock: any = jest.fn().mockReturnValue(delAsyncMock);
      container.bind<Partial<Promisify>>(npmTypes.Promisify).toConstantValue(promisifyMock);

      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await cache.connect();
      await cache.del(key);

      await expect(delAsyncMock).toBeCalledTimes(1);
      await expect(delAsyncMock).toBeCalledWith(key);
    });

    test('Expect to throw error because no delAsync function', async () => {
      const key: string = 'mock/1';
      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await expect(cache.del(key)).rejects.toThrowError('TODO DEL ASYNC');
    });
  });

  describe('Keys', () => {
    test('Expect to retrieve all data matching a certain key from the database', async () => {
      container.unbind(npmTypes.Redis);
      const key: string = 'mock/1';

      const keysAsyncMock = jest.fn();
      const clientMock: Partial<RedisClient> = {
        get: jest.fn(),
        set: jest.fn(),
        setex: jest.fn(),
        del: jest.fn(),
        keys: keysAsyncMock,
      };
      const createClientMock = jest.fn(() => clientMock);
      const redisMock: Partial<Redis> = {
        createClient: createClientMock,
      };
      container.bind<Partial<Redis>>(npmTypes.Redis).toConstantValue(redisMock);

      container.unbind(npmTypes.Promisify);
      const promisifyMock: any = jest.fn().mockReturnValue(keysAsyncMock);
      container.bind<Partial<Promisify>>(npmTypes.Promisify).toConstantValue(promisifyMock);

      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await cache.connect();
      await cache.keys(key);

      await expect(keysAsyncMock).toBeCalledTimes(1);
      await expect(keysAsyncMock).toBeCalledWith(key);
    });

    test('Expect to throw error because no keysAsync function', async () => {
      const key: string = 'mock/1';
      const cache: Cache = container.get<Cache>(classTypes.Cache);
      await expect(cache.keys(key)).rejects.toThrowError('TODO KEYS ASYNC');
    });
  });
});
