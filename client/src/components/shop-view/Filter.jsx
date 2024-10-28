import { filterOptions } from '@/config'
import React from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

const Filter = () => {
  return (
    <div className='bg-background rounded shadow-sm'>
        <div className='p-4 border-b'>
            <h2 className='text-lg font-semibold'>Filters</h2>
        </div>
        <div className="flex flex-col gap-2">
      {Object.entries(filterOptions).map(([key, options]) => (
        <div key={key} className='p-4'>
          <h3 className='font-bold'>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
          {options.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2 my-2 ">
              <Checkbox id={id} />
              <Label className='font-medium' htmlFor={id}>{label}</Label>
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Filter