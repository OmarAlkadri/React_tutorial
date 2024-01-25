/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Avatar, CssBaseline } from '@mui/material';

interface propTypes {
  userID?: string;
  lettersToShow?: string;
  dialog?: boolean;
}

const Component: React.FC<propTypes> = ({ userID, lettersToShow, dialog = false }) => {
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setProfilePicture(null);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <CssBaseline />
      <Avatar
        src={profilePicture || ''}
      >
        {lettersToShow}
      </Avatar>
    </>
  );
};

export default Component;
