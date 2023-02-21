import { API_KEY, httpCurrency } from "../common/constants";
import { IApiResponse } from "../common/interfaces";

class CurrencyService {
  async getCurrencyData(base: string): Promise<any> {
    const result = await httpCurrency.get<IApiResponse<any>>(`latest.json?app_id=${API_KEY}&base=${base}`);
    return result.data;
  }
}

const service = new CurrencyService();
export default service;
