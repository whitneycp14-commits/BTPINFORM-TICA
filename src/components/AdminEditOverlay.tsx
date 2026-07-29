import React from 'react';
import { Pencil, Plus, Trash2, Check, X } from 'lucide-react';

interface AdminEditOverlayProps {
  key?: React.Key;
  isAdminEditing: boolean;
  onEdit: () => void;
  onDelete?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function AdminEditOverlay({
  isAdminEditing,
  onEdit,
  onDelete,
  className = '',
  children
}: AdminEditOverlayProps) {
  if (!isAdminEditing) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative group/editor border-2 border-dashed border-amber-300 hover:border-amber-500 rounded p-1.5 transition-all ${className}`}>
      {/* Edit floating badge */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1 opacity-80 group-hover/editor:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          title="Editar elemento"
          className="bg-amber-500 text-white p-1.5 rounded-full hover:bg-amber-600 transition-all shadow-md cursor-pointer flex items-center justify-center"
        >
          <Pencil size={12} />
        </button>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('¿Está seguro de que desea eliminar este elemento?')) {
                onDelete();
              }
            }}
            title="Eliminar elemento"
            className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-all shadow-md cursor-pointer flex items-center justify-center"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

interface QuickEditTextProps {
  isAdminEditing: boolean;
  value: string;
  onSave: (val: string) => void;
  className?: string;
  label?: string;
  multiline?: boolean;
}

export function QuickEditText({
  isAdminEditing,
  value,
  onSave,
  className = '',
  label = 'Texto',
  multiline = false
}: QuickEditTextProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [tempValue, setTempValue] = React.useState(value);

  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  if (!isAdminEditing) {
    return <span className={className}>{value}</span>;
  }

  if (isEditing) {
    return (
      <div className="inline-flex flex-col gap-1 w-full bg-amber-50 p-2 rounded border border-amber-300">
        <label className="text-[10px] font-bold text-amber-800 uppercase font-mono">{label}</label>
        <div className="flex gap-2 items-center">
          {multiline ? (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="flex-1 text-xs p-1.5 bg-white border border-amber-300 rounded font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="flex-1 text-xs p-1 bg-white border border-amber-300 rounded font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          )}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                onSave(tempValue);
                setIsEditing(false);
              }}
              className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Check size={12} />
            </button>
            <button
              onClick={() => {
                setTempValue(value);
                setIsEditing(false);
              }}
              className="p-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <span 
      onClick={() => setIsEditing(true)}
      title="Clic para editar texto"
      className={`cursor-pointer hover:bg-amber-100 hover:text-amber-900 border-b border-dashed border-amber-400 rounded px-1 transition-all ${className}`}
    >
      {value || <span className="italic text-gray-400 font-sans">Texto vacío...</span>}
    </span>
  );
}
