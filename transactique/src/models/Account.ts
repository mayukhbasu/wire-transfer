export interface Account {
  id: string;
  type: string;
  balance: number;
}

export interface GetAvailableAccounts {
  success: boolean;
  message: string;
  data: string[]
}

export interface AvailableAccountsResponse {
  loading?: boolean;
  data: GetAvailableAccounts;
  error?: string | null | undefined;
}
