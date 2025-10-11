import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface Props {
  children: React.ReactNode;
  toolTipContent: string;
}

const ToolTipComponent = ({ children, toolTipContent }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{toolTipContent}</TooltipContent>
    </Tooltip>
  );
};

export default ToolTipComponent;
