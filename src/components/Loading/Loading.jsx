import React from 'react'
import { DotLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '0 auto',
};

export default function Loading() {
  return (
    <div className="py-24 flex flex-col items-center justify-center gap-4">
      <DotLoader
        color={'#059669'}
        cssOverride={override}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <span className="text-sm font-medium text-slate-400 animate-pulse">
        Loading fresh products...
      </span>
    </div>
  )
}
