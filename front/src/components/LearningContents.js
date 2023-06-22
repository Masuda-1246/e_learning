import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const data = ['Flikiの登録方法、使い方を知る', 'Flikiを使用して音声読み上げを作成できるようにする', 'Flikiを使用して動画を作成できるようにする'];
function LearningContents() {
  return (
    <div>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200', maxWidth: 700 }}>
        <Typography variant="h5">学習内容</Typography>
        <div style={{ height: 20 }}></div>
        <div style={{ display: 'flex', }}>
          <div>
            {data.map((item, index) => {
              return (
                <div style={{ height: 32, alignItems: 'center', display: 'flex', marginTop: window.innerWidth < 600? '24px':'0px' }}>
                  <TaskAltIcon sx={{ mr: 2 }} />
                  <Typography variant="h6">{item}</Typography>
                </div>
              );
            })}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default LearningContents;
