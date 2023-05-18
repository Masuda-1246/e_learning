import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderNoMenu from './HeaderNoMenu';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_TESTS } from '../queries';

const theme = createTheme();

export default function TestPage() {
  const location = useLocation();
  if (!location.state) window.location.href = '/';
  console.log(location.state.id);
  const { loading, error, data } = useQuery(GET_TESTS, {
    variables: { lecture: location.state.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <HeaderNoMenu />
        <Box sx={{ my: 4 }}></Box>
        {data.allTests.edges.map((edge) => {
          return (
            <div>
              <p>{edge.node.question}</p>
              <p>{edge.node.option1}</p>
              <p>{edge.node.option2}</p>
              <p>{edge.node.option3}</p>
              <p>{edge.node.option4}</p>
              <p>{edge.node.answer}</p>
            </div>
          );
        })}
      </Container>
    </ThemeProvider>
  );
}
