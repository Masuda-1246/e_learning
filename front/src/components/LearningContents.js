import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const data = ['Pythonの基礎', 'Javaの基礎', 'PHPの基礎'];
function LearningContents() {
  return (
    <div>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200', maxWidth: 700 }}>
        <Typography variant="h5">学習内容</Typography>
        <div style={{ height: 20 }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div>
            {data.map((item, index) => {
              return (
                <div style={{ height: 32, alignItems: 'center', display: 'flex' }}>
                  <TaskAltIcon sx={{ mr: 2 }} />
                  <Typography variant="h6">{item}</Typography>
                </div>
              );
            })}
          </div>
          <div>
            {data.map((item, index) => {
              return (
                <div style={{ height: 32, alignItems: 'center', display: 'flex' }}>
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
