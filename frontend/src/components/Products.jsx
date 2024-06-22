import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import useFetchProducts from '../hooks/useFetchProducts'


const Products = () => {
  const { products, loading, error } = useFetchProducts();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

  return (
    <Container>
         <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
    </Container>
  )
}

export default Products
