import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MiddleForm from './Pages/Forms/blanching'
import InputForm from './Pages/Forms/inputForm';
import OutputForm from './Pages/Forms/outputForm';
import ColdStorageReport from './Pages/shippingReport/coldStorageReport';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/middleform' element={<MiddleForm />}></Route>
            <Route path='/inputform' element={<InputForm />}></Route>
            <Route path='/outputform' element={<OutputForm />}></Route>
            <Route path='/shippingreport' element={<ColdStorageReport />}></Route>
        </Routes>
    );
}

export default AllRoutes