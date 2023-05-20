import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderNoMenu from './HeaderNoMenu';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { useQuery } from '@apollo/react-hooks';
import { GET_SCORE } from '../queries';

const theme = createTheme();

export default function LecturePage() {
  const location = useLocation();
  if (!location.state) window.location.href = '/';
  const { loading, error, data } = useQuery(GET_SCORE, {variables: {user: localStorage.getItem('userId'), lecture: location.state.id}});
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const node = data.allScores.edges[0].node;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <HeaderNoMenu />
        <Box sx={{ my: 4 }}></Box>
        <h2>合格しました！</h2>
        <Box sx={{ my: 4 }}></Box>
        <h3>合格者：{node.user.username}</h3>
        <Box sx={{ my: 4 }}></Box>
        <h3>受験日：{node.createdAt.split("T")[0]}</h3>
        <Box sx={{ my: 4 }}></Box>
        <h3>正答率：{location.state.score}%</h3>
        <Box sx={{ my: 4 }}></Box>
        <h3>修了証ID：{node.id}</h3>
        <Box sx={{ my: 4 }}></Box>
        <Box sx={{ my: 4 }}></Box>
        <h3>成績：</h3>
        {
          location.state.data.map((edge, index) => {
            return (
              <div key={index}>
                <p>問{index+1}:{" "}{edge.node.question}</p>
                <p>正解:{" "}{edge.node.answer}</p>
                <Card sx={{ display: 'flex', mb:1, backgroundColor: location.state.userAns[index] === 1 ? "#90a4ae": "#ffffff" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="body1" variant="body1">
                      1: {edge.node.option1}
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ display: 'flex', mb:1, backgroundColor: location.state.userAns[index] === 2 ? "#90a4ae": "#ffffff" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="body1" variant="body1">
                      2: {edge.node.option2}
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ display: 'flex', mb:1, backgroundColor: location.state.userAns[index] === 3 ? "#90a4ae": "#ffffff"}}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="body1" variant="body1">
                      3: {edge.node.option3}
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ display: 'flex', mb:1, backgroundColor: location.state.userAns[index] === 4 ? "#90a4ae": "#ffffff" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="body1" variant="body1">
                      4: {edge.node.option4}
                    </Typography>
                  </CardContent>
                </Card>
                <Box sx={{ my: 4 }}></Box>
              </div>
            )
          }
          )
        }
      </Container>
    </ThemeProvider>
  );
}
