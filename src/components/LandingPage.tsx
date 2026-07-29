import React from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Terminal, 
  Router, 
  Mail, 
  Code, 
  Database, 
  Palette, 
  Cpu, 
  Layers, 
  Plus, 
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react';
import { Teacher } from '../types';
import AdminEditOverlay, { QuickEditText } from './AdminEditOverlay';
import { cleanImageUrl } from '../utils';
import ImageUploadInput from './ImageUploadInput';

const INITIAL_LABS = [
  {
    id: 'lab1',
    tag: 'Laboratorio 1',
    title: 'Sala de Desarrollo y Servidores',
    description: 'Equipada con terminales Linux y servidores locales de bases de datos para prácticas de programación avanzada.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV1oWqEXzv1uUff-cQ8jtVJNz_UFCXOvN4k5n1XvxhSJ10eouo-Vv4jfWkJrFQhE4FtcWXn4ZDU_phU2UZnZ2KiTZzxwEuVN5ED4W0YSMHZb_KjV9US1o_j0Oj4ozWwphQ2KhR59Z3mEpP3iqlmpssDy4LC3lx-5iDr9Qfz059xrAlzkPFgEhqf7Sl1doCT9yzN2GbVA0h94_InDOXtzcMt2M4nlK2wWDvsitVZhJvHcBXLRXXwNvxtS7-dgKOjGIrKGIDQFZuKWE',
    gridClass: 'md:col-span-2 md:row-span-2',
    heightClass: 'h-[400px]'
  },
  {
    id: 'lab2',
    tag: 'Taller',
    title: 'Prácticas de Programación',
    description: 'Prácticas avanzadas de codificación, desarrollo y depuración de software en entornos reales.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVnSU26Ls0qmA7F2OHJdhqffceRs7Z5FQH917jaLlvajA2nsl_dQ-1Cl4EqW_61a22MrqZfe2Vv7H_5iDT0Ld85lokkhJEuEi5Tmyq77ikOpWIYvcz62-oT7FZWf1mhMcQCBpG0COXNbQGQrOwyCo4QMFMFEC9v1N6FosWwp1-skxfY-3QxVjhgkef3ZUiQERHsRdOfANqzh5ySeUYHQvLE_Ne3icRJ5Yx0gqxWSp395E5tW0W3z_9pf41JLL-Rt6Gykv2AOCDfvQ',
    gridClass: '',
    heightClass: 'h-[192px]'
  },
  {
    id: 'lab3',
    tag: 'Soporte',
    title: 'Taller de Hardware y Electrónica',
    description: 'Diagnóstico físico de equipos, ensamblaje, soldadura y prácticas en microcontroladores.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBouHyBuNZ0xuRFKpuSdOvURwJawJnH7k6JSU3-cuqTerG7zVPG2EqGPyYlvrfFaglKIgRYa4zvNQCylPOlV_5f4OTvrr5Z_1CZvCGHcbQgnS_IqVS3yeqxKW8nLwMShpcdJqYdJaam9GR0-Mby1xDK26PQookcsi8Ca8Up7iWPgAvADYNj5DMs42qxZNYp0AeLxticVjJkmp0jy8_mtEATm1C5VRPKqBeEkwL6OcvSAJtNdTg2MXzFBoXyQG7Dp184OMISM6gJ038',
    gridClass: '',
    heightClass: 'h-[192px]'
  },
  {
    id: 'lab4',
    tag: 'Conferencias',
    title: 'Sala Audiovisual y Capacitaciones',
    description: 'Espacio multiuso para ferias, conferencias técnicas y clases teóricas.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjGnXFzvKWFMhjwVDx0vmqU0TY2aTVkGpATsZnrab-Nk4Y6owNv86fWHelR5dupIq59pRLOgvtYuesaS7odvzswbBFMSwVmQUDQPPXsxDARqlpp9JTCk-5o5lnxZeZ2rvYymBUyh11_PQjAU-HP_xy_JkhAEDk0ZKuUYU5noOcdBOWc9yzulDIbT-KPLtOcUjZIIwARrQfJdRqYbl1aMXvAHHIbG_Gx3gcyOgAWrsM002OKaTJ1qLftrLa3kYuO_RJwPKXkWvW3ZM',
    gridClass: 'md:col-span-2',
    heightClass: 'h-[192px]'
  }
];

interface LandingPageProps {
  teachers: Teacher[];
  onUpdateTeachers: (teachers: Teacher[]) => void;
  isAdminEditing: boolean;
  onNavigateTab: (tabId: string) => void;
}

export default function LandingPage({
  teachers,
  onUpdateTeachers,
  isAdminEditing,
  onNavigateTab
}: LandingPageProps) {
  // Local state for adding/editing a teacher
  const [editingTeacher, setEditingTeacher] = React.useState<Teacher | null>(null);
  const [isAddingTeacher, setIsAddingTeacher] = React.useState(false);

  // Form states for teacher modal
  const [formName, setFormName] = React.useState('');
  const [formSpecialty, setFormSpecialty] = React.useState('');
  const [formDescription, setFormDescription] = React.useState('');
  const [formEmail, setFormEmail] = React.useState('');
  const [formImageUrl, setFormImageUrl] = React.useState('');

  // Local state for customizable hero texts
  const [heroTitle, setHeroTitle] = React.useState(() => {
    return localStorage.getItem('hero_title') || 'Forjando el Futuro Tecnológico de Honduras';
  });
  const [heroSubtitle, setHeroSubtitle] = React.useState(() => {
    return localStorage.getItem('hero_subtitle') || 'Nuestra misión es formar profesionales técnicos integrales con competencias en desarrollo de software, soporte y redes, capaces de liderar la transformación digital en Santa Rosa de Copán.';
  });
  const [visionText, setVisionText] = React.useState(() => {
    return localStorage.getItem('vision_text') || 'Convertirnos en el referente regional de educación técnica superior, impulsando la innovación desde el occidente de Honduras hacia el mundo.';
  });

  // Customizable Hero Image State
  const [heroImageUrl, setHeroImageUrl] = React.useState(() => {
    return localStorage.getItem('hero_image_url') || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvG4OTD5JVlCDtlX4A87SQMavY9rWMnigyKVJXKOQgRc2QuwpNuw-MjreHAKhDz2Cp1QKv0egi6abSnATBgWWPDrSQD-87liIpKI-lR2yEgJZZc_rLPvq45Hl815UPScWH2Eo4Dv4L-f1LBlXLE992jcJ2QWbjNxMU3FtjkARP0cWAU8I5ZqzRh_ZqhrFNT2wuYUv2TDVhlrR5HDHeSBqePzTa0dE-BS_9cYokUfhAZYvpHumqZKOdSvUgQhHFUXUJwYOIbKmSD7E';
  });

  // Customizable Career Section States
  const [careerTitle, setCareerTitle] = React.useState(() => {
    return localStorage.getItem('career_title') || 'Sobre la Carrera';
  });
  const [careerSubtitle, setCareerSubtitle] = React.useState(() => {
    return localStorage.getItem('career_subtitle') || 'Excelencia académica y formación práctica diseñada para los retos de la industria 4.0.';
  });

  // Customizable Graduate Profile States
  const [profileTitle, setProfileTitle] = React.useState(() => {
    return localStorage.getItem('profile_title') || 'Perfil del Egresado';
  });
  const [profileDescription, setProfileDescription] = React.useState(() => {
    return localStorage.getItem('profile_description') || 'El egresado del BTP en Informática posee sólidos conocimientos en programación, análisis de sistemas, gestión de bases de datos y soporte técnico especializado, con una ética profesional inquebrantable.';
  });
  const [profileItem1, setProfileItem1] = React.useState(() => {
    return localStorage.getItem('profile_item_1') || 'Pensamiento lógico-matemático avanzado';
  });
  const [profileItem2, setProfileItem2] = React.useState(() => {
    return localStorage.getItem('profile_item_2') || 'Dominio de múltiples lenguajes de programación';
  });
  const [profileItem3, setProfileItem3] = React.useState(() => {
    return localStorage.getItem('profile_item_3') || 'Resolución de problemas de hardware y redes complejos';
  });

  // Customizable Laboral Field States
  const [fieldTitle, setFieldTitle] = React.useState(() => {
    return localStorage.getItem('field_title') || 'Campo Laboral';
  });
  const [fieldDescription, setFieldDescription] = React.useState(() => {
    return localStorage.getItem('field_description') || 'Nuestros estudiantes se insertan exitosamente en el desarrollo web, la administración de redes locales, el soporte a sistemas corporativos, el emprendimiento tecnológico y la consultoría IT a nivel nacional e internacional.';
  });
  const [fieldTags, setFieldTags] = React.useState(() => {
    return localStorage.getItem('field_tags') || '#DevOps, #SoporteTI, #Freelance';
  });

  // Customizable Software & Networks States
  const [softwareTitle, setSoftwareTitle] = React.useState(() => {
    return localStorage.getItem('software_title') || 'Software';
  });
  const [softwareDesc, setSoftwareDesc] = React.useState(() => {
    return localStorage.getItem('software_desc') || 'C++, PHP, JavaScript, SQL, HTML & CSS avanzado.';
  });
  const [networksTitle, setNetworksTitle] = React.useState(() => {
    return localStorage.getItem('networks_title') || 'Redes';
  });
  const [networksDesc, setNetworksDesc] = React.useState(() => {
    return localStorage.getItem('networks_desc') || 'Ponchado LAN, Switch, Router Cisco y Configuración de Servidores.';
  });

  // Customizable Technologies Section States
  const [techSectionTitle, setTechSectionTitle] = React.useState(() => {
    return localStorage.getItem('tech_section_title') || 'Herramientas y Tecnologías de Aprendizaje';
  });

  // Customizable Vision Section States
  const [visionTitle, setVisionTitle] = React.useState(() => {
    return localStorage.getItem('vision_title') || 'Visión y Proyección';
  });
  const [visionImageUrl, setVisionImageUrl] = React.useState(() => {
    return localStorage.getItem('vision_image_url') || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8gHvAkTxlFPx0EWPCYBGjdqXDiMGTAQJQjgtbnwxvcDRkQwpDpJZEOyEKQIvBnY3oBBNwDkGELrBCUbmI1ENAVtlgszM4IwjQQIus97zPNm_iyGheVeOAYhDSTa7rv2PxAzm44fkldUc2PJvXPWFeOcquO72enM1Qm_8jiicjVmLzc3cr7osiHsbKFPz3vkyASqSx5FGuGCI47QlNNafYl45C0tsbFZHVmWqQ95m41mZ98gbzErql22X8zcEqhmelQQwXueYswdE';
  });

  // Customizable Innovacion & Liderazgo States
  const [innovTitle, setInnovTitle] = React.useState(() => {
    return localStorage.getItem('innov_title') || 'Innovación Continua';
  });
  const [innovDesc, setInnovDesc] = React.useState(() => {
    return localStorage.getItem('innov_desc') || 'Actualización constante de laboratorios y currículos según las demandas y estándares del mercado global de software y telecomunicaciones.';
  });
  const [liderTitle, setLiderTitle] = React.useState(() => {
    return localStorage.getItem('lider_title') || 'Liderazgo Digital';
  });
  const [liderDesc, setLiderDesc] = React.useState(() => {
    return localStorage.getItem('lider_desc') || 'Empoderar a nuestros egresados con competencias lógicas y de trabajo en equipo que los conviertan en líderes del desarrollo regional.';
  });

  // Editing dialog states for images
  const [editingHeroImage, setEditingHeroImage] = React.useState(false);
  const [editingVisionImage, setEditingVisionImage] = React.useState(false);
  const [tempHeroUrl, setTempHeroUrl] = React.useState('');
  const [tempVisionUrl, setTempVisionUrl] = React.useState('');

  // Local state for laboratories/infrastructure
  const [labs, setLabs] = React.useState(() => {
    const saved = localStorage.getItem('portal_labs');
    return saved ? JSON.parse(saved) : INITIAL_LABS;
  });

  const [editingLab, setEditingLab] = React.useState<typeof INITIAL_LABS[0] | null>(null);
  const [labTag, setLabTag] = React.useState('');
  const [labTitle, setLabTitle] = React.useState('');
  const [labDesc, setLabDesc] = React.useState('');
  const [labImageUrl, setLabImageUrl] = React.useState('');

  const startEditLab = (lab: typeof INITIAL_LABS[0]) => {
    setEditingLab(lab);
    setLabTag(lab.tag);
    setLabTitle(lab.title);
    setLabDesc(lab.description);
    setLabImageUrl(lab.imageUrl);
  };

  const saveLabChanges = () => {
    if (!editingLab) return;
    const updated = labs.map((l: typeof INITIAL_LABS[0]) => l.id === editingLab.id ? {
      ...l,
      tag: labTag,
      title: labTitle,
      description: labDesc,
      imageUrl: cleanImageUrl(labImageUrl)
    } : l);
    setLabs(updated);
    localStorage.setItem('portal_labs', JSON.stringify(updated));
    setEditingLab(null);
  };

  const saveGenericText = (key: string, setter: (val: string) => void, value: string) => {
    localStorage.setItem(key, value);
    setter(value);
  };

  const saveHeroTexts = (key: string, value: string) => {
    localStorage.setItem(key, value);
    if (key === 'hero_title') setHeroTitle(value);
    if (key === 'hero_subtitle') setHeroSubtitle(value);
    if (key === 'vision_text') setVisionText(value);
  };

  const startEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormName(teacher.name);
    setFormSpecialty(teacher.specialty);
    setFormDescription(teacher.description);
    setFormEmail(teacher.email);
    setFormImageUrl(teacher.imageUrl);
  };

  const startAddTeacher = () => {
    setIsAddingTeacher(true);
    setFormName('');
    setFormSpecialty('');
    setFormDescription('');
    setFormEmail('');
    setFormImageUrl('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600');
  };

  const handleSaveTeacher = () => {
    if (!formName || !formSpecialty || !formDescription || !formEmail) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    if (editingTeacher) {
      // Update existing
      const updated = teachers.map(t => t.id === editingTeacher.id ? {
        ...t,
        name: formName,
        specialty: formSpecialty,
        description: formDescription,
        email: formEmail,
        imageUrl: cleanImageUrl(formImageUrl) || t.imageUrl
      } : t);
      onUpdateTeachers(updated);
      setEditingTeacher(null);
    } else if (isAddingTeacher) {
      // Add new
      const newTeacher: Teacher = {
        id: `t_${Date.now()}`,
        name: formName,
        specialty: formSpecialty,
        description: formDescription,
        email: formEmail,
        imageUrl: cleanImageUrl(formImageUrl) || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600'
      };
      onUpdateTeachers([...teachers, newTeacher]);
      setIsAddingTeacher(false);
    }
  };

  const handleDeleteTeacher = (teacherId: string) => {
    const filtered = teachers.filter(t => t.id !== teacherId);
    onUpdateTeachers(filtered);
  };

  return (
    <div className="flex-1 w-full relative">
      {/* Hero Section */}
      <header className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-primary bg-[radial-gradient(#003366_1px,transparent_1px)] bg-[size:20px_20px] text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600')" }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-16 w-full">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 bg-secondary text-white rounded-full text-xs font-mono tracking-wider">
              BTP en Informática 2026
            </div>
            
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl leading-tight text-white">
              {isAdminEditing ? (
                <div className="text-primary-container">
                  <QuickEditText
                    isAdminEditing={isAdminEditing}
                    value={heroTitle}
                    label="Título Hero Principal"
                    onSave={(val) => saveHeroTexts('hero_title', val)}
                  />
                </div>
              ) : (
                <>
                  Forjando el Futuro Tecnológico de Honduras
                </>
              )}
            </h1>

            <div className="font-sans text-base lg:text-lg text-white/80 max-w-xl leading-relaxed">
              {isAdminEditing ? (
                <QuickEditText
                  isAdminEditing={isAdminEditing}
                  value={heroSubtitle}
                  label="Misión / Subtítulo Hero"
                  multiline={true}
                  onSave={(val) => saveHeroTexts('hero_subtitle', val)}
                />
              ) : (
                heroSubtitle
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigateTab('oferta')}
                className="bg-secondary text-white hover:opacity-95 font-display font-bold px-8 py-4 transition-all flex items-center gap-2 rounded-lg cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                Ver Plan de Estudios
                <ArrowRight size={18} />
              </button>
              <a 
                href="#sobre-carrera"
                className="border border-white/30 text-white font-display font-bold px-8 py-4 hover:bg-white/10 transition-all rounded-lg text-center"
              >
                Conocer más
              </a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <AdminEditOverlay
              isAdminEditing={isAdminEditing}
              onEdit={() => {
                setTempHeroUrl(heroImageUrl);
                setEditingHeroImage(true);
              }}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              <img 
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Students in a computer lab" 
                src={cleanImageUrl(heroImageUrl)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            </AdminEditOverlay>
          </div>
        </div>
      </header>

      {/* Perfil Section (Bento) */}
      <section id="sobre-carrera" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display font-bold text-3xl text-primary">
              <QuickEditText
                isAdminEditing={isAdminEditing}
                value={careerTitle}
                label="Título de la Sección"
                onSave={(val) => saveGenericText('career_title', setCareerTitle, val)}
              />
            </h2>
            <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
              <QuickEditText
                isAdminEditing={isAdminEditing}
                value={careerSubtitle}
                label="Subtítulo de la Sección"
                onSave={(val) => saveGenericText('career_subtitle', setCareerSubtitle, val)}
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Bento block 1: Graduates Profile */}
            <div className="md:col-span-2 md:row-span-2 bg-primary text-white p-10 flex flex-col justify-end relative overflow-hidden rounded-2xl shadow-md border border-white/5 group">
              <div className="absolute top-6 right-6 p-2 bg-white/5 rounded-full opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal size={96} className="text-ochre" />
              </div>
              <div className="relative z-10 w-full">
                <h3 className="font-display font-bold text-2xl mb-4 text-ochre">
                  <QuickEditText
                    isAdminEditing={isAdminEditing}
                    value={profileTitle}
                    label="Título Perfil"
                    onSave={(val) => saveGenericText('profile_title', setProfileTitle, val)}
                  />
                </h3>
                <div className="font-sans text-sm opacity-90 leading-relaxed mb-6">
                  <QuickEditText
                    isAdminEditing={isAdminEditing}
                    value={profileDescription}
                    label="Descripción Perfil"
                    multiline={true}
                    onSave={(val) => saveGenericText('profile_description', setProfileDescription, val)}
                  />
                </div>
                <ul className="space-y-3 font-sans text-xs">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ochre flex-shrink-0" />
                    <span>
                      <QuickEditText
                        isAdminEditing={isAdminEditing}
                        value={profileItem1}
                        label="Viñeta 1"
                        onSave={(val) => saveGenericText('profile_item_1', setProfileItem1, val)}
                      />
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ochre flex-shrink-0" />
                    <span>
                      <QuickEditText
                        isAdminEditing={isAdminEditing}
                        value={profileItem2}
                        label="Viñeta 2"
                        onSave={(val) => saveGenericText('profile_item_2', setProfileItem2, val)}
                      />
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ochre flex-shrink-0" />
                    <span>
                      <QuickEditText
                        isAdminEditing={isAdminEditing}
                        value={profileItem3}
                        label="Viñeta 3"
                        onSave={(val) => saveGenericText('profile_item_3', setProfileItem3, val)}
                      />
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bento block 2: Career Fields */}
            <div className="md:col-span-2 bg-surface-container-low p-8 rounded-2xl border border-outline-variant/60 flex flex-col justify-between shadow-sm">
              <div className="w-full">
                <h3 className="font-display font-bold text-xl text-primary mb-3">
                  <QuickEditText
                    isAdminEditing={isAdminEditing}
                    value={fieldTitle}
                    label="Título Campo Laboral"
                    onSave={(val) => saveGenericText('field_title', setFieldTitle, val)}
                  />
                </h3>
                <div className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  <QuickEditText
                    isAdminEditing={isAdminEditing}
                    value={fieldDescription}
                    label="Descripción Campo Laboral"
                    multiline={true}
                    onSave={(val) => saveGenericText('field_description', setFieldDescription, val)}
                  />
                </div>
              </div>
              <div className="mt-6 w-full">
                {isAdminEditing && (
                  <div className="mb-2 text-xs">
                    <QuickEditText
                      isAdminEditing={isAdminEditing}
                      value={fieldTags}
                      label="Etiquetas (separadas por coma)"
                      onSave={(val) => saveGenericText('field_tags', setFieldTags, val)}
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {fieldTags.split(',').map((tag, idx) => (
                    <span key={idx} className="text-[11px] font-mono font-bold bg-primary/5 text-primary py-1 px-3 rounded border border-primary/10">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento block 3: Software category */}
            <div className="bg-surface-container-low hover:bg-secondary/10 hover:border-secondary p-8 rounded-2xl border border-outline-variant/60 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-default shadow-sm hover:-translate-y-1 w-full">
              <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center text-primary mb-4 transition-colors">
                <Terminal size={24} />
              </div>
              <span className="font-display font-bold text-lg text-primary">
                <QuickEditText
                  isAdminEditing={isAdminEditing}
                  value={softwareTitle}
                  label="Categoría Software"
                  onSave={(val) => saveGenericText('software_title', setSoftwareTitle, val)}
                />
              </span>
              <p className="text-[11px] text-on-surface-variant mt-2 w-full">
                <QuickEditText
                  isAdminEditing={isAdminEditing}
                  value={softwareDesc}
                  label="Descripción Software"
                  onSave={(val) => saveGenericText('software_desc', setSoftwareDesc, val)}
                />
              </p>
            </div>

            {/* Bento block 4: Networks category */}
            <div className="bg-surface-container-low hover:bg-secondary/10 hover:border-secondary p-8 rounded-2xl border border-outline-variant/60 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-default shadow-sm hover:-translate-y-1 w-full">
              <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center text-primary mb-4 transition-colors">
                <Router size={24} />
              </div>
              <span className="font-display font-bold text-lg text-primary">
                <QuickEditText
                  isAdminEditing={isAdminEditing}
                  value={networksTitle}
                  label="Categoría Redes"
                  onSave={(val) => saveGenericText('networks_title', setNetworksTitle, val)}
                />
              </span>
              <p className="text-[11px] text-on-surface-variant mt-2 w-full">
                <QuickEditText
                  isAdminEditing={isAdminEditing}
                  value={networksDesc}
                  label="Descripción Redes"
                  onSave={(val) => saveGenericText('networks_desc', setNetworksDesc, val)}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Docentes Section */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="font-display font-bold text-3xl text-primary">Cuerpo Docente</h2>
              <p className="font-sans text-base text-on-surface-variant mt-2">Expertos comprometidos con la enseñanza y la innovación constante.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-secondary text-white px-4 py-2 font-display text-xs font-bold rounded shadow-sm tracking-widest uppercase">
                Equipo Académico
              </span>
              {isAdminEditing && (
                <button
                  onClick={startAddTeacher}
                  className="bg-green-600 hover:bg-green-700 text-white font-display text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-md"
                >
                  <Plus size={14} />
                  Agregar Docente
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <AdminEditOverlay
                key={teacher.id}
                isAdminEditing={isAdminEditing}
                onEdit={() => startEditTeacher(teacher)}
                onDelete={() => handleDeleteTeacher(teacher.id)}
                className="bg-white border border-outline-variant/60 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative group/img grayscale hover:grayscale-0 transition-all duration-500 bg-surface-container-high flex items-center justify-center">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" 
                    alt={teacher.name} 
                    src={cleanImageUrl(teacher.imageUrl)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-xl text-primary">{teacher.name}</h4>
                    <p className="font-mono text-xs text-secondary font-bold mt-1 uppercase tracking-wider">{teacher.specialty}</p>
                    <p className="font-sans text-sm text-on-surface-variant mt-4 leading-relaxed">{teacher.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center gap-3 text-primary/70">
                    <a 
                      href={`mailto:${teacher.email}`}
                      className="p-1.5 bg-primary/5 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
                      title={`Enviar correo a ${teacher.name}`}
                    >
                      <Mail size={14} />
                      <span className="truncate max-w-[180px]">{teacher.email}</span>
                    </a>
                  </div>
                </div>
              </AdminEditOverlay>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnologías Section */}
      <section className="py-20 bg-primary overflow-hidden relative text-white">
        <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800')" }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="font-display font-bold text-2xl text-center mb-12 uppercase tracking-widest text-ochre">
            <QuickEditText
              isAdminEditing={isAdminEditing}
              value={techSectionTitle}
              label="Título de Tecnologías"
              onSave={(val) => saveGenericText('tech_section_title', setTechSectionTitle, val)}
            />
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-ochre group-hover:text-primary transition-all duration-300 border border-white/5">
                <Code size={28} />
              </div>
              <span className="font-mono text-xs font-medium">HTML5 / CSS3</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-ochre group-hover:text-primary transition-all duration-300 border border-white/5">
                <Terminal size={28} />
              </div>
              <span className="font-mono text-xs font-medium">JavaScript & C++</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-ochre group-hover:text-primary transition-all duration-300 border border-white/5">
                <Database size={28} />
              </div>
              <span className="font-mono text-xs font-medium">MySQL & PHP</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-ochre group-hover:text-primary transition-all duration-300 border border-white/5">
                <Cpu size={28} />
              </div>
              <span className="font-mono text-xs font-medium">Cisco iOS & CCNA</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-ochre group-hover:text-primary transition-all duration-300 border border-white/5">
                <Palette size={28} />
              </div>
              <span className="font-mono text-xs font-medium">Adobe Suite</span>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratorios Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl text-primary mb-12 text-center md:text-left">Infraestructura y Laboratorios</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {labs.map((lab: typeof INITIAL_LABS[0]) => (
              <AdminEditOverlay
                key={lab.id}
                isAdminEditing={isAdminEditing}
                onEdit={() => startEditLab(lab)}
                className={`overflow-hidden bg-surface-container-high rounded-2xl relative group ${lab.gridClass} ${lab.heightClass}`}
              >
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={lab.title} 
                  src={cleanImageUrl(lab.imageUrl)}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-6">
                  <div>
                    {lab.tag && (
                      <span className="bg-secondary text-white text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded mb-2 inline-block">
                        {lab.tag}
                      </span>
                    )}
                    <h4 className="text-white font-display font-bold text-lg">
                      {lab.title}
                    </h4>
                    {lab.description && (
                      <p className="text-white/80 text-xs mt-1">
                        {lab.description}
                      </p>
                    )}
                  </div>
                </div>
              </AdminEditOverlay>
            ))}
          </div>
        </div>
      </section>

      {/* Visión y Proyección Futura */}
      <section className="py-24 bg-surface-container-low border-t border-outline-variant/60">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <AdminEditOverlay
              isAdminEditing={isAdminEditing}
              onEdit={() => {
                setTempVisionUrl(visionImageUrl);
                setEditingVisionImage(true);
              }}
              className="relative p-2 bg-white shadow-xl rounded-2xl overflow-hidden border border-outline-variant/50 group cursor-pointer"
            >
              <img 
                className="w-full h-[400px] object-cover rounded-xl" 
                alt="Technology network cap" 
                src={cleanImageUrl(visionImageUrl)}
              />
            </AdminEditOverlay>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="font-display font-bold text-3xl text-primary">
              <QuickEditText
                isAdminEditing={isAdminEditing}
                value={visionTitle}
                label="Título de la Sección"
                onSave={(val) => saveGenericText('vision_title', setVisionTitle, val)}
              />
            </h2>
            
            <div className="font-sans text-lg text-primary italic border-l-4 border-ochre pl-4 py-1 leading-relaxed bg-ochre/5 rounded-r p-3 w-full">
              {isAdminEditing ? (
                <QuickEditText
                  isAdminEditing={isAdminEditing}
                  value={visionText}
                  label="Texto de la Visión"
                  multiline={true}
                  onSave={(val) => saveHeroTexts('vision_text', val)}
                />
              ) : (
                `"${visionText}"`
              )}
            </div>

            <div className="space-y-6 pt-4 w-full">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-ochre text-white rounded-lg flex items-center justify-center font-bold font-display shadow-md">
                  01
                </div>
                <div className="w-full">
                  <h4 className="font-display font-bold text-lg text-primary mb-1">
                    <QuickEditText
                      isAdminEditing={isAdminEditing}
                      value={innovTitle}
                      label="Título Viñeta 1"
                      onSave={(val) => saveGenericText('innov_title', setInnovTitle, val)}
                    />
                  </h4>
                  <div className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    <QuickEditText
                      isAdminEditing={isAdminEditing}
                      value={innovDesc}
                      label="Descripción Viñeta 1"
                      multiline={true}
                      onSave={(val) => saveGenericText('innov_desc', setInnovDesc, val)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold font-display shadow-md">
                  02
                </div>
                <div className="w-full">
                  <h4 className="font-display font-bold text-lg text-primary mb-1">
                    <QuickEditText
                      isAdminEditing={isAdminEditing}
                      value={liderTitle}
                      label="Título Viñeta 2"
                      onSave={(val) => saveGenericText('lider_title', setLiderTitle, val)}
                    />
                  </h4>
                  <div className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    <QuickEditText
                      isAdminEditing={isAdminEditing}
                      value={liderDesc}
                      label="Descripción Viñeta 2"
                      multiline={true}
                      onSave={(val) => saveGenericText('lider_desc', setLiderDesc, val)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Add/Edit Modal */}
      {(isAddingTeacher || editingTeacher) && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant">
            <div className="bg-primary text-white p-6">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <Layers size={20} className="text-ochre" />
                {editingTeacher ? 'Editar Docente' : 'Agregar Nuevo Docente'}
              </h3>
              <p className="text-xs text-white/70 mt-1">Complete los detalles para actualizar el equipo académico público.</p>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Nombre Completo *</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej. Ing. Ronald Henríquez"
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Especialidad / Cargo *</label>
                <input 
                  type="text" 
                  value={formSpecialty}
                  onChange={(e) => setFormSpecialty(e.target.value)}
                  placeholder="Ej. Especialista en Programación"
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Correo Electrónico *</label>
                <input 
                  type="email" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="Ej. docente@cemgalvarocontreras.edu.hn"
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <ImageUploadInput
                  value={formImageUrl}
                  onChange={setFormImageUrl}
                  label="Imagen del Docente *"
                  placeholder="Pegue un enlace o suba un archivo..."
                  helpText="Se recomienda una foto de perfil cuadrada o retrato (PNG, JPG, WebP)."
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Biografía / Descripción *</label>
                <textarea 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Breve trayectoria docente o materias impartidas..."
                  rows={4}
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-surface-container-low p-4 border-t border-outline-variant flex justify-end gap-3">
              <button 
                onClick={() => {
                  setEditingTeacher(null);
                  setIsAddingTeacher(false);
                }}
                className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveTeacher}
                className="bg-secondary text-white px-5 py-2 text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={14} />
                Guardar Docente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Laboratory Edit Modal */}
      {editingLab && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant">
            <div className="bg-primary text-white p-6">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <ImageIcon size={20} className="text-ochre" />
                Editar Detalle de Infraestructura
              </h3>
              <p className="text-xs text-white/70 mt-1">Actualice la información del laboratorio o taller en la pantalla de inicio.</p>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Etiqueta / Ubicación (ej: Laboratorio 1) *</label>
                <input 
                  type="text" 
                  value={labTag}
                  onChange={(e) => setLabTag(e.target.value)}
                  placeholder="Ej. Taller 2"
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Nombre / Título *</label>
                <input 
                  type="text" 
                  value={labTitle}
                  onChange={(e) => setLabTitle(e.target.value)}
                  placeholder="Ej. Taller de Hardware y Electrónica"
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <ImageUploadInput
                  value={labImageUrl}
                  onChange={setLabImageUrl}
                  label="Imagen del Laboratorio/Taller *"
                  placeholder="Pegue un enlace o suba un archivo..."
                  helpText="Se recomienda una imagen en formato horizontal aspect-video."
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase mb-1">Descripción corta (opcional)</label>
                <textarea 
                  value={labDesc}
                  onChange={(e) => setLabDesc(e.target.value)}
                  placeholder="Breve explicación de las actividades o equipamiento..."
                  rows={3}
                  className="w-full p-2.5 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-surface-container-low p-4 border-t border-outline-variant flex justify-end gap-3">
              <button 
                onClick={() => setEditingLab(null)}
                className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={saveLabChanges}
                className="bg-secondary text-white px-5 py-2 text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={14} />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Image Edit Modal */}
      {editingHeroImage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant">
            <div className="bg-primary text-white p-6">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <ImageIcon size={20} className="text-ochre" />
                Editar Imagen de Hero Principal
              </h3>
              <p className="text-xs text-white/70 mt-1">Coloque una URL de imagen válida para actualizar la fotografía principal del portal.</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <ImageUploadInput
                  value={tempHeroUrl}
                  onChange={setTempHeroUrl}
                  label="Imagen de Fondo *"
                  placeholder="Pegue un enlace o suba un archivo..."
                  helpText="Esta imagen aparecerá en la sección de inicio principal."
                />
              </div>
            </div>

            <div className="bg-surface-container-low p-4 border-t border-outline-variant flex justify-end gap-3">
              <button 
                onClick={() => setEditingHeroImage(false)}
                className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  if (tempHeroUrl.trim()) {
                    saveGenericText('hero_image_url', setHeroImageUrl, tempHeroUrl.trim());
                  }
                  setEditingHeroImage(false);
                }}
                className="bg-secondary text-white px-5 py-2 text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={14} />
                Guardar Imagen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vision Image Edit Modal */}
      {editingVisionImage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant">
            <div className="bg-primary text-white p-6">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <ImageIcon size={20} className="text-ochre" />
                Editar Imagen de Visión y Proyección
              </h3>
              <p className="text-xs text-white/70 mt-1">Coloque una URL de imagen válida para actualizar la fotografía de la sección Visión.</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <ImageUploadInput
                  value={tempVisionUrl}
                  onChange={setTempVisionUrl}
                  label="Imagen de Visión y Proyección *"
                  placeholder="Pegue un enlace o suba un archivo..."
                  helpText="Esta imagen representará la visión institucional."
                />
              </div>
            </div>

            <div className="bg-surface-container-low p-4 border-t border-outline-variant flex justify-end gap-3">
              <button 
                onClick={() => setEditingVisionImage(false)}
                className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  if (tempVisionUrl.trim()) {
                    saveGenericText('vision_image_url', setVisionImageUrl, tempVisionUrl.trim());
                  }
                  setEditingVisionImage(false);
                }}
                className="bg-secondary text-white px-5 py-2 text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={14} />
                Guardar Imagen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
