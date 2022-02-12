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
  // axios.get("/api/post?postId=6203ea8dc522e5f355756e56")
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err.response))
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
    <div>
      {/* Home: {JSON.stringify(data)}
      <button onClick={refetch}>Less Gooo</button> */}
    </div>
  );
}

export default Home;
