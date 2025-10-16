/**
 * Test script to check the blog posts API
 * Run this to see what data is being returned
 */

const axios = require('axios');

async function testAPI() {
  try {
    const baseURL = process.env.BASE_API_URL || 'http://localhost:1337';
    const token = process.env.STRAPI_API_TOKEN || '';
    
    console.log('Testing blog posts API...');
    console.log(`Base URL: ${baseURL}`);
    console.log(`Token provided: ${token ? 'Yes' : 'No'}`);
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    // Test the API endpoint
    const response = await axios.get(`${baseURL}/api/blog-posts?populate[0]=postImages.mediaFiles&populate[1]=tags`, {
      headers
    });
    
    console.log('\n=== API Response ===');
    console.log(`Status: ${response.status}`);
    console.log(`Total posts: ${response.data.data.length}`);
    
    // Group by slug to find duplicates
    const groupedBySlug = {};
    response.data.data.forEach(post => {
      const slug = post.attributes.slug;
      if (!groupedBySlug[slug]) {
        groupedBySlug[slug] = [];
      }
      groupedBySlug[slug].push(post);
    });
    
    console.log('\n=== Posts by Slug ===');
    Object.keys(groupedBySlug).forEach(slug => {
      const posts = groupedBySlug[slug];
      console.log(`\nSlug: ${slug}`);
      console.log(`Count: ${posts.length}`);
      
      posts.forEach((post, index) => {
        console.log(`  ${index + 1}. ID: ${post.id}`);
        console.log(`     Title: "${post.attributes.title}"`);
        console.log(`     Published: ${post.attributes.publishedAt ? 'Yes' : 'No'}`);
        console.log(`     Created: ${post.attributes.createdAt}`);
        console.log(`     Has Images: ${post.attributes.postImages && post.attributes.postImages.length > 0 ? 'Yes' : 'No'}`);
      });
    });
    
    // Check for duplicates
    const duplicates = Object.keys(groupedBySlug).filter(slug => groupedBySlug[slug].length > 1);
    
    if (duplicates.length > 0) {
      console.log('\n=== DUPLICATES FOUND ===');
      duplicates.forEach(slug => {
        console.log(`Slug "${slug}" has ${groupedBySlug[slug].length} posts`);
      });
    } else {
      console.log('\n✅ No duplicates found in API response');
    }
    
  } catch (error) {
    console.error('Error testing API:', error.response?.data || error.message);
  }
}

// Run the test
testAPI(); 