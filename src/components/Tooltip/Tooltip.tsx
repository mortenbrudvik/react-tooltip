import {ReactNode, useState} from "react";
import {offset, useFloating} from "@floating-ui/react-dom-interactions";

export type TooltipProps = {    
    children: ReactNode,   
    text: string
}

export const Tooltip = ({children}: TooltipProps) => {
    const [open, setOpen] = useState(false);
    
    const {
        x,y,
        reference, floating
    } = useFloating({
        open,
        middleware: [
            offset(8),
        ],
        strategy: 'absolute',
        onOpenChange: setOpen
    })
    return (
        <div>{children}</div>
    );
}