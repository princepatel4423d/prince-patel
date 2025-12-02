import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/context/ToastContext";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://prince-patel-server.onrender.com";
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [adminData, setAdminData] = useState(false);
    const [loading, setLoading] = useState(true);

    const { toast } = useToast();

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

            if (data.success) {
                setIsLoggedin(true);
                await getAdminData();
            } else {
                setIsLoggedin(false);
            }
        } catch (error) {
            toast(error.message, "error");
            setIsLoggedin(false);
        } finally {
            setLoading(false);
        }
    };

    const getAdminData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/data");

            if (data.success) {
                setAdminData(data.adminData);
            } else {
                toast(data.message, "error");
            }
        } catch (error) {
            toast(error.message, "error");
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
        backendUrl,
        isLoggedin,
        adminData,
        setIsLoggedin,
        setAdminData,
        getAdminData,
        loading,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};