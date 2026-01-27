# Image Management Guide

## Adding Project Images

Project images are managed through the `projects.json` file. Each project can have multiple images that display in an interactive carousel.

### How to Add Images to a Project

1. **Edit `projects.json`**
2. Find the project you want to update
3. Add new image objects to the `images` array:

```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Name",
      "images": [
        {
          "url": "https://your-image-url.jpg",
          "caption": "Description of the image"
        },
        {
          "url": "https://another-image-url.jpg",
          "caption": "Another image description"
        }
      ]
    }
  ]
}
```

### Image URL Options

You can use:
- **External URLs** (Unsplash, Pexels, Imgur, etc.)
- **Relative paths** (if you host images locally in a folder)

Example with local images:
```json
{
  "url": "/images/project-photo.jpg",
  "caption": "My custom project photo"
}
```

### Adding Photos to the Gallery

Similar to projects, edit `photos.json` to add new photos:

```json
{
  "photos": [
    {
      "id": 1,
      "title": "Photo Title",
      "description": "Photo description",
      "imageUrl": "https://image-url.jpg",
      "date": "2026-01-15",
      "category": "nature"
    }
  ]
}
```

## Best Practices

- Use descriptive captions for project images
- Keep image URLs accessible and permanent
- For local images, organize them in an `/images` directory
- Use consistent image dimensions (landscape aspect ratio recommended)
- Optimize images for web (under 500KB per image)

## Carousel Features

The project carousel includes:
- **Previous/Next buttons** (‹ and ›)
- **Dot indicators** - click any dot to jump to that image
- **Image captions** - shown at the bottom of each image
- **Responsive design** - works on mobile and desktop
- **Smooth transitions** - 0.5s fade between images

## Mobile Optimization

All images automatically adapt to mobile screens:
- Carousel height: 300px
- Responsive layout switches from 2 columns to 1 column on small screens
- Text scales appropriately for readability
- Navigation buttons remain accessible on touch devices
