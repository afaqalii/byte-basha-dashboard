'use client'
import { UIState } from '@/lib/interfaces';
import store from '@/redux/store';
import { createContext, useState, useContext, ReactNode } from 'react';
import { Provider } from 'react-redux';

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
        isSidebarOpen: window.innerWidth < 768 ? false : true,
    });

    const toggleSidebar = () => {
        setUIState((prevState) => ({
            ...prevState,
            isSidebarOpen: !prevState.isSidebarOpen,
        }));
    };

    return (
        <Provider store={store}>
            <AppContext.Provider value={{ uiState, toggleSidebar }}>
                {children}
            </AppContext.Provider>
        </Provider>
    );
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
