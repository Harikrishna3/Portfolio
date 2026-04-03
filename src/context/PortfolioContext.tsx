import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = "/api/portfolio";

interface PortfolioContextType {
  portfolioData: any;
  loading: boolean;
  refreshData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPortfolioData(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch live data:", err);
      // We don't set loading to false here to keep showing a "Loading/Offline" state 
      // or we could fallback to local constants here if needed.
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, loading, refreshData: fetchData }}>
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
