import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';
import Cache from '../../../api/shared/Cache';
import CacheManager, { ResourceType } from '../../../api/shared/CacheManager';

const originalEnv = { ...process.env };

describe('Cache Manager', () => {
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
    test('Expect to instantiate a CacheManager object', () => {
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      expect(cacheManager).toBeTruthy();
    });
  });

  describe('Retrieve', () => {
    test('Expect to retrieve the data associated to a key', async () => {
      const cacheMock: Partial<Cache> = {
        get: jest.fn(),
        isServerActive: jest.fn(() => true),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      await cacheManager.retrieve(key);

      expect(cacheMock.isServerActive).toBeCalledTimes(1);
      expect(cacheMock.get).toBeCalledTimes(1);
      expect(cacheMock.get).toBeCalledWith(key);
    });

    test('Expect to start the cache server if is not already connected when retrieve function is called', async () => {
      const cacheMock: Partial<Cache> = {
        get: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn(),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      await cacheManager.retrieve(key);

      expect(cacheMock.isServerActive).toBeCalledTimes(1);
      expect(cacheMock.connect).toBeCalledTimes(1);
      expect(cacheMock.get).toBeCalledTimes(1);
      expect(cacheMock.get).toBeCalledWith(key);
    });

    test('Expect to throw error if retrieve fails', async () => {
      const cacheMock: Partial<Cache> = {
        get: jest.fn().mockRejectedValue(undefined),
        isServerActive: jest.fn(() => true),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);

      await expect(cacheManager.retrieve(key)).rejects.toThrowError('TODO RETRIEVE');
    });

    test('Expect to throw error if connect fails when retrieve function is called', async () => {
      const cacheMock: Partial<Cache> = {
        get: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockRejectedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);

      await expect(cacheManager.retrieve(key)).rejects.toThrowError('TODO RETRIEVE');
    });
  });

  describe('Store', () => {
    test('Expect to save data associated to a key into the cache database', async () => {
      const cacheMock: Partial<Cache> = {
        set: jest.fn(),
        isServerActive: jest.fn(() => true),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const value = { id: 1, name: 'Paul' };
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      await cacheManager.store(key, value);

      expect(cacheMock.isServerActive).toBeCalledTimes(1);
      expect(cacheMock.set).toBeCalledTimes(1);
      expect(cacheMock.set).toBeCalledWith(key, value);
    });

    test('Expect to start the cache server if is not already connected when store function is called', async () => {
      const cacheMock: Partial<Cache> = {
        set: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn(),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const value = { id: 1, name: 'Paul' };
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      await cacheManager.store(key, value);

      expect(cacheMock.isServerActive).toBeCalledTimes(1);
      expect(cacheMock.connect).toBeCalledTimes(1);
      expect(cacheMock.set).toBeCalledTimes(1);
      expect(cacheMock.set).toBeCalledWith(key, value);
    });

    test('Expect to throw error if store fails', async () => {
      const cacheMock: Partial<Cache> = {
        set: jest.fn().mockRejectedValue(undefined),
        isServerActive: jest.fn(() => true),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const value = { id: 1, name: 'Paul' };
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);

      await expect(cacheManager.store(key, value)).rejects.toThrowError('TODO STORE');
    });

    test('Expect to throw error if connect fails when store function is called', async () => {
      const cacheMock: Partial<Cache> = {
        set: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockRejectedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const value = { id: 1, name: 'Paul' };
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);

      await expect(cacheManager.store(key, value)).rejects.toThrowError('TODO STORE');
    });
  });

  describe('StoreWithExpiration', () => {
    test('Expect to save data associated to a key with expiration into the cache database', async () => {
      const cacheMock: Partial<Cache> = {
        setex: jest.fn(),
        isServerActive: jest.fn(() => true),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const value = { id: 1, name: 'Paul' };
      const expiration: number = 100;
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      await cacheManager.storeWithExpiration(key, value, expiration);

      expect(cacheMock.isServerActive).toBeCalledTimes(1);
      expect(cacheMock.setex).toBeCalledTimes(1);
      expect(cacheMock.setex).toBeCalledWith(key, expiration, value);
    });

    test('Expect to start the cache server if is not already connected when storeWithExpiration function is called', async () => {
      const cacheMock: Partial<Cache> = {
        setex: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn(),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const value = { id: 1, name: 'Paul' };
      const expiration: number = 100;
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      await cacheManager.storeWithExpiration(key, value, expiration);

      expect(cacheMock.isServerActive).toBeCalledTimes(1);
      expect(cacheMock.connect).toBeCalledTimes(1);
      expect(cacheMock.setex).toBeCalledTimes(1);
      expect(cacheMock.setex).toBeCalledWith(key, expiration, value);
    });

    test('Expect to throw error if storeWithExpiration fails', async () => {
      const cacheMock: Partial<Cache> = {
        setex: jest.fn().mockRejectedValue(undefined),
        isServerActive: jest.fn(() => true),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const value = { id: 1, name: 'Paul' };
      const expiration: number = 100;
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);

      await expect(cacheManager.storeWithExpiration(key, value, expiration)).rejects.toThrowError('TODO STORE');
    });

    test('Expect to throw error if connect fails when storeWithExpiration function is called', async () => {
      const cacheMock: Partial<Cache> = {
        setex: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockRejectedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const key: string = 'key';
      const value = { id: 1, name: 'Paul' };
      const expiration: number = 100;
      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);

      await expect(cacheManager.storeWithExpiration(key, value, expiration)).rejects.toThrowError('TODO STORE');
    });
  });

  describe('DeleteResource', () => {
    test('Expect to save data associated to a key with expiration into the cache database', async () => {
      const getKeysReturnMock: string[] = ['a', 'b', 'c', 'd'];
      const cacheMock: Partial<Cache> = {
        keys: jest.fn().mockResolvedValue(getKeysReturnMock),
        del: jest.fn(),
        isServerActive: jest.fn(() => true),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';
      let callsNumber: number = 0;
      let index: number = 0;

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        callsNumber += (2 + getKeysReturnMock.length);
        index += 1;

        await cacheManager.deleteResource(resource, resourceName);

        expect(cacheMock.isServerActive).toBeCalledTimes(callsNumber);
        expect(cacheMock.keys).toBeCalledTimes(index);
        expect(cacheMock.keys).toBeCalledWith(`${resource}_*/${resourceName}`);

        for (let i = 0; i < getKeysReturnMock.length; i += 1) {
          expect(cacheMock.del).toHaveBeenNthCalledWith(i + 1, getKeysReturnMock[i]);
        }
      }
    });

    test('Expect to start the cache server if is not already connected when storeWithExpiration function is called', async () => {
      const getKeysReturnMock: string[] = ['a', 'b', 'c', 'd'];
      const cacheMock: Partial<Cache> = {
        keys: jest.fn().mockReturnValue(getKeysReturnMock),
        del: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockResolvedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';
      let callsNumber: number = 0;
      let index: number = 0;

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        callsNumber += (2 + getKeysReturnMock.length);
        index += 1;
        await cacheManager.deleteResource(resource, resourceName);

        expect(cacheMock.isServerActive).toBeCalledTimes(callsNumber);
        expect(cacheMock.connect).toBeCalledTimes(callsNumber);
        expect(cacheMock.keys).toBeCalledTimes(index);
        expect(cacheMock.keys).toBeCalledWith(`${resource}_*/${resourceName}`);
        expect(cacheMock.del).toBeCalledTimes(getKeysReturnMock.length * index);

        for (let i = 0; i < getKeysReturnMock.length; i += 1) {
          expect(cacheMock.del).toHaveBeenNthCalledWith(i + 1, getKeysReturnMock[i]);
        }
      }
    });

    test('Expect to throw error if deleteResource fails', async () => {
      const cacheMock: Partial<Cache> = {
        keys: jest.fn().mockRejectedValue(undefined),
        del: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn(),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        await expect(cacheManager.deleteResource(resource, resourceName)).rejects.toThrowError('TODO DELETERESOURCE');
      }
    });

    test('Expect to throw error if connect fails when storeWithExpiration function is called', async () => {
      const cacheMock: Partial<Cache> = {
        keys: jest.fn(),
        del: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockRejectedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        await expect(cacheManager.deleteResource(resource, resourceName)).rejects.toThrowError('TODO DELETERESOURCE');
      }
    });

    test('Expect to throw error del function fails', async () => {
      const cacheMock: Partial<Cache> = {
        keys: jest.fn(),
        del: jest.fn().mockRejectedValue(undefined),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockRejectedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        await expect(cacheManager.deleteResource(resource, resourceName)).rejects.toThrowError('TODO DELETERESOURCE');
      }
    });
  });

  describe('deleteResourceById', () => {
    test('Expect to save data associated to a key with expiration into the cache database', async () => {
      const getKeysReturnMock: string[] = ['a', 'b', 'c', 'd'];
      const cacheMock: Partial<Cache> = {
        keys: jest.fn().mockResolvedValue(getKeysReturnMock),
        del: jest.fn(),
        isServerActive: jest.fn(() => true),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';
      const resourceId: number = 1;
      let callsNumber: number = 0;
      let index: number = 0;

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        callsNumber += (2 + getKeysReturnMock.length) * 2;
        index += 1;

        await cacheManager.deleteResourceById(resource, resourceName, resourceId);

        expect(cacheMock.isServerActive).toBeCalledTimes(callsNumber);
        expect(cacheMock.keys).toBeCalledTimes(index * 2);
        expect(cacheMock.keys).toBeCalledWith(`${resource}_*/${resourceName}`);

        for (let i = 0; i < getKeysReturnMock.length; i += 1) {
          expect(cacheMock.del).toHaveBeenNthCalledWith(i + 1, getKeysReturnMock[i]);
        }
      }
    });

    test('Expect to start the cache server if is not already connected when storeWithExpiration function is called', async () => {
      const getKeysReturnMock: string[] = ['a', 'b', 'c', 'd'];
      const cacheMock: Partial<Cache> = {
        keys: jest.fn().mockReturnValue(getKeysReturnMock),
        del: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockResolvedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';
      const resourceId: number = 1;
      let callsNumber: number = 0;
      let index: number = 0;

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        callsNumber += (2 + getKeysReturnMock.length) * 2;
        index += 1;
        await cacheManager.deleteResourceById(resource, resourceName, resourceId);

        expect(cacheMock.isServerActive).toBeCalledTimes(callsNumber);
        expect(cacheMock.connect).toBeCalledTimes(callsNumber);
        expect(cacheMock.keys).toBeCalledTimes(index * 2);
        expect(cacheMock.keys).toBeCalledWith(`${resource}_*/${resourceName}`);
        expect(cacheMock.del).toBeCalledTimes((getKeysReturnMock.length * index) * 2);

        for (let i = 0; i < getKeysReturnMock.length; i += 1) {
          expect(cacheMock.del).toHaveBeenNthCalledWith(i + 1, getKeysReturnMock[i]);
        }
      }
    });

    test('Expect to throw error if deleteResource fails', async () => {
      const cacheMock: Partial<Cache> = {
        keys: jest.fn().mockRejectedValue(undefined),
        del: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn(),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';
      const resourceId: number = 1;

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        await expect(cacheManager.deleteResourceById(resource, resourceName, resourceId)).rejects.toThrowError('TODO DELETERESOURCE');
      }
    });

    test('Expect to throw error if connect fails when storeWithExpiration function is called', async () => {
      const cacheMock: Partial<Cache> = {
        keys: jest.fn(),
        del: jest.fn(),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockRejectedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';
      const resourceId: number = 1;

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        await expect(cacheManager.deleteResourceById(resource, resourceName, resourceId)).rejects.toThrowError('TODO DELETERESOURCE');
      }
    });

    test('Expect to throw error del function fails', async () => {
      const cacheMock: Partial<Cache> = {
        keys: jest.fn(),
        del: jest.fn().mockRejectedValue(undefined),
        isServerActive: jest.fn(() => false),
        connect: jest.fn().mockRejectedValue(undefined),
      };
      container.unbind(classTypes.Cache);
      container.bind<Partial<Cache>>(classTypes.Cache).toConstantValue(cacheMock);

      const resources: ResourceType[] = [ResourceType.Create, ResourceType.Get, ResourceType.Update];
      const resourceName: string = 'category';
      const resourceId: number = 1;

      const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
      for (const resource of resources) {
        await expect(cacheManager.deleteResourceById(resource, resourceName, resourceId)).rejects.toThrowError('TODO DELETERESOURCE');
      }
    });
  });
});
