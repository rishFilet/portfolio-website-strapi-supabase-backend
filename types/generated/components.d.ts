import type { Schema, Struct } from '@strapi/strapi';

export interface OrderMediaWithPriority extends Struct.ComponentSchema {
  collectionName: 'components_order_media_with_priorities';
  info: {
    displayName: 'mediaWithPriority';
    icon: 'picture';
  };
  attributes: {
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    priority: Schema.Attribute.Integer &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.media-with-priority': OrderMediaWithPriority;
    }
  }
}
