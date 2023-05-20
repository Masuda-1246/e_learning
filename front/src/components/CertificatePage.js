import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderNoMenu from './HeaderNoMenu';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useQuery } from '@apollo/react-hooks';
import { GET_SCORE } from '../queries';
import Certificate from './Certificate';

const theme = createTheme();

export default function CertificatePage() {
  const location = useLocation();
  const [name, setName] = useState(' ');
  console.log(location.state)
  if (!location.state) window.location.href = '/';
  const { loading, error, data } = useQuery(GET_SCORE, {variables: {user: localStorage.getItem('userId'), lecture: location.state.id}});
  useEffect(() => {
    if (data) {
      setName(data.allScores.edges[0].node.user.username);
    }
  }, [data]);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)
  const node = data.allScores.edges[0].node;
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name_val } = e.target;
    console.log(name_val.value);
    setName(name_val.value);
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <HeaderNoMenu />
        <Box sx={{ my: 4 }}></Box>
        <Box sx={{ my: 4 }}></Box>
        <h3>合格者：{node.user.username}</h3>
        <Box sx={{ my: 4 }}></Box>
        <h3>受験日：{node.createdAt.split("T")[0]}</h3>
        <Box sx={{ my: 4 }}></Box>
        <h3>正答率：{node.score}%</h3>
        <Box sx={{ my: 4 }}></Box>
        <h3>修了証ID：{node.id}</h3>
        <Box sx={{ my: 4 }}></Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex'}} >
            <TextField name="name_val" label="名前" sx={{ mr:3, width:"300px" }} />
            <Button variant="outlined" size="small" type="submit">
              名前を変更
            </Button>
          </Box>
        </form>
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <Certificate name={name} cource={node.lecture.title} author={node.lecture.author} date={node.createdAt.split("T")[0]} id={node.id}/>
        </Box>
        <Box sx={{ my: 4 }}></Box>
      </Container>
    </ThemeProvider>
  );
}
