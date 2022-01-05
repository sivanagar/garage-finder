import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Home = () => {
  const { data: userData } = useQuery(QUERY_ME);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">Logged In FORM/ OTHER INFO</div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          <div>List</div>
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">Side Menu?</div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
