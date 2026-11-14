import React, { useState } from "react";
import Header from '../../components/header';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button, InputLabel, Snackbar, Alert } from '@mui/material';
import styles from './blanching.module.css';
import FormCard from '../../components/formCard';

const OutputForm = () => {
  const [incoming, setIncoming] = useState("");
  const [productCode, setProductCode] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to validate the form
  const validateForm = () => {
    if (!incoming || !productCode || !batchNumber || !quantity || !employeeId) {
      setErrorMessage("Please select all necessary details first before saving");
      setOpenSnackbar(true); // Show the pop-up
      return false;
    }
    setErrorMessage(""); // Clear the error message if form is valid
    return true;
  };

  // Handle the Save button click
  const handleSave = () => {
    if (validateForm()) {
      // Submit the form data if validation passes
      console.log("Form submitted", { incoming, productCode, batchNumber, quantity, employeeId });
    }
  };

  // Handle closing of Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Header
        heading="Cold Storage Record"
        subheading="Data entry of product in cold storage after receival"
      />
      <div className={styles.main}>
        <div className={styles.formgroup}>
          <FormCard heading="Details">
            
            <div className={styles.field}>
              <InputLabel required>Date of Receival</InputLabel>
              <TextField
                type="date"
                variant="outlined"
                sx={{ width: "50%" }}
                value={incoming}
                onChange={(e) => setIncoming(e.target.value)}
              />
            </div>
            
            <div className={styles.field}>
              <InputLabel required>Product Code</InputLabel>
              <TextField
                type="number"
                variant="outlined"
                sx={{ width: "50%" }}
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
            
            <div className={styles.field}>
              <InputLabel required>Batch Number</InputLabel>
              <TextField
                type="number"
                variant="outlined"
                sx={{ width: "50%" }}
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
              />
            </div>
            
            <div className={styles.field}>
              <InputLabel required>Quantity</InputLabel>
              <TextField
                type="number"
                variant="outlined"
                sx={{ width: "50%" }}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            
            <div className={styles.field}>
              <InputLabel required>Employee ID</InputLabel>
              <TextField
                type="string"
                variant="outlined"
                sx={{ width: "50%" }}
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
          </FormCard>

          <Stack direction="row" spacing={2}>
            <Button variant="text" onClick={handleSave}>Save</Button>
          </Stack>

          <br />
        </div>
      </div>

      {/* Snackbar for pop-up error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OutputForm;
