import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as lodash from 'lodash';
import * as moment from 'moment';
import * as mysql2 from 'mysql2/promise';
import * as redis from 'redis';

export type Lodash = typeof lodash;
export type Moment = typeof moment;
export type Mysql2 = typeof mysql2;
export type Express = typeof express;
export type BodyParser = typeof bodyParser;
export type Redis = typeof redis;
