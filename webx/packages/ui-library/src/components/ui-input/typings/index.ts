export type InputType = 'email' | 'password' | 'text' | 'number';

export enum FieldType {
  Email = 'EMAIL',
  Password = 'PASSWORD',
}

export interface InputChangedEvent {
  target: {
    value: string;
    type: FieldType;
  };
}

