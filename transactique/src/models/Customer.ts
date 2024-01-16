import { Account } from "./Account";

export interface Customer {
  displayName: string;
  accounts: Account[]
}

export interface CustomerResponse {
  loading?: boolean;
  data: Customer[];
  error?: string | null | undefined;
}


 