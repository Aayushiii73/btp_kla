import React from 'react';
import Paper from '@mui/material/Paper';

import styles from './reportCard.module.css';

const ReportCard = (props) => {
  return (
    <div className={styles.formcard} style={{ width: `${props.width}` }}>
      <Paper elevation={0}>
        {props.children}
      </Paper>
    </div>

  );
};

export default ReportCard;
