import React, { createContext, useState } from 'react';

// Create a context
export const ActiveLinkContext = createContext();

export function ActiveLinkProvider({ children }) {
  const [activeLink, setActiveLink] = useState(''); // Manage active link state globally

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </ActiveLinkContext.Provider>
  );
}
