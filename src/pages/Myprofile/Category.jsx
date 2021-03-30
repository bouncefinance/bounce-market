import PullRadioBox from '@/components/UI-kit/Select/PullRadioBox';
import { ITEM_CATEGORY, ITEM_SELL_STATUS } from '@/utils/const';
import React from 'react';

export default function Category({
  itemList,
  onStatusChange
}) {
  
  const handleChange = (item) => {
    switch(item.value) {
      case ITEM_SELL_STATUS.All:
      default:
        onStatusChange(itemList);
        break;
      case ITEM_SELL_STATUS.OnSale:
        onStatusChange(itemList.filter(item => !!item.poolId));
        break;
      case ITEM_SELL_STATUS.NotOnSale:
        onStatusChange(itemList.filter(item => !item.poolId))
        break;
    }
  }

  return (
    <div className="flex">
      <PullRadioBox prefix={'Items:'} options={[{
        value: ITEM_CATEGORY.All
      },]} defaultValue={ITEM_CATEGORY.All} onChange={(item) => {
        // setType(item.value);
      }} />
      <div style={{ width: '16px' }}></div>
      <PullRadioBox prefix={'Status:'} options={[{
        value: ITEM_SELL_STATUS.All
      }, {
        value: ITEM_SELL_STATUS.OnSale
      }, {
        value: ITEM_SELL_STATUS.NotOnSale
      }]} defaultValue={ITEM_SELL_STATUS.All} onChange={handleChange} />
    </div>
  )
}