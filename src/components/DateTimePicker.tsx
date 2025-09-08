"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { log } from "console"

interface DateTimePickerProps {
  onDateSelected?: (date: Date | undefined) => void
}

export function DateTimePicker(props: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>('');
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  // formats the date string 
  const combineDateAndTime = (selectedDate?: Date, selectedTime?: string) => {
    if (!selectedDate || !selectedTime) {
      return undefined;
    }
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours, minutes, 0, 0);

    return combinedDate;
  };

  return (
    <div className="flex gap-4 items-center">
      <Label htmlFor="date-picker" className="px-1 text-[16px]">
        Takes place
      </Label>
      <div className="flex flex-col gap-3">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal bg-neutral-800 border border-neutral-700"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              style={{background: '#262626', color: 'white', borderColor: 'white', outlineColor: 'white'}}
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setIsPopoverOpen(false);
                const combined = combineDateAndTime(selectedDate, time);
                if (props.onDateSelected) {
                  props.onDateSelected(combined);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id="time-picker"
          step="1"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          onChange={(e) => {
            const newTime = e.target.value;
            setTime(newTime);
            const combined = combineDateAndTime(date, newTime);
            if (props.onDateSelected) {
              props.onDateSelected(combined);
            }


          }}
        />
      </div>
    </div>
  );
}

