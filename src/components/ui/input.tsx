import { SearchIcon } from 'lucide-react'
import * as React from 'react'
import { CurrencyInput } from 'react-currency-mask'
import InputMask from 'react-input-mask'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const InputFormMask = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }) => {
    return (
      <InputMask
        mask="+55 99 99999 9999"
        maskChar=" "
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)
InputFormMask.displayName = 'InputFormMask'

const InputMarkCurrency = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <CurrencyInput
        onChangeValue={(event, originalValue, maskedValue) => {
          console.log(event, originalValue, maskedValue)
        }}
        InputElement={
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
        }
      />
    )
  },
)
InputMarkCurrency.displayName = 'InputMarkCurrency'

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex h-9 w-full items-center rounded-md border border-input bg-transparent text-sm shadow-sm outline-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
        <input
          type={type}
          className={cn(
            'h-full w-full rounded-md bg-transparent px-3 py-1 outline-primary',
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="pl-1 pr-2">
          <SearchIcon size={16} />
        </div>
      </div>
    )
  },
)
InputSearch.displayName = 'InputSearch'

export { Input, InputSearch, InputFormMask, InputMarkCurrency }
