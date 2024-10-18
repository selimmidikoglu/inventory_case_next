'use client';

import { setInitialData } from '../app/util';

type Props = {};

const DBInitiator = async () => {
  const res = await setInitialData();
  console.log(res);
  return null;
};

export default DBInitiator;
