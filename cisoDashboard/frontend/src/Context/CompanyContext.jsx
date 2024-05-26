import React, { createContext, useState, useContext,useEffect } from 'react';
import { setCurrentOrganization } from '../apiClient';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        if (selectedCompany) {
            setCurrentOrganization(selectedCompany);
        }
    }, [selectedCompany]);

    return (
        <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => useContext(CompanyContext);
