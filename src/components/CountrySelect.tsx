import { countries } from '../lib/countries';
import CountryFlag from './CountryFlag';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  return (
    <div>
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
        Country
      </label>
      <div className="relative mt-1">
        <select
          id="country"
          name="country"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full bg-white border border-gray-300 rounded-md pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code} className="flex items-center gap-2">
              {country.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {value ? (
            <CountryFlag countryCode={value} size="sm" />
          ) : (
            <div className="w-4 h-4 rounded bg-gray-200" />
          )}
        </div>
      </div>
    </div>
  );
}