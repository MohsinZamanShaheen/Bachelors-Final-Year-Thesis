import{ useState, createContext } from 'react';

export const CheckedRowsContext = createContext();

export const RowProvider = ({ children }) => {
    const [checkedRows, setCheckedRows] = useState([]);
    return (
      <CheckedRowsContext.Provider value={{ checkedRows, setCheckedRows  }}>
        {children}
      </CheckedRowsContext.Provider>
    );
  };
  
  export default RowProvider;