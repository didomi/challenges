import { FieldType } from '../enums';

export interface InputChangedEvent {
  target: {
    value: string;
    type: FieldType;
  };
}
