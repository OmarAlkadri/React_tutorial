/* eslint-disable no-undef */
import SyncLoader from 'react-spinners/SyncLoader';
import * as React from 'react';
import { Grid, CssBaseline } from '@mui/material';
import { css } from '@emotion/react';

interface IPropTypes {
  loaded: boolean;
  onlySpinner: boolean;
  children?: any;
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
 `;

function Loader(props: IPropTypes): JSX.Element {
  const { loaded, onlySpinner, children } = props;

  if (!loaded || onlySpinner) {
    return (
      <React.Fragment>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: '10%' }} // Apply RTL style conditionally
        >
          <SyncLoader color="#00BFFF" css={override} size={35} loading />
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <div> {/* Apply RTL style to the main container */}
        <CssBaseline />
        {loaded && children}
      </div>
    );
  }
}

export default Loader;
