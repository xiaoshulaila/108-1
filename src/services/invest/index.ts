import { InvestParams } from '../../types/invest';
import { sendInvestTransaction } from './transaction';

export async function invest(params: InvestParams) {
  await sendInvestTransaction(params);
}