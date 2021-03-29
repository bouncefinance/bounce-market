import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

export function SkeletonNFTCard() {
  return <div style={{ width: '262px', display: 'inline-block' }}>
    <Skeleton animation="wave" variant="rect" width={262} height={278} />
    <Skeleton style={{ marginTop: '14px' }} animation="wave" variant="text" />
    <Skeleton animation="wave" variant="text" width="60%" />
  </div>
}

export function NewSkeletonNFTCard() {
  return <div style={{ width: '262px', display: 'inline-block', marginBottom: '32px' }}>
    <Skeleton animation="wave" variant="rect" width={262} height={278} />
    <Skeleton style={{ marginTop: '14px' }} animation="wave" variant="text" />
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Skeleton animation="wave" variant="text" width="30%" />
      <Skeleton animation="wave" variant="text" width="20%" />
    </div>
    <Skeleton animation="wave" variant="text" width="60%" />
  </div>
}



export function SkeletonNFTCards({ n }) {
  return <div style={{ marginTop: '32px', marginRight: '-12px' }}>
    {new Array(n).fill().map((_, i) => <div key={i} style={{ display: 'inline-block', marginRight: '16px' }}>
      <SkeletonNFTCard />
    </div>)}
  </div>
}

export function NewSkeletonNFTCards({ n }) {
  return <div style={{ marginTop: '32px', marginRight: '-12px' }}>
    {new Array(n).fill().map((_, i) => <div key={i} style={{ display: 'inline-block', marginRight: '16px' }}>
      <NewSkeletonNFTCard />
    </div>)}
  </div>
}