'use-client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../util';

export default function Categories() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useQuery({
    queryKey: ['FETCH_CATEGORIES'],
    queryFn: () => getCategories(),
  });
  console.log(data);
  return (
    <div>
      {data.map((category: any) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );

  // ...
}
