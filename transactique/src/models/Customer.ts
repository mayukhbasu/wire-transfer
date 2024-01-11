import { Account } from "./Account";

export interface Customer {
  _id: string;
  fullName: string;
  accountIds: Account[];
  user: string;
  __v: number;
}