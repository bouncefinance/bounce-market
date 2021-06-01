import {
  IGetPoolsApi,
  ITradeAuction,
  ITradePool,
} from 'modules/common/api/getPools';

export interface IApiRecords extends IGetPoolsApi {}

export interface IRecords {
  englishTotal: number;
  fixedSwapTotal: number;
  tradeAuctions: ITradeAuction[];
  tradePools: ITradePool[];
}
