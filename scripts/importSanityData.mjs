import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31'
});

// Upload Image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    // Fetch the image as a buffer
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    // Upload image to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop()
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id; // Return the uploaded image reference ID
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null; // Return null if the upload fails
  }
}

// Main data migration function
async function importData() {
  try {
    console.log('Migrating data, please wait...');

    // Fetch product data from the external API
    const response = await axios.get('https://template-03-api.vercel.app/api/products');
    const products = response.data.data;
    console.log("Fetched products:", products);

    // Iterate over each product and migrate data to Sanity
    for (const product of products) {
      let imageRef = null;

      // Upload the image if it exists
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      // Create a product object for Sanity
      const sanityProduct = {
        _type: 'product',
        productName: product.productName,
        category: product.category,
        price: product.price,
        inventory: product.inventory,
        colors: product.colors || [], // Optional field, defaults to empty array
        status: product.status,
        description: product.description,
        image: imageRef ? { // Include image reference only if it exists
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,
          },
        } : undefined,
      };

      // Create the product in Sanity
      await client.create(sanityProduct);
    }

    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Error during data migration:', error);
  }
}

// Call the data import function
importData();
