import { IWallet } from "../../../models/wallet";

export interface IGetWalletParams {
    userId: string;
}

export interface IGetWalletREpository {
    getWallet(id: string): Promise<IWallet[] | null>
}