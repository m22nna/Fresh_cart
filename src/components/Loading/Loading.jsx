import React from 'react'
import style from './Loading.module.css'
import { DotLoader } from 'react-spinners'
import { useState } from 'react';
const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function Loading() {
 

  return (
    <>
   
   <div className="sweet-loading py-30">
      
      <DotLoader
        color={'#ec119133'}
        
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </>
  )
}
