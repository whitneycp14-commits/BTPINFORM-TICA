import React from 'react';
import { Upload, Image as ImageIcon, X, Link as LinkIcon } from 'lucide-react';

interface ImageUploadInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helpText?: string;
}

export default function ImageUploadInput({
  value,
  onChange,
  label = "Imagen",
  placeholder = "Pegue un enlace de imagen...",
  helpText = "Soporta enlaces directos y subida de archivos (PNG, JPG, WebP)."
}: ImageUploadInputProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [previewError, setPreviewError] = React.useState(false);

  // Handle Drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Convert file to Base64
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, seleccione únicamente archivos de imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
        setPreviewError(false);
      }
    };
    reader.onerror = () => {
      alert('Hubo un error al leer el archivo.');
    };
    reader.readAsDataURL(file);
  };

  // Handle Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Handle File Input Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[10px] text-red-600 hover:text-red-800 flex items-center gap-1 font-mono font-bold uppercase transition-all"
          >
            <X size={10} /> Limpiar imagen
          </button>
        )}
      </div>

      {/* Main Drag-Drop or URL Area */}
      <div 
        className={`border-2 border-dashed rounded-xl p-4 transition-all ${
          dragActive 
            ? 'border-amber-500 bg-amber-50/50' 
            : value 
              ? 'border-gray-200 bg-gray-50/30' 
              : 'border-outline-variant hover:border-gray-400 bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {/* If an image is selected, show preview & edit info */}
        {value ? (
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0 flex items-center justify-center">
              {!previewError ? (
                <img 
                  src={value} 
                  alt="Vista previa" 
                  className="w-full h-full object-cover"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <ImageIcon size={20} className="text-gray-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">
                {value.startsWith('data:') ? 'Imagen subida localmente' : 'Imagen por enlace'}
              </p>
              <p className="text-[10px] text-gray-500 font-mono truncate">
                {value.startsWith('data:') ? `${Math.round(value.length / 1024)} KB` : value}
              </p>
              
              <div className="flex gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] text-amber-800 bg-amber-100 hover:bg-amber-200 px-2 py-1 rounded font-bold uppercase transition-colors"
                >
                  Cambiar archivo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newUrl = prompt('Pegar nueva URL de imagen:', value.startsWith('data:') ? '' : value);
                    if (newUrl !== null) {
                      onChange(newUrl.trim());
                    }
                  }}
                  className="text-[10px] text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded font-bold uppercase transition-colors"
                >
                  Cambiar por enlace
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty state: show both Link Input and File Selector */
          <div className="space-y-3">
            {/* Drag Drop Area Content */}
            <div className="flex flex-col items-center justify-center py-2 text-center">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-2 shadow-xs border border-amber-100">
                <Upload size={18} />
              </div>
              <p className="text-xs font-semibold text-gray-700">
                Arrastre una imagen aquí, o{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-amber-700 hover:underline font-bold"
                >
                  busque un archivo
                </button>
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Soporta PNG, JPG, JPEG, GIF o WebP de cualquier tamaño.</p>
            </div>

            {/* Separator */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-3 text-[9px] font-mono text-gray-400 uppercase font-bold">O ingrese enlace</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Link Input */}
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <LinkIcon size={14} />
              </span>
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <p className="text-[10px] text-on-surface-variant italic leading-normal">
        {helpText}
      </p>
    </div>
  );
}
