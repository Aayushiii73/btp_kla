import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../components/header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import styles from './coldStorageReport.module.css';
import ShipReport from "../../components/shipReport";

// Initial data
const initialData = [
  {
    "material": "Green Peas",
    "batch_code": "Xyz123",
    "date": "18/9/24",
    "employee_id": "John Doe",
    "Shipped": ""
  },
  {
    "material": "Carrots",
    "batch_code": "Xyz125",
    "date": "20/9/24",
    "employee_id": "Jim Doe",
    "Shipped": ""
  },
  {
    "material": "Potatoes",
    "batch_code": "Xyz126",
    "date": "21/9/24",
    "employee_id": "Anna Doe",
    "Shipped": ""
  },
  {
    "material": "Corn",
    "batch_code": "Xyz127",
    "date": "22/9/24",
    "employee_id": "Jake Doe",
    "Shipped": ""
  },
  {
    "material": "Green Peas",
    "batch_code": "Xyz124",
    "date": "19/9/24",
    "employee_id": "Jane Doe",
    "Shipped": ""
  }
];

// Sorting the initial data lexicographically by material names
const sortedData = initialData.sort((a, b) => a.material.localeCompare(b.material));

const header = ["", "Material Name", "Batch Code", "Date", "Employee ID", "Shipped"];

const ColdStorageReport = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(sortedData); // Sorted data

  const handleSubmit = (index) => {
    const newData = [...data];
    newData[index].Shipped = newData[index].Shipped === "done" ? "done" : "done";
    setData(newData);
  };

  return (
    <>
      <Header
        heading="Cold Storage Report"
        subheading="Data entry for product parameters after final inspection"
      />
      <div className={styles.main}>
        <div className={styles.formgroup}>
          <ShipReport>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {header.map((head, index) => (
                      <TableCell key={index}>{head}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{index + 1}</TableCell>
                      <TableCell className={styles.colored}>{row.material}</TableCell>
                      <TableCell className={styles.colored}>{row.batch_code}</TableCell>
                      <TableCell className={styles.colored}>{row.date}</TableCell>
                      <TableCell className={styles.colored}>{row.employee_id}</TableCell>
                      <TableCell className={styles.colored}>
                        <Button
                          variant="contained"
                          onClick={() => handleSubmit(index)}
                          sx={{
                            minWidth: '140px', // Minimum width for all buttons
                            backgroundColor: row.Shipped === "done" ? 'blue' : 'red',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: row.Shipped === "done" ? '#1565c0' : '#d32f2f'
                            }
                          }}
                        >
                          {row.Shipped === "done" ? 'Shipped' : 'Not Shipped'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ShipReport>
        </div>
      </div>
    </>
  );
};

export default ColdStorageReport;
