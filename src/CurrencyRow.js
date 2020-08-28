import React from 'react'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
  } = props
  return (
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <input type="number" class="form-control" value={amount} onChange={onChangeAmount}/>
        <select value={selectedCurrency} onChange={onChangeCurrency} class="form-control" searchable="Search here..">
          {/* we loop through array and set every option to one of these values (currencies) */}
          {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
