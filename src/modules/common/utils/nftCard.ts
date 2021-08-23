export interface INftCardHelpsParams {
  openAt?: Date;
  closeAt?: Date;
  now: number;
  isBidderClaimed?: boolean;
  isCreatorClaimed?: boolean;
  isOnSale?: boolean;
}
export class NftCardHelps {
  openAt?: Date;
  closeAt?: Date;
  isPutSaleTimeCancel: boolean;
  isBidderClaimed: boolean;
  isCreatorClaimed: boolean;
  isOnSale: boolean;
  now: number;
  constructor({
    openAt,
    closeAt,
    now = Date.now(),
    isBidderClaimed = false,
    isCreatorClaimed = false,
    isOnSale = false,
  }: INftCardHelpsParams) {
    this.isBidderClaimed = isBidderClaimed;
    this.isCreatorClaimed = isCreatorClaimed;
    this.openAt = openAt;
    this.closeAt = closeAt;
    this.isOnSale = isOnSale;

    this.isPutSaleTimeCancel = Boolean(openAt && +openAt > now);
    this.now = now;
  }
  updateNow(now: number) {
    this.now = now;
  }
  getIsAuctionLastTime() {
    const last24h: boolean = Boolean(
      this.closeAt && +new Date(this.now + 1e3 * 60 * 60 * 24) > +this.closeAt,
    );
    return Boolean(
      last24h &&
        !this.isPutSaleTimeCancel &&
        !this.isBidderClaimed &&
        !this.isCreatorClaimed &&
        this.isOnSale,
    );
  }
}
