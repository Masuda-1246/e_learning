import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import LectureStartTile from './LectureStartTile';
import { Box } from '@mui/material';
import { useQuery } from '@apollo/react-hooks';
import { GET_MY_LECTURE } from '../queries';
import LinearProgress from '@mui/material/LinearProgress';

const theme = createTheme();

export default function MyPage() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
    } else {
      window.location.href = '/';
    }
  }, []);

  const { loading, error, data } = useQuery(GET_MY_LECTURE, {
    variables: { user: localStorage.getItem('userId') },
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>Error :{JSON.stringify(error)}</p>;
  console.log(data);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
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
              LuxAI
            </Link>
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              handleLogout();
            }}
          >
            Log out
          </Button>
        </Toolbar>
        <Box sx={{ my: 4 }}></Box>
        <Box sx={{ my: 4, borderBottom: 1, borderColor: "grey.300"}}>
          <Typography variant="h5" gutterBottom>
            受講中の講義
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {data.allRegistrations.edges.map((post) => (
            <LectureStartTile key={post.node.lecture.title} post={post.node.lecture} isCompleted={post.node.isCompleted} id={post.node.id} isCertificated={false}/>
          ))}
        </Grid>
        <Box sx={{ my: 4 }}></Box>
        <Box sx={{ my: 4, borderBottom: 1, borderColor: "grey.300"}}>
          <Typography variant="h5" gutterBottom>
            受講修了の講義
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {data.allRegistrations.edges.map((post) => (
            <LectureStartTile key={post.node.lecture.title} post={post.node.lecture} isCompleted={!post.node.isCompleted} isCertificated={false}/>
          ))}
        </Grid>
        <Box sx={{ my: 4, borderBottom: 1, borderColor: "grey.300"}}>
          <Typography variant="h5" gutterBottom>
            発行済み証明書
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {data.allRegistrations.edges.map((post) => (
            <LectureStartTile key={post.node.lecture.title} post={post.node.lecture} isCompleted={!post.node.isCompleted} isCertificated={true}/>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
