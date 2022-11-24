export type TooltipProps = {
    text: string,
}

export const Tooltip = ({text}: TooltipProps) => {

    return (
        <div>{text}</div>
    );
}