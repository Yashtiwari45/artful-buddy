
import React from 'react';
import { VisualArtsImage } from '@/lib/types';

interface VisualArtsGalleryProps {
  images: VisualArtsImage[];
}

const VisualArtsGallery: React.FC<VisualArtsGalleryProps> = ({ images }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium mb-4">Visual Inspirations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="bg-secondary rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary flex items-center justify-center">
              <div className="text-6xl">{image.type === 'sculpture' ? '🗿' : '🎨'}</div>
            </div>
            <div className="p-4">
              <h4 className="font-medium mb-1">{image.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{image.type.charAt(0).toUpperCase() + image.type.slice(1)}</p>
              <p className="text-sm">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-muted-foreground text-sm">
        <p>These visual examples showcase artistic techniques and concepts related to the lesson topic.</p>
      </div>
    </div>
  );
};

export default VisualArtsGallery;
