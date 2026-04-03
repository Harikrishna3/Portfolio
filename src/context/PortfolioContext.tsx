import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultData from "../../server/db.json";

const API_URL = "/api/portfolio";

interface PortfolioContextType {
  portfolioData: any;
  loading: boolean;
  setPortfolioData: (data: any) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<any>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Production mode: Using bundled static data");
        return res.json();
      })
      .then((data) => {
        setPortfolioData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Static Mode Active:", err.message);
        setLoading(false); // We already have defaultData in state, so we just stop loading
      });
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, loading, setPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
