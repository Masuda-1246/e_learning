import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LectureMainTile(props) {
  const navigate = useNavigate();
  const { post } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageLabel} height="185px" />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Button
              color="primary"
              onClick={() => {
                navigate('/register', { state: { id: post.id } });
              }}
            >
              詳しく見る...
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

LectureMainTile.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LectureMainTile;
