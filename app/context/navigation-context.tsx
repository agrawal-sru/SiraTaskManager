'use client'

import { createContext, useContext, useState } from "react"

type NavigationContextProviderProps = {
    children: React.ReactNode
}

type NavigationContextType = {
    isNavigationVisible: boolean,
    setIsNavigationVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export default function NavigationContextProvider({ children }: NavigationContextProviderProps) {
    const [isNavigationVisible, setIsNavigationVisible] = useState<boolean>(true);

    return (
        <NavigationContext.Provider value={{
            isNavigationVisible,
            setIsNavigationVisible,
        }}>
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigationContext() {
    const context = useContext(NavigationContext);

    if(context === null) {
        throw new Error(
            'useNavigationContext must be used within a NavigationContextProvider'
        );
    }
    return context;
}