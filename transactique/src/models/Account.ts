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
