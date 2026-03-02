import React, { createContext, useContext, useState, ReactNode } from "react";

type CursorType = "default" | "hover" | "view" | "play" | "text" | "hidden";

interface CursorContextProps {
    cursorType: CursorType;
    setCursorType: (type: CursorType) => void;
    cursorText: string;
    setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
    const [cursorType, setCursorType] = useState<CursorType>("default");
    const [cursorText, setCursorText] = useState("");

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType, cursorText, setCursorText }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => {
    const context = useContext(CursorContext);
    if (context === undefined) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
};
