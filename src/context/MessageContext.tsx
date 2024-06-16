import { ReactNode, createContext, useContext, useState } from "react";

type MessageContextType ={
    messages: string[];
    addMessage:(message:string) => void;
    clearMessages:() => void;
}

// The default value is set to undefined, which means if a component tries to 
// consume this context without a provider, it will get undefined.
const MessageContext = createContext<MessageContextType | undefined>(undefined);



const MessageProvider = ({children}: {children: ReactNode}) => {
    const[messages, setMessages] = useState<string[]>([]);

    const addMessage = (message:string) =>{
        setMessages(prevMessages => [...prevMessages, message])
    }
    const clearMessages = () =>{
        setMessages([]);
    }


    return(
        <MessageContext.Provider value={{messages, addMessage, clearMessages}}>
            {children}
        </MessageContext.Provider>
    )
}


const useMessages = () => {
    const context = useContext(MessageContext);

    if(context === undefined){
        throw new Error ('useMessages must be within a MessageProvider')
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export {MessageProvider, useMessages}