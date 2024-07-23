'use client'
import { UIState } from '@/lib/interfaces';
import { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextProps {
    uiState: UIState;
    toggleSidebar: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [uiState, setUIState] = useState<UIState>({
        isSidebarOpen: false,
    });

    const toggleSidebar = () => {
        setUIState((prevState) => ({
            ...prevState,
            isSidebarOpen: !prevState.isSidebarOpen,
        }));
    };

    return (
        <AppContext.Provider value={{ uiState, toggleSidebar }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
