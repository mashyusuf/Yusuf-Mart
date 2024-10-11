import React from 'react'
import useAddToCart from '../../hooks/useAddToCart'

export default function MyAddToCart() {
  const [cartitem] = useAddToCart()
  return (
    <div>MyAddToCart:{cartitem.length}</div>
  )
}
