import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderNoMenu from './HeaderNoMenu';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_SCORE, UPDATE_REGISTER } from '../queries';

const theme = createTheme();

export default function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [createScore] = useMutation(CREATE_SCORE);
  const [updateRegister] = useMutation(UPDATE_REGISTER);

  const [userAns, setUserAns] = useState({});
  if (!location.state) window.location.href = '/';
  const data = location.state.data
  console.log(userAns)
  const handleClick = (index, num) => {
    const tmp = {...userAns}
    tmp[index] = num
    setUserAns(tmp)
  }

  const handleSubmit = async() => {
    const ans = {}
    for (let i = 0; i < data.length; i++) {
      ans[i] = Number(data[i].node.answer)
    }
    let score = 0
    for (let i = 0; i < data.length; i++) {
      if (ans[i] === userAns[i]) score += 1
    }
    score = Math.floor(score / data.length * 100)
    if (score < 60) {
      alert("不合格です。正答率："+score+"%")
    } else {
      if (!location.state.isCompleted) {
        console.log(location.state.lectureId)
        await createScore({variables: {user: localStorage.getItem('userId'), lecture: location.state.id, score: score}})
        await updateRegister({variables: {id: location.state.lectureId, user: localStorage.getItem('userId'), lecture: location.state.id, isCompleted: true}})
      }
      navigate('/pass', {state: {answer: ans, userAns: userAns, data: data, id: location.state.id, score: score}})
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <HeaderNoMenu />
        <Box sx={{ my: 4 }}></Box>
        {data.map((edge, index) => {
          return (
            <div>
              <p>問{index+1}:{" "}{edge.node.question}</p>
              <CardActionArea onClick={() => {handleClick(index,1)}}>
                <Card sx={{ display: 'flex', mb:1, backgroundColor: userAns[index] === 1 ? "#90a4ae": "#ffffff" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="body1" variant="body1">
                      1: {edge.node.option1}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
              <CardActionArea onClick={() => {handleClick(index,2)}}>
                <Card sx={{ display: 'flex', mb:1, backgroundColor: userAns[index] === 2 ? "#90a4ae": "#ffffff" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="body1" variant="body1">
                      2: {edge.node.option2}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
              <CardActionArea onClick={() => {handleClick(index,3)}}>
                <Card sx={{ display: 'flex', mb:1, backgroundColor: userAns[index] === 3 ? "#90a4ae": "#ffffff"}}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="body1" variant="body1">
                      3: {edge.node.option3}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
              <CardActionArea onClick={() => {handleClick(index,4)}}>
                <Card sx={{ display: 'flex', mb:1, backgroundColor: userAns[index] === 4 ? "#90a4ae": "#ffffff" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="body1" variant="body1">
                      4: {edge.node.option4}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </div>
          );
        })}
        <Box sx={{ my: 2 }}></Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" size="small" onClick={handleSubmit}>
            テストを提出する
          </Button>
        </Box>
        <Box sx={{ my: 6 }}></Box>
      </Container>
    </ThemeProvider>
  );
}
