import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import LectureMainTile from './LectureMainTile';
import LectureRegisterTile from './LectureRegisterTile';
import Footer from './Footer';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_LECTURE } from '../queries';
import LinearProgress from '@mui/material/LinearProgress';

const theme = createTheme();

export default function MainPage() {
  const { loading, error, data } = useQuery(GET_ALL_LECTURE);

  if (loading) return <LinearProgress />;
  if (error) return <p>Error :{JSON.stringify(error)}</p>;
  if (data.allLectures.edges[0] === undefined) return <p>Not found</p>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <LectureMainTile post={data.allLectures.edges[Math.floor(Math.random() * data.allLectures.edges.length)].node} />
          <Grid container spacing={4}>
            {data.allLectures.edges.map((post) => (
              <LectureRegisterTile key={post.node.id} post={post.node} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer description="Something here to give the footer a purpose!" />
    </ThemeProvider>
  );
}
