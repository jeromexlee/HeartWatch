'use client';

import React from 'react';
import { MainPage } from '../components/MainPage/MainPage'
import { HeartBeatProvider } from '../components/MainPage/HeartBeatContext';

export default function HomePage() {
  return (
    <HeartBeatProvider>
      <MainPage />
    </HeartBeatProvider>
  );
}
