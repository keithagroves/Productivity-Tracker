import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface InfoTooltipProps {
  content: string;
}

export const InfoTooltip = ({ content }: InfoTooltipProps) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-600 cursor-help" />
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs bg-white text-gray-900 p-2 rounded shadow-lg">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);