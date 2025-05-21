
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, X, Image } from 'lucide-react';

interface ImageUploaderProps {
  initialImage?: string;
  onImageUploaded: (imageUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ initialImage, onImageUploaded }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Create FormData object to send the file
      const formData = new FormData();
      formData.append('image', file);
      
      // Upload image to server
      console.log(localStorage.getItem('token'));
      const token1 = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token1}`,

        },
      });
      
      if (!response.ok) {
        console.log(response);
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      console.log(data);
      setImage("http://localhost:5000"+data.imageUrl);
      onImageUploaded("http://localhost:5000"+data.imageUrl);
      
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = () => {
    setImage(null);
    onImageUploaded('');
  };
  
  return (
    <div className="space-y-4">
      {image ? (
        <div className="relative">
          <img 
            src={image} 
            alt="Product" 
            className="h-40 w-full object-cover rounded-md" 
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2" 
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <Image className="h-10 w-10 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 mb-2">PNG, JPG or JPEG (max 5MB)</p>
          <div>
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
              </div>
              <input 
                id="image-upload" 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
