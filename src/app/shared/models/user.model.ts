import { Routine } from './routine.model';

export class User {
  constructor(
    public email: string,
    public id: string,
    public image: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    private routines?: Routine[]
  ) {}
}
