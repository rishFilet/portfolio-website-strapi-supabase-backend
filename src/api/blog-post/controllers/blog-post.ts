/**
 * blog-post controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  async find(ctx) {
    console.log('Custom find method called');

    // Call the default find method
    const { data, meta } = await super.find(ctx);

    console.log(`Original data length: ${data.length}`);

    // Filter out duplicates and ensure only published posts
    const uniquePosts = data.filter((post, index, self) => {
      // Only include published posts
      if (!post.attributes.publishedAt) {
        console.log(`Filtering out unpublished post: ${post.attributes.title}`);
        return false;
      }

      // Remove duplicates based on slug
      const firstIndex = self.findIndex((p) => p.attributes.slug === post.attributes.slug);
      if (firstIndex !== index) {
        console.log(
          `Filtering out duplicate post: ${post.attributes.title} (slug: ${post.attributes.slug})`,
        );
        return false;
      }

      return true;
    });

    console.log(`Filtered data length: ${uniquePosts.length}`);

    return {
      data: uniquePosts,
      meta,
    };
  },

  async findOne(ctx) {
    console.log('Custom findOne method called');

    // Call the default findOne method
    const { data } = await super.findOne(ctx);

    // Only return if the post is published
    if (!data.attributes.publishedAt) {
      console.log(`Filtering out unpublished post: ${data.attributes.title}`);
      return ctx.notFound();
    }

    return { data };
  },
}));
