import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const ToolTipComponent = ({ children, toolTipContent }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>{toolTipContent}</TooltipContent>
        </Tooltip>
    );
};

export default ToolTipComponent;
