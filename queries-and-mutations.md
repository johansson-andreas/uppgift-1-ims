# GraphQL Queries & Mutations

## Queries

```graphql
# Get all products
query {
  products {
    name
    sku
    description
    price
    category
    amountInStock
    manufacturer {
      name
      country
      website
      description
      address
      contact {
        name
        email
        phone
      }
    }
  }
}

# Get a single product by ID
query ($_id: ID!) {
  product(_id: $_id) {
    name
    sku
    description
    price
    category
    amountInStock
    manufacturer {
      name
      country
      website
      description
      address
      contact {
        name
        email
        phone
      }
    }
  }
}

# Get total stock value
query {
  totalStockValue {
    totalStockValue
  }
}

# Get total stock value by manufacturer
query {
  totalStockValueByManufacturer {
    name
    totalStockValue
  }
}

# Get products with low stock
query {
  lowStockProducts {
    name
    sku
    amountInStock
  }
}

# Get products with critical stock
query {
  criticalStockProducts {
    name
    sku
    manufacturer
    contactInfo {
      name
      email
      phone
    }
  }
}

# Get all manufacturers
query {
  manufacturers {
    name
    country
    website
    description
    address
    contact {
      name
      email
      phone
    }
  }
}

# Add a product
mutation ($input: addProductInput!) {
  addProduct(input: $input) {
    name
    sku
    description
    price
    category
    amountInStock
  }
}

# Update a product
mutation ($input: updateProductInput!) {
  updateProduct(input: $input) {
    _id
    name
    sku
    description
    price
    category
    amountInStock
  }
}

# Delete a product
mutation ($_id: ID!) {
  deleteProduct(_id: $_id)
}
```
