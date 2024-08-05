import React from "react";
import { Route, Routes } from "react-router-dom";

// Import your component files
import AddEmployee from "../Components/AddEmployee";
import EditEmployee from "../Components/EditEmployee";
import ListEmployee from "../Components/ListEmployee";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ListEmployee />} />
        <Route path="/list" element={<ListEmployee />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/editemployee/:id" element={<EditEmployee />} />
      </Routes>
    </main>
  );
};

export default Main;
