import { createContext, useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CURRENCIES, FALLBACK_RATES, STORAGE_KEY, BASE_CURRENCY, getCurrencyMeta } from './currency-config';

export const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrencyState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || BASE_CURRENCY;
    } catch {
      return BASE_CURRENCY;
    }
  });

  const setSelectedCurrency = useCallback((code) => {
    setSelectedCurrencyState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
  }, []);

  const { data: ratesData, isLoading: ratesLoading } = useQuery({
    queryKey: ['exchange-rates'],
    queryFn: async () => {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!res.ok) throw new Error('Failed to fetch rates');
      const data = await res.json();
      return data.rates;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
    placeholderData: FALLBACK_RATES,
    retry: 2,
  });

  const rates = ratesData || FALLBACK_RATES;
  const usingFallback = !ratesData || ratesData === FALLBACK_RATES;

  const convertAmount = useCallback((amountInUSD) => {
    const rate = rates[selectedCurrency] || 1;
    return amountInUSD * rate;
  }, [rates, selectedCurrency]);

  const formatPrice = useCallback((amountInUSD, opts = {}) => {
    const converted = convertAmount(amountInUSD);
    const meta = getCurrencyMeta(selectedCurrency);
    return new Intl.NumberFormat(meta.locale, {
      style: 'currency',
      currency: selectedCurrency,
      maximumFractionDigits: opts.maximumFractionDigits ?? 0,
      ...opts,
    }).format(converted);
  }, [convertAmount, selectedCurrency]);

  const formatNumber = useCallback((amountInUSD, opts = {}) => {
    const converted = convertAmount(amountInUSD);
    const meta = getCurrencyMeta(selectedCurrency);
    return new Intl.NumberFormat(meta.locale, {
      maximumFractionDigits: opts.maximumFractionDigits ?? 0,
      ...opts,
    }).format(converted);
  }, [convertAmount, selectedCurrency]);

  const currencySymbol = getCurrencyMeta(selectedCurrency).symbol;

  const value = useMemo(() => ({
    selectedCurrency,
    setSelectedCurrency,
    convertAmount,
    formatPrice,
    formatNumber,
    currencySymbol,
    currencies: CURRENCIES,
    ratesLoading,
    usingFallback,
  }), [selectedCurrency, setSelectedCurrency, convertAmount, formatPrice, formatNumber, currencySymbol, ratesLoading, usingFallback]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
