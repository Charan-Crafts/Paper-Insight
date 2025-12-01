import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
const ProtectedRoutes = ({ isAuthenticated, user, children }) => {

    const location = useLocation();
    if (!isAuthenticated && (location.pathname.includes("/admin") || location.pathname.includes("/paperinsight"))) {
        return <Navigate to="/" replace={true} />;
    }
    if (isAuthenticated && user ?. role === "admin") {
        // Can access the admin routes but not the user routes and also when dont access the login page and register page

        if ((location.pathname.includes("/paperinsight")) || (location.pathname === "/login") || (location.pathname === "/register"))
            return <Navigate to="/admin" replace={true} />;

    }
    if (isAuthenticated && user ?. role !== "admin") {
        // Can access the user routes but not the admin routes and also when dont access the login page and register page
        if ((location.pathname.includes("/admin")) || (location.pathname === "/login") || (location.pathname === "/register") || (location.pathname === "/"))
            return <Navigate to="/paperinsight" replace={true} />;
    }

    if(!isAuthenticated && (location.pathname.includes("paperinsight") || location.pathname.includes("admin"))){
        return <Navigate to ="/login"/>
    }

    return <>
        {children}
    </>
}

export default ProtectedRoutes;