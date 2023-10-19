import { IWallet } from "../../../models/wallet";

export interface UptadeWalletParamas {
    Spendings?: number;
    deposits?: number;
    savings?: number;
}

export interface IUpdateWalletRepository {
    UpdateWallet(id: string, params: UptadeWalletParamas): Promise<IWallet>;
}