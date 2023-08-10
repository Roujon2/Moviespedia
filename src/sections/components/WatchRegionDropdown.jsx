import React from 'react'
import Select from 'react-select'

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
    <Select
        options={regionOptions}
        value={regionOptions.find((region) => region.value === selectedRegion)}
        onChange={(selectedRegion) => onChange(selectedRegion.value)}
        styles={customRegionStyles}
    />
  )
}

export default WatchRegionDropdown