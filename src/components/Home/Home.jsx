import React from 'react';
import style from './Home.module.css';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext.jsx';
import RecentProducts from '../RecentProducts/RecentProducts.jsx';
import CategorySlider from './../CategorySlider/CategorySlider.jsx';
import MainSlider from './../MainSlider/MainSlider.jsx';
import Loading from './../Loading/Loading.jsx'; 

export default function Home() {
  return (
    <>
      <MainSlider/>
      <CategorySlider/>
      <RecentProducts/>
      
    </>
  );
}
