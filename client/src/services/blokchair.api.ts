import { http } from "../common/constants";
import { IApiResponse } from "../common/interfaces";

class BlockChairService {
  async getAddress(address: string): Promise<any> {
    const result = await http.get<IApiResponse<any>>(`/address/${address}`);
    return result.data;
  }

  async getTransaction(transaction: string): Promise<any> {
    const result = await http.get<IApiResponse<any>>(`/transaction/${transaction}`);
    return result.data;
  }
}

const service = new BlockChairService();
export default service;
