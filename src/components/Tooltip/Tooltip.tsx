import {cloneElement, ReactElement, useState} from "react";
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
import {mergeRefs} from "../../utils";

export type TooltipPlacement = Side;

export type TooltipProps = {
    children: ReactElement,
    label: string
    placement?: TooltipPlacement,
    openDelay?: number;
    closeDelay?: number;
}

export const Tooltip = ({label, placement = 'top', openDelay = 400, closeDelay = 10, children}: TooltipProps) => {
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

    useInteractions([
        useHover(context, {
            delay: {
                open: openDelay,
                close: closeDelay
            }
        }),
        useFocus(context)
    ])

    const ref = mergeRefs([reference, (children as any).ref]);

    return (
        <div>
            {cloneElement(children, {ref})}
            {open && (
                <div className="tooltip"
                     ref={floating}
                     style={{
                         position: strategy,
                         top: y ?? 0,
                         left: x ?? 0,
                     }}
                >
                    {label}
                </div>
            )}
        </div>
    );
}