'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dashboard } from '../components/ColorSchemeToggle/Dashboard';
import DBInitiator from '../components/DBInitiator';
import { getCategories, getProducts } from './util';

export default function HomePage() {
  return (
    <>
      <DBInitiator />
      <Dashboard />
    </>
  );
}
