import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useNavigate } from 'react-router-dom';

function LectureRegisterTile(props) {
  const navigate = useNavigate();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        onClick={() => {
          navigate('/register', { state: { id: post.id } });
        }}
      >
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              詳しく見る...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, height: 120, display: { xs: 'none', sm: 'block' } }}
            image={post.lectureImageUrl}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

LectureRegisterTile.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LectureRegisterTile;
