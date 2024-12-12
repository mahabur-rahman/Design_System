import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_ALL_USERS = gql`
  query GetAllUsers($skip: Float, $take: Float) {
    findAllUsers(skip: $skip, take: $take) {
    
      username
    }
  }
`;

const App = () => {
  const [users, setUsers] = useState([]); // Local state to store all users
  const [skip, setSkip] = useState(0);
  const take = 100;

  const { data, loading, error, fetchMore } = useQuery(GET_ALL_USERS, {
    variables: { skip, take },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && data.findAllUsers) {
      // Append new data to existing users
      setUsers((prevUsers) => [...prevUsers, ...data.findAllUsers]);
    }
  }, [data]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
      !loading
    ) {
      fetchMore({
        variables: { skip: skip + take, take },
      });
      setSkip((prevSkip) => prevSkip + take); // Update skip for the next fetch
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, skip, take]);

  if (error) return <p>Error loading users</p>;

  return (
    <>
      <h2>NestJS GraphQL Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      {loading && <p>Loading more...</p>}
    </>
  );
};

export default App;
