// lib/queries.js

export const productQuery = `
  *[_type == "product"] {
    productName,
    category,
    price,
    inventory,
    colors,
    status,
    "image": image.asset->url,
    
  }
`;