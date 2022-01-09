import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LISTING } from '../utils/queries';
import Auth from '../utils/auth';

const EditListing = () => {
  const { id: listingId } = useParams();
  const loggedIn = Auth.loggedIn();
  const { data, loading } = useQuery(QUERY_LISTING, {
    variables: {
      _id: listingId,
    },
  });
  const listing = data ? data.listing : {};
  const listingOwner = loggedIn
    ? Auth.getProfile().data.username === listing.username
    : false;
  if (!listingOwner) {
    return <p>You are not authorized to edit this listing</p>;
  }
  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  return <div>EditListing</div>;
};
export default EditListing;
