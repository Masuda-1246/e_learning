import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

function LectureStartTile(props) {
  const navigate = useNavigate();
  const { post, isCompleted, isCertificated, id } = props;
  return (
    <Grid item xs={12} md={6} sx={{ display: isCompleted ? "None":"block" }}>
      <CardActionArea
        onClick={() => {
          if (isCertificated) {
            navigate('/certificate', { state: { id: post.id } });
            return;
          } else {
            navigate('/lecture', { state: { url: post.lectureVideoElement, id: post.id, isCompleted: isCompleted, lectureId: id} });
          }
        }}
      >
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Box sx={{ my:1 }} />
            <Typography variant="subtitle1" color="primary">
              開始する
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, height:120, display: { xs: 'none', sm: 'block' } }}
            image={post.lectureImageUrl}
            alt={post.id}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

LectureStartTile.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LectureStartTile;
