import { IWallet } from "../../../models/wallet";

export interface IGetWalletREpository {
    getWallet(id: string): Promise<IWallet[] | null>
}