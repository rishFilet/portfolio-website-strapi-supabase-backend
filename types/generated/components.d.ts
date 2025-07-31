import type { Schema, Struct } from '@strapi/strapi';

export interface OrderMediaWithPriority extends Struct.ComponentSchema {
  collectionName: 'components_order_media_with_priorities';
  info: {
    description: '';
    displayName: 'mediaWithPriority';
    icon: 'picture';
  };
  attributes: {
    isMain: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    mediaFiles: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    order: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface ProjectProjectContentSection extends Struct.ComponentSchema {
  collectionName: 'components_project_project_content_sections';
  info: {
    description: 'A section of project content with title and rich text';
    displayName: 'Project Content Section';
    icon: 'file';
  };
  attributes: {
    isCollapsible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExpandedByDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sectionContent: Schema.Attribute.RichText & Schema.Attribute.Required;
    sectionOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectProjectLinks extends Struct.ComponentSchema {
  collectionName: 'components_project_project_links';
  info: {
    description: 'Links and buttons for project actions';
    displayName: 'Project Links';
    icon: 'link';
  };
  attributes: {
    buttonOrder: Schema.Attribute.Enumeration<
      ['live-demo-first', 'source-code-first', 'documentation-first']
    > &
      Schema.Attribute.DefaultTo<'live-demo-first'>;
    documentationUrl: Schema.Attribute.String;
    liveDemoUrl: Schema.Attribute.String;
    showDocumentation: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    showLiveDemo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    showSourceCode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    showVideoDemo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    sourceCodeUrl: Schema.Attribute.String;
    videoDemoUrl: Schema.Attribute.String;
  };
}

export interface ProjectProjectMetadata extends Struct.ComponentSchema {
  collectionName: 'components_project_project_metadata';
  info: {
    description: 'Project metadata including status, dates, and display options';
    displayName: 'Project Metadata';
    icon: 'information';
  };
  attributes: {
    completionDate: Schema.Attribute.Date;
    difficulty: Schema.Attribute.Enumeration<['beginner', 'intermediate', 'advanced', 'expert']>;
    estimatedDuration: Schema.Attribute.String;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    projectStatus: Schema.Attribute.Enumeration<
      ['completed', 'in-progress', 'planned', 'archived']
    > &
      Schema.Attribute.DefaultTo<'completed'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    startDate: Schema.Attribute.Date;
    teamSize: Schema.Attribute.Enumeration<['solo', 'small-team', 'large-team']> &
      Schema.Attribute.DefaultTo<'solo'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.media-with-priority': OrderMediaWithPriority;
      'project.project-content-section': ProjectProjectContentSection;
      'project.project-links': ProjectProjectLinks;
      'project.project-metadata': ProjectProjectMetadata;
    }
  }
}
