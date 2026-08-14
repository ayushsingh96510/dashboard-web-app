import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

async function testUpdate() {
  try {
    console.log('🧪 Testing update...');
    
    // Get a product first
    const getResponse = await axios.get(`${API_BASE_URL}/products/49`);
    console.log('📦 Current product:', getResponse.data);
    
    // Update the product
    const updateData = {
      ...getResponse.data,
      name: `Test Update ${Date.now()}`,
      price: 99.99,
      stock: 100
    };
    
    const putResponse = await axios.put(`${API_BASE_URL}/products/49`, updateData);
    console.log('✅ Update response:', putResponse.data);
    
    // Verify the update
    const verifyResponse = await axios.get(`${API_BASE_URL}/products/49`);
    console.log('🔍 Verified product:', verifyResponse.data);
    
    console.log('🎉 Test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testUpdate();