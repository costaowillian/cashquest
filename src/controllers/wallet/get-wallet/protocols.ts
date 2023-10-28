export interface IGetWalletParams {
  userId: string;
}

export interface ITotal {
  userId: string;
  total: number;
}

export interface IGetTotalSpendingsRepository {
  getTotalSpendings(id: string): Promise<ITotal | number>;
}

export interface IGetTotalDepositsRepository {
  getTotalDeposits(id: string): Promise<ITotal | number>;
}

export interface IGetTotalMonthlySpendingsRepository {
  getTotalSpendings(id: string, currentDate: Date): Promise<ITotal | null>;
}

export interface IGetTotalSavingsRepository {
  getTotalSavings(id: string): Promise<ITotal | number>;
}
