/**
 * blog-post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::blog-post.blog-post', ({ strapi }) => ({
  async find(params) {
    console.log('Custom service find method called');

    // Call the default find method
    const result = await super.find(params);

    console.log(`Original service result length: ${result.length}`);

    // Filter out unpublished posts and duplicates
    const filteredPosts = result.filter((post, index, self) => {
      // Only include published posts
      if (!post.publishedAt) {
        console.log(`Service filtering out unpublished post: ${post.title}`);
        return false;
      }

      // Remove duplicates based on slug
      const firstIndex = self.findIndex((p) => p.slug === post.slug);
      if (firstIndex !== index) {
        console.log(`Service filtering out duplicate post: ${post.title} (slug: ${post.slug})`);
        return false;
      }

      return true;
    });

    console.log(`Service filtered result length: ${filteredPosts.length}`);

    return filteredPosts;
  },

  async findOne(id, params) {
    console.log('Custom service findOne method called');

    // Call the default findOne method
    const result = await super.findOne(id, params);

    // Only return if the post is published
    if (!result.publishedAt) {
      console.log(`Service filtering out unpublished post: ${result.title}`);
      return null;
    }

    return result;
  },
}));
