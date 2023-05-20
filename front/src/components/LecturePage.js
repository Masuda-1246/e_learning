import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderNoMenu from './HeaderNoMenu';
import Box from '@mui/material/Box';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useQuery } from '@apollo/react-hooks';
import { GET_TESTS } from '../queries';

const theme = createTheme();

export default function LecturePage() {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state) window.location.href = '/';
  const { loading, error, data } = useQuery(GET_TESTS, {
    variables: { lecture: location.state.id },
  });
  console.log(data);
  const handleClick = () => {
    console.log('click');
    navigate('/test', { state: { id: location.state.id, data:data.allTests.edges, isCompleted: location.state.isCompleted, lectureId: location.state.lectureId } });
  };
  useEffect(() => {
    const divElement = document.getElementById('youtube');
    if (!divElement) return;
    divElement.innerHTML = `<iframe width="860" height="515" src=${location.state.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <HeaderNoMenu />
        <Box sx={{ my: 4 }}></Box>
        <div
          style={{ width: '100%', display: 'flex', 'justify-content': 'center' }}
          id="youtube"
        ></div>
        <Box sx={{ my: 4 }}></Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" size="small" onClick={handleClick}>
            テストを受ける
          </Button>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
