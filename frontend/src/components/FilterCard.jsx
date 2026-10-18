
import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal, X } from 'lucide-react'

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'],
  },
  {
    filterType: 'Industry',
    array: [
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'UI/UX Designer',
      'DevOps Engineer',
      'Data Analyst',
      'AI Engineer',
      'Cybersecurity Specialist',
      'Cloud Engineer',
      'Android Developer',
    ],
  },
]

const FilterCard = ({ filters, onFilterChange, onClear, onClose }) => {
  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
            <SlidersHorizontal size={19} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Filter Jobs</h2>
            <p className="text-xs text-slate-500">Find your next opportunity</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <div className="my-5 h-px bg-slate-100" />

      {filterData.map(({ filterType, array }) => (
        <section key={filterType} className="mb-6 last:mb-0">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            {filterType}
          </h3>

          <RadioGroup
            value={filters[filterType] || ''}
            onValueChange={(value) => onFilterChange(filterType, value)}
            className="space-y-1"
          >
            {array.map((item) => {
              const id = `${filterType}-${item}`.replace(/[^a-zA-Z0-9-]/g, '-')
              const selected = filters[filterType] === item

              return (
                <div
                  key={item}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                    selected ? 'bg-purple-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <RadioGroupItem
                    id={id}
                    value={item}
                    className="border-slate-300 text-purple-600"
                  />
                  <Label
                    htmlFor={id}
                    className={`flex-1 cursor-pointer text-sm ${
                      selected
                        ? 'font-semibold text-purple-700'
                        : 'font-medium text-slate-700'
                    }`}
                  >
                    {item}
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </section>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={onClear}
        className="mt-5 w-full rounded-xl border-slate-200 font-semibold hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
      >
        Clear all filters
      </Button>
    </aside>
  )
}

export default FilterCard
