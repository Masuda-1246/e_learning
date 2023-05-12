import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderNoMenu from './HeaderNoMenu';
import { useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ViewCard from './ViewCard';
import LearningContents from './LearningContents';
import { useQuery } from '@apollo/react-hooks';
import { GET_LECTURE, GET_REGISTER } from '../queries';
import LinearProgress from '@mui/material/LinearProgress';


const theme = createTheme();

export default function RegisterLecture() {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_LECTURE, {
    variables: { id: location.state.id },
  });
  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_REGISTER, {
    variables: { lecture: location.state.id, user: localStorage.getItem('userId') },
  });
  if (loading || loading2) return <LinearProgress />;
  if (error || error2) return <p>Error :{JSON.stringify(error)}(</p>;
  if (data2.allRegistrations.edges.length !== 0) window.location.href = '/mypage';
  else
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <HeaderNoMenu />
        <Box sx={{ my: 4 }}></Box>
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
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
                <Typography component="h1" variant="h4" color="inherit" gutterBottom>
                  {data.lecture.title}
                </Typography>
                <Typography variant="h7" color="inherit" paragraph>
                  {data.lecture.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <ViewCard post={data.lecture} lecture_id={location.state.id} />
        <LearningContents post={data.lecture}  />
      </Container>
    </ThemeProvider>
  );
}
