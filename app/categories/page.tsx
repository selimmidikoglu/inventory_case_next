// // app/posts/page.jsx
// import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
// import { getCategories } from '../util';
// import Categories from './categories';

// export default async function PostsPage() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryFn: () => getCategories(),
//     queryKey: ['FETCH_CATEGORIES'],
//   });
//   //   const { data: categories } = useQuery({
//   //     queryFn: () => getCategories(),
//   //     queryKey: ['FETCH_PRODUCTS'],
//   //   });
//   //   console.log(categories);

//   return (
//     // Neat! Serialization is now as easy as passing props.
//     // HydrationBoundary is a Client Component, so hydration will happen there.
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Categories />
//     </HydrationBoundary>
//   );
// }
