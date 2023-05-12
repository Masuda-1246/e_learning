import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CastIcon from '@mui/icons-material/Cast';
import FeedIcon from '@mui/icons-material/Feed';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REGISTER } from '../queries';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ViewCard(props) {
  const { post, lecture_id } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [registerLecture] = useMutation(CREATE_REGISTER);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    console.log(lecture_id);
    console.log(localStorage.getItem('userId'));
    registerLecture({
      variables: {
        lecture: lecture_id,
        user: localStorage.getItem('userId'),
      },
    });
    window.location.href = '/mypage';
  };

  return (
    <Card
      sx={{
        '@media screen and (min-width:600px)': {
          top: 190,
          right: 250,
          position: 'absolute',
          maxWidth: 290,
        },
      }}
    >
      <CardMedia component="img" height="194" image={post.lectureImageUrl} alt="Paella dish" />
      <CardContent>
        {localStorage.getItem('token') ? (
          <Button fullWidth variant="contained" sx={{ mt: 1, mb: 2 }} onClick={handleRegisterClick}>
            登録
          </Button>
        ) : (
          <Button fullWidth variant="contained" sx={{ mt: 1, mb: 2 }} disabled>
            ログインしてください
          </Button>
        )}
        <span style={{ fontWeight: 'bold' }}>このコースの内容:</span>
        <br />
        <div style={{ alignItems: 'center', height: 24, display: 'flex' }}>
          <CastIcon sx={{ height: 20, mr: 2 }} />
          <Typography variant="caption">{}時間のオンデマンド</Typography>
        </div>
        <div style={{ alignItems: 'center', height: 24, display: 'flex' }}>
          <FeedIcon sx={{ height: 20, mr: 2 }} />
          <Typography variant="caption">{}個の記事</Typography>
        </div>
        <div style={{ alignItems: 'center', height: 24, display: 'flex' }}>
          <EmojiEventsIcon sx={{ height: 20, mr: 2 }} />
          <Typography variant="caption">修了証明書</Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
