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

const data = {
  id: '10194',
  title: 'PHPプログラミング: ウェブ開発のためのパワフルな言語',
  date: 'Dec 15',
  description:
    'PHPは人気のあるサーバーサイドスクリプト言語で、ウェブ開発においてパワフルなツールとして知られています。この記事では、PHPの柔軟性、広範なウェブアプリケーション開発の可能性、CMS（コンテンツ管理システム）での利用例を紹介します',
  image:
    'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  imageLabel: 'Image Text',
};

const theme = createTheme();

export default function RegisterLecture() {
  const location = useLocation();
  console.log(location.state);
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
                  {data.title}
                </Typography>
                <Typography variant="h7" color="inherit" paragraph>
                  {data.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <ViewCard post={data} />
        <LearningContents post={data} />
      </Container>
    </ThemeProvider>
  );
}
