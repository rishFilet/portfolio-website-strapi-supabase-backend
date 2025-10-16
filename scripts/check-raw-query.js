/**
 * Check raw database query to see what's happening
 */

const { Strapi } = require('@strapi/strapi');

async function checkRawQuery() {
  try {
    console.log('🔍 Checking raw database query...\n');
    
    // Get the database connection
    const db = strapi.db;
    
    // Check the blog_posts table directly
    const rawPosts = await db.query('api::blog-post.blog-post').findMany({
      populate: ['postImages.mediaFiles', 'tags'],
    });
    
    console.log(`📊 Raw query returned: ${rawPosts.length} posts`);
    
    // Check for posts with same slug
    const slugCounts = {};
    rawPosts.forEach(post => {
      if (!slugCounts[post.slug]) {
        slugCounts[post.slug] = 0;
      }
      slugCounts[post.slug]++;
    });
    
    console.log('\n📋 Posts by slug (raw query):');
    Object.keys(slugCounts).forEach(slug => {
      console.log(`  "${slug}": ${slugCounts[slug]} posts`);
    });
    
    // Check for posts with same ID (shouldn't happen)
    const idCounts = {};
    rawPosts.forEach(post => {
      if (!idCounts[post.id]) {
        idCounts[post.id] = 0;
      }
      idCounts[post.id]++;
    });
    
    const duplicateIds = Object.keys(idCounts).filter(id => idCounts[id] > 1);
    if (duplicateIds.length > 0) {
      console.log('\n⚠️  DUPLICATE IDs FOUND (this shouldn't happen):');
      duplicateIds.forEach(id => {
        console.log(`  ID ${id}: ${idCounts[id]} occurrences`);
      });
    }
    
    // Check the actual database table
    console.log('\n🔍 Checking database table structure...');
    
    // This will show the actual database query
    const tableInfo = await db.connection.raw(`
      SELECT 
        COUNT(*) as total_posts,
        COUNT(DISTINCT slug) as unique_slugs,
        COUNT(DISTINCT id) as unique_ids
      FROM blog_posts
    `);
    
    console.log('Database table info:', tableInfo.rows[0]);
    
    // Check for actual duplicates in the database
    const duplicates = await db.connection.raw(`
      SELECT slug, COUNT(*) as count
      FROM blog_posts
      GROUP BY slug
      HAVING COUNT(*) > 1
      ORDER BY count DESC
    `);
    
    if (duplicates.rows.length > 0) {
      console.log('\n⚠️  ACTUAL DATABASE DUPLICATES:');
      duplicates.rows.forEach(row => {
        console.log(`  Slug "${row.slug}": ${row.count} posts`);
      });
    } else {
      console.log('\n✅ No actual database duplicates found');
    }
    
    return {
      rawPostsCount: rawPosts.length,
      uniqueSlugs: Object.keys(slugCounts).length,
      duplicateIds: duplicateIds,
      databaseDuplicates: duplicates.rows
    };
    
  } catch (error) {
    console.error('❌ Error checking raw query:', error);
    return null;
  }
}

// Run the check
checkRawQuery(); 