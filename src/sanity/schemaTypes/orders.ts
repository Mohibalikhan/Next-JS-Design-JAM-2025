// schemas/order.js

export default {
  name: 'order',
  type: 'document',
  title: 'Orders',
  fields: [
    {
      name: 'first_name',
      type: 'string',
      title: 'First Name'
    },
    {
      name: 'last_name',
      type: 'string',
      title: 'Last Name'
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address'
    },
    {
      name: 'city',
      type: 'string',
      title: 'City'
    },
    {
      name: 'zipCode',
      type: 'string',
      title: 'Zip Code'
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email'
    },
    {
      name: 'cartItems',
      type: 'array',
      title: 'Cart Items',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'productName',
            type: 'string',
            title: 'Product Name'
          },
          
          {
            
            name: 'image',
            type: 'string',
            title: 'Image'
          },
          {
            name: 'quantity',
            type: 'number',
            title: 'Quantity'
          },
          {
            name: 'price',
            type: 'number',
            title: 'Price'
          },
        ]  
      }]
    },
     {
      name: 'total',
      type: 'number',
      title: 'Total'
    },
    {
      name: 'Delivery_Status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
    },  

  ]
}