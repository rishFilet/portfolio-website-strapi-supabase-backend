# Project Schema Guide

This guide explains the enhanced project schema for creating project cards and detailed content sections.

## Overview

The project schema has been enhanced to support:

- **Project Cards**: Display projects in a card format with images, summaries, and action buttons
- **Detailed Content**: Long-form content sections with markdown support
- **Flexible Links**: Configurable buttons for live demo, source code, documentation, etc.
- **Rich Metadata**: Project status, dates, difficulty, and display options

## Schema Structure

### Main Project Fields

| Field            | Type                    | Description                                         |
| ---------------- | ----------------------- | --------------------------------------------------- |
| `title`          | String (required)       | Main project title                                  |
| `slug`           | UID                     | URL-friendly identifier                             |
| `cardTitle`      | String                  | Title for project card (can differ from main title) |
| `cardSummary`    | Text                    | Brief summary for project card                      |
| `projectSummary` | Text                    | Detailed summary for project page                   |
| `featuredImage`  | Media (image)           | Main image for project card                         |
| `projectImages`  | Component (repeatable)  | Additional images for project page                  |
| `tags`           | Relation (many-to-many) | Project tags                                        |
| `technologies`   | Relation (many-to-many) | Technologies used                                   |
| `projectDetails` | Rich Text               | Main project content with markdown                  |

### Components

#### 1. Project Links (`project.project-links`)

Manages all project URLs and button configurations:

- `liveDemoUrl`: Live demo URL
- `sourceCodeUrl`: Source code repository URL
- `documentationUrl`: Documentation/case study URL
- `videoDemoUrl`: Video demo URL
- `showLiveDemo`: Toggle live demo button visibility
- `showSourceCode`: Toggle source code button visibility
- `showDocumentation`: Toggle documentation button visibility
- `showVideoDemo`: Toggle video demo button visibility
- `buttonOrder`: Button display order

#### 2. Project Metadata (`project.project-metadata`)

Manages project status and display options:

- `projectStatus`: completed, in-progress, planned, archived
- `startDate`: Project start date
- `completionDate`: Project completion date
- `isFeatured`: Mark as featured project
- `isPublic`: Public visibility toggle
- `sortOrder`: Custom sort order
- `difficulty`: beginner, intermediate, advanced, expert
- `estimatedDuration`: Time estimate (e.g., "2-3 months")
- `teamSize`: solo, small-team, large-team

#### 3. Content Sections (`project.project-content-section`)

Repeatable component for organizing long-form content:

- `sectionTitle`: Title of the content section
- `sectionContent`: Rich text content with markdown
- `sectionOrder`: Display order
- `isCollapsible`: Can be collapsed/expanded
- `isExpandedByDefault`: Default expansion state

## Content Builder Usage

### Creating a New Project

1. **Basic Information**

   - Fill in `title` and `slug` (auto-generated from title)
   - Add `cardTitle` if different from main title
   - Write `cardSummary` for the project card
   - Write `projectSummary` for the project page

2. **Media**

   - Upload `featuredImage` for the project card
   - Add additional `projectImages` as needed

3. **Relations**

   - Select `tags` and `technologies` from existing entries
   - Create new tags/technologies if needed

4. **Project Links**

   - Configure all URLs in the `projectLinks` component
   - Toggle button visibility as needed
   - Set button order preference

5. **Project Metadata**

   - Set project status and dates
   - Configure difficulty and team size
   - Set featured and public flags
   - Set sort order

6. **Content Sections**
   - Use `projectDetails` for main content
   - Add `contentSections` for additional organized content
   - Common sections include:
     - "Technical Challenges"
     - "Key Features"
     - "Technical Implementation"
     - "Lessons Learned"
     - "Development Process"
     - "Future Improvements"

### Content Section Examples

#### Technical Challenges

```
# Technical Challenges

## Performance Optimization
- Implemented lazy loading for images
- Optimized database queries
- Used CDN for static assets

## Cross-browser Compatibility
- Tested across major browsers
- Implemented polyfills where needed
- Ensured responsive design
```

#### Key Features

```
# Key Features

## User Authentication
- JWT-based authentication
- OAuth integration with Google/GitHub
- Role-based access control

## Real-time Updates
- WebSocket implementation
- Live collaboration features
- Real-time notifications
```

## API Response Structure

The enhanced schema will return data in this structure:

```json
{
  "id": 1,
  "title": "E-commerce Platform",
  "slug": "ecommerce-platform",
  "cardTitle": "E-commerce Platform",
  "cardSummary": "A full-stack e-commerce solution...",
  "projectSummary": "Detailed project description...",
  "featuredImage": {
    "url": "/uploads/featured_image.jpg",
    "formats": { ... }
  },
  "projectImages": [
    {
      "order": 1,
      "mediaFiles": [...],
      "isMain": false
    }
  ],
  "tags": [...],
  "technologies": [...],
  "projectLinks": {
    "liveDemoUrl": "https://demo.example.com",
    "sourceCodeUrl": "https://github.com/...",
    "showLiveDemo": true,
    "showSourceCode": true,
    "buttonOrder": "live-demo-first"
  },
  "projectMetadata": {
    "projectStatus": "completed",
    "isFeatured": true,
    "difficulty": "advanced",
    "sortOrder": 1
  },
  "projectDetails": "<p>Rich text content...</p>",
  "contentSections": [
    {
      "sectionTitle": "Technical Challenges",
      "sectionContent": "<h2>Performance...</h2>",
      "sectionOrder": 1,
      "isCollapsible": false,
      "isExpandedByDefault": true
    }
  ]
}
```

## Frontend Integration

### Project Cards

Use these fields for project cards:

- `cardTitle` or `title`
- `cardSummary`
- `featuredImage`
- `tags`
- `technologies`
- `projectLinks` (for buttons)

### Project Details Page

Use these fields for detailed project pages:

- `title`
- `projectSummary`
- `projectDetails`
- `contentSections`
- `projectImages`
- `projectMetadata`

## Best Practices

1. **Card Content**: Keep `cardSummary` concise (2-3 sentences)
2. **Images**: Use high-quality images for `featuredImage`
3. **Content Sections**: Use clear, descriptive section titles
4. **Links**: Always test URLs before publishing
5. **Metadata**: Keep project status and dates updated
6. **Tags**: Use consistent tag naming conventions
7. **Technologies**: Link to existing technology entries

## Migration Notes

If migrating from the old schema:

1. Existing `projectUrl` field has been moved to `projectLinks.liveDemoUrl`
2. New fields are optional and won't break existing data
3. `projectImages` component structure remains the same
4. Tags and technologies relations remain unchanged
