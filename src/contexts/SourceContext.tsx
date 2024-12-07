import { createContext, useContext, useState, ReactNode } from 'react';

type Source = 'all' | 'retargeting' | 'email' | 'paid-social' | 'organic-social' | 'paid-search' | 'organic-search';

interface SourceContextType {
  source: Source;
  setSource: (source: Source) => void;
}

const SourceContext = createContext<SourceContextType | undefined>(undefined);

export function SourceProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<Source>('all');

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      {children}
    </SourceContext.Provider>
  );
}

export function useSource() {
  const context = useContext(SourceContext);
  if (context === undefined) {
    throw new Error('useSource must be used within a SourceProvider');
  }
  return context;
}