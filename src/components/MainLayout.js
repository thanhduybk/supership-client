import React from 'react';
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Breadcrumbs from "./Breadcrumb/Breadcrumb";

const MainLayout = (props) => (
    <>
        <Header />
        <Breadcrumbs />
        <Sidebar />
        {props.children}
    </>
);

export default MainLayout;