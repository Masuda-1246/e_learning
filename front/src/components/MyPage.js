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

const theme = createTheme();

const featuredPosts = [
  {
    id: '123',
    title: '10のプログラミング言語: 開発者におすすめの選択肢',
    date: 'Nov 14',
    description:
      '開発者向けに、使いやすさやパフォーマンスなどを考慮した10の人気プログラミング言語を紹介。次のプロジェクトに最適な言語の選択をサポートします。必見！',
    image:
      'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    imageLabel: 'main image description',
  },
  {
    id: '12345',
    title: 'Javaプログラミング: クロスプラットフォーム開発の鍵',
    date: 'Nov 12',
    description:
      '説明: Javaは汎用性の高いプログラミング言語で、クロスプラットフォーム開発に最適です。この記事では、Javaの特徴、優れた安定性、豊富なライブラリ、そしてビジネスアプリケーションやAndroidアプリ開発での利用例について解説します。',
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    imageLabel: 'Image Text',
  },
  {
    id: '1261141',
    title: 'Pythonプログラミング: シンプルでパワフルな万能言語',
    date: 'Nov 11',
    description:
      'Pythonはシンプルで読みやすい文法が特徴のプログラミング言語です。この記事では、Pythonの優れた柔軟性、豊富なライブラリ、データサイエンスやウェブ開発への応用例について紹介します',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    imageLabel: 'Image Text',
  },
  {
    id: '10194',
    title: 'PHPプログラミング: ウェブ開発のためのパワフルな言語',
    date: 'Dec 15',
    description:
      'PHPは人気のあるサーバーサイドスクリプト言語で、ウェブ開発においてパワフルなツールとして知られています。この記事では、PHPの柔軟性、広範なウェブアプリケーション開発の可能性、CMS（コンテンツ管理システム）での利用例を紹介します',
    image:
      'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    imageLabel: 'Image Text',
  },
];

export default function MyPage() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
      }
    } else {
      window.location.href = '/';
    }
  }, []);
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
              e-learing
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
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <LectureStartTile key={post.title} post={post} />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
