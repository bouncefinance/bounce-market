import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

export function SkeletonBrandCard () {
  return <div style={{ width: '262px', display: 'inline-block' }}>
    <Skeleton animation="wave" variant="rect" width={262} height={180} />
    <Skeleton animation="wave" variant="text" width="60%" />
  </div>
}

export function SkeletonBrandCards ({ n }) {
  return <div style={{ marginTop: '32px', marginRight: '-12px' }}>
    {new Array(n).fill().map((_, i) => <div key={i} style={{ display: 'inline-block', marginRight: '16px' }}>
      <SkeletonBrandCard />
    </div>)}
  </div>
}