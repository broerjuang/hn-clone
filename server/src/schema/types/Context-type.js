// @flow
import type {User} from './User-type';
import type {Mongo} from './Mongo-type';

export type Context = {
  mongo: Mongo;
  user: User;
};
