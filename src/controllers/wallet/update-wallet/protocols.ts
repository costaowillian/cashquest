import { IWallet } from "../../../models/wallet";

export interface UptadeWalletParamas {
    userId: string,
    Spendings?: number;
    deposits?: number;
    savings?: number;
}

export interface IUpdateWalletRepository {
    UpdateWallet(id: string, params: Omit<UptadeWalletParamas,"userId">): Promise<IWallet>;
}