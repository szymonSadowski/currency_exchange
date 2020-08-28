// Maintainter : @ssadowsk
// Version: 1.0.0
// Production: No
// For: PWDS2020

import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow'
import './App.css';

// we set api as base_url that later we will fetch data from
const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  // Set first and second curriences at the beggining
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  // get amounts to from box and to the to box :) 
  let toAmount, fromAmount
  // if true amount in this state is from amount 
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate  || 0
  // if it's in opposite way we need to divide 
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  // fetching api only once (that is empty array), gives latest currency every time you refresh app
  useEffect(() => {
    fetch(BASE_URL)
    .then (res => res.json())
    .then(data => {
    const firstCurrency = Object.keys(data.rates)[0]
    setCurrencyOptions([data.base, ...Object.keys(data.rates)])
    setFromCurrency(data.base)
    setToCurrency(firstCurrency)
    setExchangeRate(data.rates[firstCurrency])
    })
  }, [] )
  // to exchange rate when changing curriences we need another function
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  // This allows us to create another on  change event that updates live currienies
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    // this differentiates two rows (updates from both rows)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  return (
    <>
        <h1>Convert Currency</h1>
        {/* We send to every row currencyOptions ( to populate select with currencies)  */}
        <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
        />
        <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
        />
    </>
  );
}

export default App;
