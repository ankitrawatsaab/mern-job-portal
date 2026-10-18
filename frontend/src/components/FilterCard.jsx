
import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

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

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const handleValueChange = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue, dispatch])

  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Filter Jobs
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Find the right opportunity
          </p>
        </div>

        {selectedValue && (
          <button
            type="button"
            onClick={() => setSelectedValue('')}
            className="rounded-lg px-2 py-1 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="my-5 h-px bg-slate-100" />

      <RadioGroup
        value={selectedValue}
        onValueChange={handleValueChange}
        className="space-y-6"
      >
        {filterData.map((data) => (
          <section key={data.filterType}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-700">
              {data.filterType}
            </h3>

            <div className="space-y-1">
              {data.array.map((item) => {
                const itemId = `${data.filterType}-${item}`
                  .replace(/[^a-zA-Z0-9-]/g, '-')

                const isSelected = selectedValue === item

                return (
                  <div
                    key={item}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                      isSelected
                        ? 'bg-purple-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <RadioGroupItem
                      id={itemId}
                      value={item}
                      className="border-slate-300 text-purple-600"
                    />

                    <Label
                      htmlFor={itemId}
                      className={`flex-1 cursor-pointer text-sm ${
                        isSelected
                          ? 'font-semibold text-purple-700'
                          : 'font-medium text-slate-700'
                      }`}
                    >
                      {item}
                    </Label>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </RadioGroup>

      <div className="mt-6 rounded-xl bg-slate-50 p-3">
        <p className="text-xs leading-5 text-slate-500">
          Select a location or role to narrow down your job search.
        </p>
      </div>
    </aside>
  )
}

export default FilterCard
