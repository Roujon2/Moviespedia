import React from 'react'
import Select from 'react-select'

import './watchRegionDropdown.css'

const customRegionStyles = {
  container: (provided) => ({
    width: '200px', // Set a fixed width
    ...provided,
  })
}

const regionOptions = [
    {value: 'US', label: 'United States'},
    {value: 'CA', label: 'Canada'},
    {value: 'AR', label: 'Argentina'}
]


const WatchRegionDropdown = ({selectedRegion, onChange}) => {
  return (
    <div className="watch_region">
      <h3>
        Select watch region
      </h3>
      <Select
        options={regionOptions}
        value={regionOptions.find((region) => region.value === selectedRegion)}
        onChange={(selectedRegion) => onChange(selectedRegion.value)}
        styles={customRegionStyles}
      />
    </div>

  )
}

export default WatchRegionDropdown