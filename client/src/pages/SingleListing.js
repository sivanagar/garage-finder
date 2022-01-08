import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LISTING } from '../utils/queries';
import Auth from '../utils/auth';

const SingleListing = () => {
  const { id: listingId } = useParams();
  const { data, loading } = useQuery(QUERY_LISTING, {
    variables: {
      _id: listingId,
    },
  });

  const listing = data ? data.listing : {};

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <div>
      <h1>{listing.address}</h1>
      <p>{listing.description}</p>
      <p>{listing.rate}</p>
      <p>{listing.climateControl}</p>
      <p>{listing.type}</p>
      <p>{listing.accessType}</p>
      <p>{listing.height}</p>
      <p>{listing.width}</p>
      <p>{listing.depth}</p>
      <p>{listing.username}</p>
      <p>{listing.location.coordinates}</p>
    </div>
  );
};

export default SingleListing;
