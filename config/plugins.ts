export default ({ env }) => {
  // Debug what environment variables are loaded
  console.log('=== PLUGIN CONFIG DEBUG ===');
  console.log('SUPABASE_API_URL:', env('SUPABASE_API_URL'));
  console.log('SUPABASE_API_KEY first 20 chars:', env('SUPABASE_API_KEY')?.substring(0, 20));
  console.log('SUPABASE_AWS_BUCKET:', env('SUPABASE_AWS_BUCKET'));
  console.log('SUPABASE_AWS_DIRECTORY:', env('SUPABASE_AWS_DIRECTORY'));
  console.log('===========================');

  return {
    upload: {
      config: {
        provider: 'strapi-provider-upload-supabase',
        providerOptions: {
          apiUrl: env('SUPABASE_API_URL'),
          apiKey: env('SUPABASE_API_KEY'),
          bucket: env('SUPABASE_AWS_BUCKET'),
          directory: env('SUPABASE_AWS_DIRECTORY'),
        },
      },
    },
  };
};
