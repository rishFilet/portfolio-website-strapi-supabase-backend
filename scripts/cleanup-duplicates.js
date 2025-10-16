/**
 * Script to identify and clean up duplicate blog posts
 * Run this script in your Strapi backend to find and remove duplicates
 */

const { Strapi } = require('@strapi/strapi');

async function cleanupDuplicates() {
  try {
    // Get all blog posts
    const blogPosts = await strapi.entityService.findMany('api::blog-post.blog-post', {
      populate: ['postImages', 'tags'],
    });

    console.log(`Found ${blogPosts.length} total blog posts`);

    // Group by slug to find duplicates
    const groupedBySlug = {};
    blogPosts.forEach(post => {
      if (!groupedBySlug[post.slug]) {
        groupedBySlug[post.slug] = [];
      }
      groupedBySlug[post.slug].push(post);
    });

    // Find duplicates
    const duplicates = [];
    Object.keys(groupedBySlug).forEach(slug => {
      if (groupedBySlug[slug].length > 1) {
        console.log(`\nFound ${groupedBySlug[slug].length} posts with slug: ${slug}`);
        groupedBySlug[slug].forEach((post, index) => {
          console.log(`  ${index + 1}. ID: ${post.id}, Title: "${post.title}", Published: ${post.publishedAt ? 'Yes' : 'No'}, Created: ${post.createdAt}`);
        });
        duplicates.push({
          slug,
          posts: groupedBySlug[slug]
        });
      }
    });

    if (duplicates.length === 0) {
      console.log('\n✅ No duplicates found!');
      return;
    }

    console.log(`\nFound ${duplicates.length} slugs with duplicates:`);
    
    // For each duplicate group, keep the most recent published post
    for (const duplicate of duplicates) {
      const { slug, posts } = duplicate;
      
      // Sort by publishedAt (published posts first) then by createdAt (newest first)
      const sortedPosts = posts.sort((a, b) => {
        if (a.publishedAt && !b.publishedAt) return -1;
        if (!a.publishedAt && b.publishedAt) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      // Keep the first one (most recent published, or most recent if none published)
      const keepPost = sortedPosts[0];
      const deletePosts = sortedPosts.slice(1);

      console.log(`\nKeeping post: ID ${keepPost.id} - "${keepPost.title}"`);
      console.log(`Deleting ${deletePosts.length} duplicate(s):`);
      
      for (const deletePost of deletePosts) {
        console.log(`  - ID ${deletePost.id} - "${deletePost.title}"`);
        // Uncomment the next line to actually delete the duplicates
        // await strapi.entityService.delete('api::blog-post.blog-post', deletePost.id);
      }
    }

    console.log('\n✅ Duplicate cleanup completed!');
    console.log('Note: Duplicates were identified but not deleted. Uncomment the delete line to actually remove them.');

  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

// Run the cleanup
cleanupDuplicates(); 