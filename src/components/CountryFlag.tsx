
interface CountryFlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CountryFlag({ countryCode, size = 'md', className = '' }: CountryFlagProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <img
      src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
      alt={`${countryCode} flag`}
      className={`inline-block rounded ${sizeClasses[size]} ${className}`}
    />
  );
}