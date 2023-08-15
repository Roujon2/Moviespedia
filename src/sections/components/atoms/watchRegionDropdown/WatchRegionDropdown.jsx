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
    {value: 'AR', label: 'Argentina'},
    {value: 'AE', label: 'United Arab Emirates'},
    {value: 'AL', label: 'Albania'},
    {value: 'AT', label: 'Austria'},
    {value: 'AU', label: 'Australia'},
    {value: 'AZ', label: 'Azerbaijan'},
    {value: 'BA', label: 'Bosnia and Herzegovina'},
    {value: 'BB', label: 'Barbados'},
    {value: 'BE', label: 'Belgium'},
    {value: 'BG', label: 'Bulgaria'},
    {value: 'BH', label: 'Bahrain'},
    {value: 'BO', label: 'Bolivia'},
    {value: 'BR', label: 'Brazil'},
    {value: 'BS', label: 'Bahamas'},
    {value: 'BZ', label: 'Belize'},
    {value: 'CA', label: 'Canada'},
    {value: 'CH', label: 'Switzerland'},
    {value: 'CL', label: 'Chile'},
    {value: 'CO', label: 'Colombia'},
    {value: 'CR', label: 'Costa Rica'},
    {value: 'CV', label: 'Cape Verde'},
    {value: 'CY', label: 'Cyprus'},
    {value: 'CZ', label: 'Czech Republic'},
    {value: 'DE', label: 'Germany'},
    {value: 'DK', label: 'Denmark'},
    {value: 'DO', label: 'Dominican Republic'},
    {value: 'EC', label: 'Ecuador'},
    {value: 'EE', label: 'Estonia'},
    {value: 'EG', label: 'Egypt'},
    {value: 'ES', label: 'Spain'},
    {value: 'FI', label: 'Finland'},
    {value: 'FJ', label: 'Fiji'},
    {value: 'FR', label: 'France'},
    {value: 'GB', label: 'United Kingdom'},
    {value: 'GF', label: 'French Guiana'},
    {value: 'GG', label: 'Guernsey'},
    {value: 'GI', label: 'Gibraltar'},
    {value: 'GR', label: 'Greece'},
    {value: 'GT', label: 'Guatemala'},
    {value: 'GY', label: 'Guyana'},
    {value: 'HK', label: 'Hong Kong'},
    {value: 'HN', label: 'Honduras'},
    {value: 'HR', label: 'Croatia'},
    {value: 'HU', label: 'Hungary'},
    {value: 'ID', label: 'Indonesia'},
    {value: 'IE', label: 'Ireland'},
    {value: 'IL', label: 'Israel'},
    {value: 'IN', label: 'India'},
    {value: 'IQ', label: 'Iraq'},
    {value: 'IS', label: 'Iceland'},
    {value: 'IT', label: 'Italy'},
    {value: 'JM', label: 'Jamaica'},
    {value: 'JO', label: 'Jordan'},
    {value: 'JP', label: 'Japan'},
    {value: 'KR', label: 'South Korea'},
    {value: 'KW', label: 'Kuwait'},
    {value: 'LB', label: 'Lebanon'},
    {value: 'LI', label: 'Liechtenstein'},
    {value: 'LT', label: 'Lithuania'},
    {value: 'LU', label: 'Luxembourg'},
    {value: 'LV', label: 'Latvia'},
    {value: 'MC', label: 'Monaco'},
    {value: 'MD', label: 'Moldova'},
    {value: 'ME', label: 'Montenegro'},
    {value: 'MK', label: 'Macedonia'},
    {value: 'MT', label: 'Malta'},
    {value: 'MU', label: 'Mauritius'},
    {value: 'MX', label: 'Mexico'},
    {value: 'MY', label: 'Malaysia'},
    {value: 'MZ', label: 'Mozambique'},
    {value: 'NI', label: 'Nicaragua'},
    {value: 'NL', label: 'Netherlands'},
    {value: 'NO', label: 'Norway'},
    {value: 'NZ', label: 'New Zealand'},
    {value: 'OM', label: 'Oman'},
    {value: 'PA', label: 'Panama'},
    {value: 'PE', label: 'Peru'},
    {value: 'PF', label: 'French Polynesia'},
    {value: 'PH', label: 'Philippines'},
    {value: 'PK', label: 'Pakistan'},
    {value: 'PL', label: 'Poland'},
    {value: 'PS', label: 'Palestine'},
    {value: 'PT', label: 'Portugal'},
    {value: 'PY', label: 'Paraguay'},
    {value: 'QA', label: 'Qatar'},
    {value: 'RO', label: 'Romania'},
    {value: 'RS', label: 'Serbia'},
    {value: 'RU', label: 'Russia'},
    {value: 'SA', label: 'Saudi Arabia'},
    {value: 'SE', label: 'Sweden'},
    {value: 'SG', label: 'Singapore'},
    {value: 'SI', label: 'Slovenia'},
    {value: 'SK', label: 'Slovakia'},
    {value: 'SM', label: 'San Marino'},
    {value: 'SV', label: 'El Salvador'},
    {value: 'TH', label: 'Thailand'},
    {value: 'TR', label: 'Turkey'},
    {value: 'TT', label: 'Trinidad and Tobago'},
    {value: 'TW', label: 'Taiwan'},
    {value: 'UA', label: 'Ukraine'},
    {value: 'UG', label: 'Uganda'},
    {value: 'US', label: 'United States'},
    {value: 'UY', label: 'Uruguay'},
    {value: 'VE', label: 'Venezuela'},
    {value: 'YE', label: 'Yemen'},
    {value: 'ZA', label: 'South Africa'},
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