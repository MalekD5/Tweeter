import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Calendar } from './ui/calendar';
import { SelectSingleEventHandler } from 'react-day-picker';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { BsCalendar } from 'react-icons/bs';
import { format } from 'date-fns';

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
  initialFocus?: boolean;
};

export const DatePicker = ({ value, onChange, disabled, initialFocus }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <BsCalendar className="mr-2 size-4" />
          {value ? format(value, 'PPPP') : <span>Select a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus={initialFocus}
        />
      </PopoverContent>
    </Popover>
  );
};
