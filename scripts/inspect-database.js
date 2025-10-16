/**
 * Comprehensive database inspection script
 * This will show ALL blog posts in the database, including unpublished ones
 */

const { Strapi } = require('@strapi/strapi');

async function inspectDatabase() {
  try {
    console.log('🔍 Inspecting database for blog posts...\n');
    
    // Get ALL blog posts (including unpublished)
    const allPosts = await strapi.entityService.findMany('api::blog-post.blog-post', {
      populate: ['postImages.mediaFiles', 'tags'],
    });
    
    console.log(`📊 Total posts in database: ${allPosts.length}`);
    
    // Separate published and unpublished
    const publishedPosts = allPosts.filter(post => post.publishedAt);
    const unpublishedPosts = allPosts.filter(post => !post.publishedAt);
    
    console.log(`✅ Published posts: ${publishedPosts.length}`);
    console.log(`⏳ Unpublished posts: ${unpublishedPosts.length}\n`);
    
    // Group by slug
    const groupedBySlug = {};
    allPosts.forEach(post => {
      if (!groupedBySlug[post.slug]) {
        groupedBySlug[post.slug] = [];
      }
      groupedBySlug[post.slug].push(post);
    });
    
    console.log('📋 All posts by slug:');
    Object.keys(groupedBySlug).forEach(slug => {
      const posts = groupedBySlug[slug];
      console.log(`\n🔗 Slug: "${slug}" (${posts.length} posts)`);
      
      posts.forEach((post, index) => {
        console.log(`  ${index + 1}. ID: ${post.id}`);
        console.log(`     Title: "${post.title}"`);
        console.log(`     Published: ${post.publishedAt ? 'Yes' : 'No'}`);
        console.log(`     Published At: ${post.publishedAt || 'N/A'}`);
        console.log(`     Created: ${post.createdAt}`);
        console.log(`     Updated: ${post.updatedAt}`);
        console.log(`     Has Images: ${post.postImages && post.postImages.length > 0 ? 'Yes' : 'No'}`);
        console.log(`     Image Count: ${post.postImages ? post.postImages.length : 0}`);
      });
    });
    
    // Find duplicates
    const duplicates = Object.keys(groupedBySlug).filter(slug => groupedBySlug[slug].length > 1);
    
    if (duplicates.length > 0) {
      console.log('\n⚠️  DUPLICATES FOUND:');
      duplicates.forEach(slug => {
        const posts = groupedBySlug[slug];
        console.log(`\n  Slug "${slug}" has ${posts.length} posts:`);
        posts.forEach((post, index) => {
          console.log(`    ${index + 1}. ID: ${post.id} - "${post.title}" (${post.publishedAt ? 'Published' : 'Unpublished'})`);
        });
      });
    } else {
      console.log('\n✅ No duplicates found in database!');
    }
    
    // Check for posts with same title but different slugs
    const groupedByTitle = {};
    allPosts.forEach(post => {
      if (!groupedByTitle[post.title]) {
        groupedByTitle[post.title] = [];
      }
      groupedByTitle[post.title].push(post);
    });
    
    const titleDuplicates = Object.keys(groupedByTitle).filter(title => groupedByTitle[title].length > 1);
    
    if (titleDuplicates.length > 0) {
      console.log('\n⚠️  POSTS WITH SAME TITLE BUT DIFFERENT SLUGS:');
      titleDuplicates.forEach(title => {
        const posts = groupedByTitle[title];
        console.log(`\n  Title "${title}" has ${posts.length} posts:`);
        posts.forEach((post, index) => {
          console.log(`    ${index + 1}. ID: ${post.id} - Slug: "${post.slug}" (${post.publishedAt ? 'Published' : 'Unpublished'})`);
        });
      });
    }
    
    // Show unpublished posts details
    if (unpublishedPosts.length > 0) {
      console.log('\n📝 UNPUBLISHED POSTS:');
      unpublishedPosts.forEach((post, index) => {
        console.log(`  ${index + 1}. ID: ${post.id} - "${post.title}" (Slug: "${post.slug}")`);
      });
    }
    
    return {
      totalPosts: allPosts.length,
      publishedPosts: publishedPosts.length,
      unpublishedPosts: unpublishedPosts.length,
      uniqueSlugs: Object.keys(groupedBySlug).length,
      duplicates: duplicates,
      titleDuplicates: titleDuplicates
    };
    
  } catch (error) {
    console.error('❌ Error inspecting database:', error);
    return null;
  }
}

// Run the inspection
inspectDatabase(); 