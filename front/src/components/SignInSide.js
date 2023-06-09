import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from '../images/signin.jpg';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { GET_TOKEN, GET_USER } from '../queries';

const theme = createTheme();

export default function SignInSide() {
  const [getToken] = useMutation(GET_TOKEN);
  const [getUser, { data }] = useLazyQuery(GET_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const datas = new FormData(event.currentTarget);
    const username = datas.get('name');
    const password = datas.get('password');
    try {
      const result = await getToken({ variables: { username: username, password: password } });
      localStorage.setItem('token', result.data.tokenAuth.token);
      await getUser({ variables: { username: username } });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('userId', data.user.edges[0].node.id);
      window.location.href = '/';
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ログイン
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="名前"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                ログイン
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    {'ホームに戻る'}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {'アカウントを作成する'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
