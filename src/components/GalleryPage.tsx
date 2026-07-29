import React from 'react';
import { 
  Upload, 
  Calendar, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Tag, 
  X,
  Sparkles,
  ChevronRight,
  Eye,
  Save
} from 'lucide-react';
import { GalleryItem } from '../types';
import AdminEditOverlay, { QuickEditText } from './AdminEditOverlay';
import { cleanImageUrl } from '../utils';
import ImageUploadInput from './ImageUploadInput';

interface GalleryPageProps {
  gallery: GalleryItem[];
  onUpdateGallery: (items: GalleryItem[]) => void;
  isAdminEditing: boolean;
  currentUserRole: 'admin' | 'student' | 'guest';
}

export default function GalleryPage({
  gallery,
  onUpdateGallery,
  isAdminEditing,
  currentUserRole
}: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Todos');
  const [isUploading, setIsUploading] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<GalleryItem | null>(null);
  const [viewingItem, setViewingItem] = React.useState<GalleryItem | null>(null);

  // Editable title and description state
  const [pageTitle, setPageTitle] = React.useState(() => {
    return localStorage.getItem('gallery_page_title') || 'Galería de Actividades y Proyectos';
  });
  const [pageSubtitle, setPageSubtitle] = React.useState(() => {
    return localStorage.getItem('gallery_page_subtitle') || 'Registro visual de la formación técnica, prácticas de taller y eventos de BTP en Informática.';
  });

  const saveText = (key: string, setter: (val: string) => void, val: string) => {
    localStorage.setItem(key, val);
    setter(val);
  };

  // Upload/Edit Form States
  const [formTitle, setFormTitle] = React.useState('');
  const [formCategory, setFormCategory] = React.useState<GalleryItem['category']>('Laboratorios');
  const [formDescription, setFormDescription] = React.useState('');
  const [formImageUrl, setFormImageUrl] = React.useState('');
  const [formDate, setFormDate] = React.useState('');

  const categories: string[] = ['Todos', 'Laboratorios', 'Mantenimiento', 'Redes', 'Desarrollo Web', 'Producciones Digitales', 'Eventos'];

  const filteredGallery = selectedCategory === 'Todos' 
    ? gallery 
    : gallery.filter(item => item.category === selectedCategory);

  const startUpload = () => {
    setIsUploading(true);
    setFormTitle('');
    setFormCategory('Laboratorios');
    setFormDescription('');
    setFormImageUrl('');
    setFormDate(new Date().toISOString().split('T')[0]);
  };

  const startEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormImageUrl(item.imageUrl);
    setFormDate(item.date);
  };

  const handleSaveItem = () => {
    if (!formTitle || !formDescription || !formImageUrl || !formDate) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (editingItem) {
      // Edit existing
      const updated = gallery.map(item => item.id === editingItem.id ? {
        ...item,
        title: formTitle,
        category: formCategory,
        description: formDescription,
        imageUrl: cleanImageUrl(formImageUrl),
        date: formDate
      } : item);
      onUpdateGallery(updated);
      setEditingItem(null);
    } else {
      // Add new
      const newItem: GalleryItem = {
        id: `g_${Date.now()}`,
        title: formTitle,
        category: formCategory,
        description: formDescription,
        imageUrl: cleanImageUrl(formImageUrl),
        date: formDate
      };
      onUpdateGallery([newItem, ...gallery]);
      setIsUploading(false);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    const updated = gallery.filter(item => item.id !== itemId);
    onUpdateGallery(updated);
  };

  return (
    <div className="flex-1 w-full relative">
      {/* Header Banner */}
      <header className="bg-white px-8 py-10 border-b border-outline-variant/60 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-primary flex items-center gap-2">
              <ImageIcon className="text-secondary" size={28} />
              <QuickEditText
                isAdminEditing={isAdminEditing}
                value={pageTitle}
                label="Título de la Página"
                onSave={(val) => saveText('gallery_page_title', setPageTitle, val)}
              />
            </h2>
            <p className="text-on-surface-variant text-sm font-sans mt-1">
              <QuickEditText
                isAdminEditing={isAdminEditing}
                value={pageSubtitle}
                label="Subtítulo de la Página"
                multiline={true}
                onSave={(val) => saveText('gallery_page_subtitle', setPageSubtitle, val)}
              />
            </p>
          </div>
          
          {(currentUserRole === 'admin' || isAdminEditing) && (
            <button 
              onClick={startUpload}
              className="bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-lg flex items-center gap-2 transition-all font-display font-bold text-sm shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <Upload size={16} />
              Subir Nueva Imagen
            </button>
          )}
        </div>
      </header>

      {/* Filter Tabs Bar */}
      <section className="bg-surface px-8 py-5 border-b border-outline-variant/30 sticky top-[72px] md:top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-mono font-bold text-on-surface-variant flex items-center gap-1.5 mr-3 flex-shrink-0 uppercase">
            <Tag size={12} className="text-secondary" />
            Filtros:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-primary text-white border-primary shadow-sm' 
                    : 'bg-white text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        {filteredGallery.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-outline-variant rounded-2xl p-8 max-w-md mx-auto">
            <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-sm font-bold text-primary mb-1">No hay imágenes en esta categoría</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentUserRole === 'admin' 
                ? 'Comience subiendo su primera foto técnica para mostrar en el catálogo.' 
                : 'Vuelva más tarde para ver nuevos registros de esta sección.'}
            </p>
            {(currentUserRole === 'admin' || isAdminEditing) && (
              <button 
                onClick={startUpload}
                className="mt-4 bg-primary text-white text-xs font-bold py-2 px-4 rounded-lg hover:opacity-90 inline-flex items-center gap-1.5"
              >
                <Plus size={14} />
                Subir Foto
              </button>
            )}
          </div>
        ) : (
          <div className="masonry-grid">
            {filteredGallery.map((item) => (
              <AdminEditOverlay
                key={item.id}
                isAdminEditing={isAdminEditing}
                onEdit={() => startEdit(item)}
                onDelete={() => handleDeleteItem(item.id)}
                className="masonry-item gallery-card group relative bg-white rounded-xl overflow-hidden border border-outline-variant/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div 
                  onClick={() => setViewingItem(item)}
                  className="relative overflow-hidden aspect-video bg-surface-container cursor-pointer group/img"
                >
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" 
                    alt={item.title} 
                    src={cleanImageUrl(item.imageUrl)}
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute top-3 left-3 bg-primary text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                    {item.category}
                  </div>
                  
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg border border-white/20">
                      <Eye size={18} />
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-3">
                      <h3 
                        onClick={() => setViewingItem(item)}
                        className="font-display font-bold text-base text-primary leading-tight group-hover:text-secondary hover:underline cursor-pointer"
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-on-surface-variant text-xs leading-relaxed font-sans line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-5 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-secondary" />
                      {new Date(item.date).toLocaleDateString('es-HN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <button 
                      onClick={() => setViewingItem(item)}
                      className="text-primary hover:text-secondary font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      Ampliar <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </AdminEditOverlay>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox details modal */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewingItem(null)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-white/10 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setViewingItem(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10 transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="aspect-video relative bg-black flex items-center justify-center">
              <img 
                src={cleanImageUrl(viewingItem.imageUrl)} 
                alt={viewingItem.title} 
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-mono font-bold px-3 py-1 rounded shadow-md uppercase">
                {viewingItem.category}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <h3 className="font-display font-bold text-xl text-primary">{viewingItem.title}</h3>
                <span className="font-mono text-xs text-on-surface-variant bg-surface-container-low py-1 px-3 rounded-full border border-outline-variant/35 flex items-center gap-1.5 flex-shrink-0">
                  <Calendar size={12} className="text-secondary" />
                  {new Date(viewingItem.date).toLocaleDateString('es-HN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              
              <div className="border-t border-outline-variant/40 pt-4">
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{viewingItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload/Edit Modal */}
      {(isUploading || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant">
            <div className="bg-primary text-white p-6">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <Sparkles size={20} className="text-ochre" />
                {editingItem ? 'Editar Registro de Galería' : 'Subir Nueva Imagen al Catálogo'}
              </h3>
              <p className="text-xs text-white/70 mt-1">Suministre información técnica detallada para el portafolio público.</p>
            </div>
            
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Título de la Actividad *</label>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ej. Mantenimiento Preventivo de Equipos"
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Categoría *</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as GalleryItem['category'])}
                    className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.filter(c => c !== 'Todos').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Fecha de Registro *</label>
                  <input 
                    type="date" 
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <ImageUploadInput
                  value={formImageUrl}
                  onChange={setFormImageUrl}
                  label="Imagen de la Actividad *"
                  placeholder="Pegue un enlace o suba un archivo..."
                  helpText="Soporta arrastrar imágenes o elegir archivos PNG, JPG, WebP."
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Descripción de la Actividad *</label>
                <textarea 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describa el rol de los estudiantes, los comandos/herramientas usados y el objetivo de la lección..."
                  rows={4}
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-surface-container-low p-4 border-t border-outline-variant flex justify-end gap-3">
              <button 
                onClick={() => {
                  setEditingItem(null);
                  setIsUploading(false);
                }}
                className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveItem}
                className="bg-secondary text-white px-5 py-2 text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={14} />
                Guardar Registro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
