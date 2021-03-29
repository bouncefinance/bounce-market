import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

export function SkeletonBrandRowCard () {
  return <div className="flex" style={{ width: '1100px', border: '1px solid rgba(0,0,0,0.2)' }}>
    <Skeleton animation="wave" variant="rect" width={540} height={332} />
    <div style={{ marginLeft: '36px' }}>
      <div style={{ height: '40px' }}></div>
      <Skeleton animation="wave" variant="text" width={280} height={50} />
      <div style={{ height: '20px' }}></div>
      <Skeleton animation="wave" variant="text" width={200} height={25} />
      <div style={{ height: '20px' }}></div>
      <Skeleton animation="wave" variant="text" width={200} height={25} />
    </div>
  </div>
}

export function SkeletonBrandRowCards ({ n }) {
  return <div style={{ marginTop: '0px', }}>
    {new Array(n).fill().map((_, i) => <div key={i} style={{ marginTop: '32px' }}>
      <SkeletonBrandRowCard />
    </div>)}
  </div>
}