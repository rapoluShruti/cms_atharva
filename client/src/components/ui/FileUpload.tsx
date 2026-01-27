import { useState, useRef } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onFileSelect: (base64: string) => void;
  isLoading?: boolean;
}

export function FileUpload({ onFileSelect, isLoading }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <button 
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        className={cn(
          "relative group overflow-hidden rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300",
          "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25",
          "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
          isLoading && "opacity-80 cursor-not-allowed"
        )}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isLoading ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : (
          <Camera className="w-8 h-8" />
        )}
        <span className="font-semibold text-sm">Take Photo</span>
        
        {/* Hidden input for camera capture */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleChange}
          className="hidden"
        />
      </button>

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={isLoading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        />
        <div className={cn(
          "w-full h-full rounded-2xl flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300 border-2 border-dashed",
          dragActive 
            ? "border-emerald-500 bg-emerald-50" 
            : "border-emerald-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/30",
          isLoading && "opacity-50"
        )}>
          <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
            <Upload className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm text-emerald-900">Upload Image</span>
        </div>
      </div>
    </div>
  );
}
