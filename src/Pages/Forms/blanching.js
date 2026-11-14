import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../components/header';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { OutlinedInput, InputAdornment, FormHelperText, FormLabel, Radio, RadioGroup, Button, InputLabel, Select, MenuItem } from '@mui/material';

import styles from './blanching.module.css'
import FormCard from '../../components/formCard';

const MiddleForm = () => {
  const navigate = useNavigate();
  const [incoming, setIncoming] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  return (
    <>
      <Header
        heading="Daily Blanching Record"
        subheading="Data entry for product parameters after process"
      />
      <div className={styles.main}>
        <div className={styles.formgroup}>
          <FormCard heading="Details">
            <div className={styles.field}>
              <InputLabel required>Incoming material weight</InputLabel>
              <TextField
                variant="outlined"
                sx={{ width: "50%" }}
                onChange={(e) => { setIncoming(e.target.value) }}
              />
            </div>
            <div className={styles.field}>
              <InputLabel required>Outgoing material weight</InputLabel>
              <TextField
                type="number"
                variant="outlined"
                sx={{ width: "50%" }}
                onChange={(e) => { setOutgoing(e.target.value) }}
              />
            </div>
            <div className={styles.field}>
              <InputLabel required>Total waste</InputLabel>
              {incoming - outgoing}
            </div>
          </FormCard>
          <Stack direction="row" spacing={2}>
            <Button variant="text">Save</Button>
          </Stack>
          <br />
        </div>
      </div >
    </>
  );
};

export default MiddleForm;
