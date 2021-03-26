import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

export function SkeletonNFTCard () {
  return <div style={{ width: '262px', display: 'inline-block' }}>
    <Skeleton animation="wave" variant="rect" width={262} height={262} />
    <Skeleton style={{ marginTop: '14px' }} animation="wave" variant="text" />
    <Skeleton animation="wave" variant="text" width="60%" />
  </div>
}

export function SkeletonNFTCards ({ n }) {
  return <div style={{ marginTop: '32px' }}>{new Array(n).fill().map((_, i) => <div key={i} style={{ display: 'inline-block', marginRight: '17px' }}>
    <SkeletonNFTCard />
  </div>)}
  </div>
}