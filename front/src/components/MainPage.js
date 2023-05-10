import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import LectureMainTile from './LectureMainTile';
import LectureRegisterTile from './LectureRegisterTile';
import Footer from './Footer';

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

const theme = createTheme();

export default function MainPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <LectureMainTile post={featuredPosts[Math.floor(Math.random() * featuredPosts.length)]} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <LectureRegisterTile key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer description="Something here to give the footer a purpose!" />
    </ThemeProvider>
  );
}
