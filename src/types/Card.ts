export enum OperationType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export interface CardHistoric {
  operationType: OperationType;
  operationDate: Date;
  value: number;
}

export interface Card {
  _id: string;
  cardNumber: string;
  userId: string;
  cardExpirationDate: Date;
  historic: CardHistoric[];
}
