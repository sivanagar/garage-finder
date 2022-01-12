import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { CONTACT_HOST } from '../../utils/mutations';

const ContactHost = ({ listing }) => {
  const listingId = listing._id;
  const [contactHost] = useMutation(CONTACT_HOST);
  const [message, setText] = useState('');
  const [sentMessage, setMessage] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const hostUsername = listing.username;

    const response = await contactHost({
      variables: {
        hostUsername,
        listingId,
        message,
      },
    });
    setMessage(true);
    console.log('response', response);
  };

  return (
    <FormControl>
      <FormLabel>Contact {listing.username}</FormLabel>
      <Textarea
        value={message}
        onChange={(e) => setText(e.target.value)}
        w="100%"
        resize="none"
      />
      {sentMessage ? (
        <h3>Message Sent</h3>
      ) : (
        <Button
          onClick={handleFormSubmit}
          variant="secondary"
          size="sm"
          m="0.5"
        >
          Send Message
        </Button>
      )}
    </FormControl>
  );
};

export default ContactHost;
