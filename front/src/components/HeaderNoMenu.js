import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function HeaderNoMenu() {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            e-learing
          </Link>
        </Typography>
        {localStorage.getItem('token') ? (
          <Button variant="outlined" size="small" href="./mypage">
            MyPage
          </Button>
        ) : (
          <Button variant="outlined" size="small" href="./login">
            Log in
          </Button>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

HeaderNoMenu.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default HeaderNoMenu;
