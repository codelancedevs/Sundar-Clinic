/**
 * Home
 */

// Dependencies
import React from 'react';
// import { useQuery } from 'react-query';

// Custom
// import server from '../functions/server';
// import routes from '../routes/routes.json';

// const getHome = () => {
//   return server.get(routes.site.getIndex.path);
// };

function Home() {
  // const { isLoading, error, isError, data, isFetching, refetch } = useQuery(
  //   routes.site.getIndex.key,
  //   getHome,
  //   {
  //     enabled: false,
  //   }
  // );

  // if (isLoading || isFetching) {
  //   return <h2>Loading...</h2>;
  // }

  // if (isError) {
  //   return <h2>{JSON.stringify(error.message)}</h2>;
  // }

  return (
    <div className='w-full h-full'>
      {/* Home: {JSON.stringify(data)}
      <button onClick={refetch}>Less Gooo</button> */}
    </div>
  );
}

export default Home;
