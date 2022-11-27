import {cloneElement, ReactElement, ReactNode, useState} from "react";
import {
    flip,
    offset,
    shift,
    Side,
    useFloating, useFocus,
    useHover,
    useInteractions
} from "@floating-ui/react-dom-interactions";
import './Tooltip.css';

export type TooltipPlacement = Side;

export type TooltipProps = {    
    children: ReactElement,   
    text: string
    placement?: TooltipPlacement
}

export const Tooltip = ({text, placement = 'top', children}: TooltipProps) => {
    const [open, setOpen] = useState(false);
    const strategy = 'absolute';

    const {
        x, y,
        reference, floating,
        context
    } = useFloating({
        open,
        placement,
        middleware: [
            offset(8),
            flip(),
            shift({padding: 5})
        ],
        strategy: strategy,
        onOpenChange: setOpen
    });
    
    const {getReferenceProps, getFloatingProps} = useInteractions([
        useHover(context, {
            delay: {
                open: 200,
                close: 0
            }
        }),
        useFocus(context)
    ])
    
    return (
        <div>
            {cloneElement(children, {ref: reference})}
            {open && (
                <div
                    ref={floating}
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0,
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
}