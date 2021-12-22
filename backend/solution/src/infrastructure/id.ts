import { v4 as uuid } from 'uuid';

export default {
  generate: (): string => uuid().toLowerCase()
};
