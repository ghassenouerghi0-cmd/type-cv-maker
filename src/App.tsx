import React, { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Car, 
  Plus, 
  Trash2, 
  Download, 
  Printer,
  FileText,
  Loader,
  AlertTriangle,
  Palette,
  Type,
  LayoutTemplate,
  AlignLeft,
  AlignRight,
  Columns,
  Save,
  Globe,
  Facebook
} from 'lucide-react';

// --- Types & Themes ---
type Theme = {
  id: string;
  name: string;
  sidebarHex: string; 
  sidebarBg: string; 
  primaryText: string; 
  accentText: string; 
  pillBg: string; 
  pillBorder: string; 
  iconBg: string; 
  headerBg?: string; 
};

const themes: Theme[] = [
  { 
    id: 'blue', 
    name: 'Océan Profond', 
    sidebarHex: '#0f172a', 
    sidebarBg: 'bg-slate-900', 
    headerBg: 'bg-slate-900',
    primaryText: 'text-blue-900', 
    accentText: 'text-blue-700', 
    pillBg: 'bg-blue-50', 
    pillBorder: 'border-blue-100',
    iconBg: 'bg-slate-700'
  },
  { 
    id: 'emerald', 
    name: 'Émeraude', 
    sidebarHex: '#064e3b', 
    sidebarBg: 'bg-emerald-900', 
    headerBg: 'bg-emerald-900',
    primaryText: 'text-emerald-900', 
    accentText: 'text-emerald-700', 
    pillBg: 'bg-emerald-50', 
    pillBorder: 'border-emerald-100',
    iconBg: 'bg-emerald-800'
  },
  { 
    id: 'rose', 
    name: 'Bordeaux Élégant', 
    sidebarHex: '#881337', 
    sidebarBg: 'bg-rose-900', 
    headerBg: 'bg-rose-900',
    primaryText: 'text-rose-900', 
    accentText: 'text-rose-700', 
    pillBg: 'bg-rose-50', 
    pillBorder: 'border-rose-100',
    iconBg: 'bg-rose-800'
  },
  { 
    id: 'slate', 
    name: 'Gris Graphite', 
    sidebarHex: '#1e293b', 
    sidebarBg: 'bg-slate-800', 
    headerBg: 'bg-slate-800',
    primaryText: 'text-slate-900', 
    accentText: 'text-slate-600', 
    pillBg: 'bg-gray-100', 
    pillBorder: 'border-gray-200',
    iconBg: 'bg-slate-600'
  },
  { 
    id: 'indigo', 
    name: 'Indigo Moderne', 
    sidebarHex: '#312e81', 
    sidebarBg: 'bg-indigo-900', 
    headerBg: 'bg-indigo-900',
    primaryText: 'text-indigo-900', 
    accentText: 'text-indigo-700', 
    pillBg: 'bg-indigo-50', 
    pillBorder: 'border-indigo-100',
    iconBg: 'bg-indigo-800'
  }
];

type LayoutType = 'sidebar-left' | 'sidebar-right' | 'classic';
type Lang = 'fr' | 'en';

// --- Translations ---
const t = {
  fr: {
    appTitle: "CV Maker",
    customize: "Design",
    print: "Imprimer",
    download: "PDF",
    saved: "Sauvegardé",
    tip: "Conseil : Sur mobile, faites défiler l'aperçu du bas pour voir tout le CV.",
    tabs: {
      personal: "Infos",
      profile: "Profil",
      exp: "Expérience",
      edu: "Formation",
      skills: "Compétences"
    },
    design: {
      title: "Design",
      close: "Fermer",
      layout: "Mise en page",
      modern: "Moderne",
      inverted: "Inversé",
      classic: "Classique",
      theme: "Thème",
      font: "Police",
      fontModern: "Moderne",
      fontClassic: "Classique",
      stylePro: "Style pro"
    },
    personal: {
      title: "Infos Personnelles",
      firstName: "Prénom",
      lastName: "Nom",
      jobTitle: "Titre du CV",
      phone: "Téléphone",
      address: "Adresse",
      license: "Permis",
      linkedin: "LinkedIn",
      photo: "Photo"
    },
    profile: {
      title: "Profil",
      placeholder: "Décrivez-vous en quelques lignes..."
    },
    exp: {
      title: "Expérience",
      role: "Poste",
      company: "Entreprise",
      start: "Début",
      end: "Fin",
      city: "Ville",
      desc: "Description...",
      add: "Ajouter +",
      present: "Présent"
    },
    edu: {
      title: "Formation",
      degree: "Diplôme",
      school: "École",
      year: "Année",
      city: "Ville",
      details: "Détails",
      add: "Ajouter +"
    },
    skills: {
      techTitle: "Compétences",
      techPlaceholder: "Ex: Excel...",
      addSkill: "Ajouter +",
      langTitle: "Langues",
      langName: "Langue",
      langLevel: "Niveau",
      addLang: "Ajouter +",
      hobbyTitle: "Intérêts",
      hobbyPlaceholder: "Ex: Sport...",
      addHobby: "Ajouter +"
    },
    preview: {
      contact: "Contact",
      skills: "Compétences",
      lang: "Langues",
      hobbies: "Intérêts",
      profile: "Profil",
      exp: "Expérience",
      edu: "Formation"
    },
    footer: {
      devBy: "Développé par"
    }
  },
  en: {
    appTitle: "CV Maker",
    customize: "Design",
    print: "Print",
    download: "PDF",
    saved: "Saved",
    tip: "Tip: On mobile, scroll the preview horizontally to see the full CV.",
    tabs: {
      personal: "Info",
      profile: "Profile",
      exp: "Experience",
      edu: "Education",
      skills: "Skills"
    },
    design: {
      title: "Design",
      close: "Close",
      layout: "Layout",
      modern: "Modern",
      inverted: "Inverted",
      classic: "Classic",
      theme: "Theme",
      font: "Font",
      fontModern: "Modern",
      fontClassic: "Classic",
      stylePro: "Pro Style"
    },
    personal: {
      title: "Personal Info",
      firstName: "First Name",
      lastName: "Last Name",
      jobTitle: "Job Title",
      phone: "Phone",
      address: "Address",
      license: "License",
      linkedin: "LinkedIn",
      photo: "Photo"
    },
    profile: {
      title: "Summary",
      placeholder: "Describe yourself..."
    },
    exp: {
      title: "Experience",
      role: "Role",
      company: "Company",
      start: "Start",
      end: "End",
      city: "City",
      desc: "Description...",
      add: "Add +",
      present: "Present"
    },
    edu: {
      title: "Education",
      degree: "Degree",
      school: "School",
      year: "Year",
      city: "City",
      details: "Details",
      add: "Add +"
    },
    skills: {
      techTitle: "Skills",
      techPlaceholder: "Ex: Excel...",
      addSkill: "Add +",
      langTitle: "Languages",
      langName: "Language",
      langLevel: "Level",
      addLang: "Add +",
      hobbyTitle: "Interests",
      hobbyPlaceholder: "Ex: Sports...",
      addHobby: "Add +"
    },
    preview: {
      contact: "Contact",
      skills: "Skills",
      lang: "Languages",
      hobbies: "Interests",
      profile: "Profile",
      exp: "Experience",
      edu: "Education"
    },
    footer: {
      devBy: "Developed by"
    }
  }
};

type Experience = {
  id: string;
  poste: string;
  entreprise: string;
  ville: string;
  dateDebut: string;
  dateFin: string;
  description: string;
};

type Education = {
  id: string;
  diplome: string;
  ecole: string;
  ville: string;
  annee: string;
  details: string;
};

type CVData = {
  personal: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    license: string;
    linkedin: string;
    photo: string | null;
  };
  profile: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  languages: { lang: string; level: string }[];
  hobbies: string[];
};

// --- Données Par Défaut (Génériques) ---
const initialData: CVData = {
  personal: {
    firstName: "Foulen",
    lastName: "BEN FOULEN",
    title: "TITRE DU POSTE VISÉ",
    email: "email@exemple.com",
    phone: "+216 XX XXX XXX",
    address: "Tunis, Tunisie",
    license: "Permis B",
    linkedin: "linkedin.com/in/votre-profil",
    photo: null
  },
  profile: "Ceci est un exemple de profil. Décrivez ici votre parcours, vos objectifs professionnels et vos atouts principaux. Soyez concis et percutant pour attirer l'attention du recruteur. Expliquez ce que vous pouvez apporter à l'entreprise.",
  experiences: [
    {
      id: '1',
      poste: 'Poste Actuel ou Récent',
      entreprise: 'Nom de l\'Entreprise',
      ville: 'Ville',
      dateDebut: '2023-01',
      dateFin: '',
      description: "• Décrivez vos missions principales ici.\n• Mentionnez vos réalisations concrètes (chiffres, projets).\n• Utilisez des verbes d'action pour dynamiser la lecture."
    },
    {
      id: '2',
      poste: 'Poste Précédent',
      entreprise: 'Autre Entreprise',
      ville: 'Ville',
      dateDebut: '2020-01',
      dateFin: '2022-12',
      description: "• Gestion de projet et coordination d'équipe.\n• Développement de nouvelles stratégies.\n• Résolution de problèmes complexes."
    }
  ],
  education: [
    {
      id: '1',
      diplome: 'Master / Ingéniorat / Licence',
      ecole: 'Université ou École',
      ville: 'Ville',
      annee: '2023',
      details: 'Mention ou Spécialité'
    },
    {
      id: '2',
      diplome: 'Baccalauréat',
      ecole: 'Lycée Secondaire',
      ville: 'Ville',
      annee: '2018',
      details: 'Section (Maths, Sciences, Éco...)'
    }
  ],
  skills: [
    'Compétence Clé 1',
    'Compétence Clé 2',
    'Logiciel Professionnel',
    'Langue Étrangère',
    'Esprit d\'équipe',
    'Gestion du temps'
  ],
  languages: [
    { lang: 'Arabe', level: 'Langue Maternelle' },
    { lang: 'Français', level: 'Courant' },
    { lang: 'Anglais', level: 'Intermédiaire' }
  ],
  hobbies: ['Sport', 'Vie Associative', 'Lecture', 'Voyages']
};

export default function CVMakerTunisie() {
  const [data, setData] = useState<CVData>(initialData);
  const [activeTab, setActiveTab] = useState('personal');
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [fontStyle, setFontStyle] = useState<'sans' | 'serif'>('sans');
  const [layout, setLayout] = useState<LayoutType>('sidebar-left');
  const [lang, setLang] = useState<Lang>('fr');
  const [isSaved, setIsSaved] = useState(false);
  
  const cvRef = useRef<HTMLDivElement>(null);

  // --- 1. Auto-Load from LocalStorage on Mount ---
  useEffect(() => {
    const savedData = localStorage.getItem('cv_data_v1');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Robustly merge saved data with initial data to prevent crashes
        // from old or malformed save structures.
        setData({
          ...initialData,
          ...parsed,
          skills: parsed.skills || initialData.skills,
          hobbies: parsed.hobbies || initialData.hobbies,
          languages: parsed.languages || initialData.languages,
          experiences: parsed.experiences || initialData.experiences,
          education: parsed.education || initialData.education,
        });
      } catch (e) {
        console.error("Erreur chargement sauvegarde", e);
      }
    }
    
    // Load external libs
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
       if(document.body.contains(script)) document.body.removeChild(script);
    }
  }, []);

  // --- 2. Auto-Save to LocalStorage on Change ---
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('cv_data_v1', JSON.stringify(data));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  // --- Helper: Format Date (YYYY-MM -> MMM YYYY) ---
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    if (dateString.length === 4) return dateString;
    
    try {
      const [year, month] = dateString.split('-');
      // Different months based on language
      const months = lang === 'fr' 
        ? ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      if(month && year) {
        return `${months[parseInt(month) - 1]} ${year}`;
      }
      return dateString;
    } catch (e) {
      return dateString;
    }
  };

  // --- Handlers ---
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setData(prev => ({ ...prev, personal: { ...prev.personal, photo: url } }));
    }
  };

  const addItem = <T extends { id: string }>(
    section: 'experiences' | 'education', 
    item: T
  ) => {
    setData(prev => ({ ...prev, [section]: [...prev[section], item] }));
  };

  const updateItem = (section: 'experiences' | 'education', id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeItem = (section: 'experiences' | 'education', id: string) => {
    setData(prev => ({ ...prev, [section]: prev[section].filter((item: any) => item.id !== id) }));
  };

  const handleArrayStringChange = (section: 'skills' | 'hobbies', index: number, value: string) => {
    const newArray = [...data[section]];
    newArray[index] = value;
    setData(prev => ({ ...prev, [section]: newArray }));
  };

  const addArrayString = (section: 'skills' | 'hobbies') => {
    setData(prev => ({ ...prev, [section]: [...prev[section], ''] }));
  };

  const removeArrayString = (section: 'skills' | 'hobbies', index: number) => {
    const newArray = [...data[section]];
    newArray.splice(index, 1);
    setData(prev => ({ ...prev, [section]: newArray }));
  };

  const updateLanguage = (index: number, field: 'lang' | 'level', value: string) => {
    const newLangs = [...data.languages];
    newLangs[index] = { ...newLangs[index], [field]: value };
    setData(prev => ({ ...prev, languages: newLangs }));
  };

  const addLanguage = () => {
    setData(prev => ({ ...prev, languages: [...prev.languages, { lang: '', level: '' }] }));
  };

  const removeLanguage = (index: number) => {
    const newLangs = [...data.languages];
    newLangs.splice(index, 1);
    setData(prev => ({ ...prev, languages: newLangs }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = cvRef.current;
    if (!element) return;

    if ((window as any).html2pdf) {
      setIsDownloading(true);
      const opt = {
        margin: 0,
        filename: `CV_${data.personal.firstName}_${data.personal.lastName}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      
      (window as any).html2pdf().set(opt).from(element).save().then(() => {
        setIsDownloading(false);
      }).catch((err: any) => {
        console.error(err);
        setIsDownloading(false);
        alert("Erreur lors de la génération. Essayez le bouton Imprimer.");
      });
    } else {
      alert("Le module PDF se charge... Réessayez dans 2 secondes.");
    }
  };

  // --- Sub-Components for Render ---

  const SidebarContent = () => (
    <>
      {/* Photo Area */}
      <div className="flex justify-center mb-6">
        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden flex items-center justify-center relative shadow-lg ${currentTheme.iconBg}`}>
          {data.personal.photo ? (
            <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-slate-400 font-bold">{data.personal.firstName[0]}{data.personal.lastName[0]}</span>
          )}
        </div>
      </div>

      {/* Contacts */}
      <div className="space-y-4 text-sm">
        <h3 className="text-lg font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider text-slate-200">{t[lang].preview.contact}</h3>
        
        {data.personal.phone && (
          <div className="flex items-center gap-3">
            <div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><Phone size={14} /></div>
            <span>{data.personal.phone}</span>
          </div>
        )}
        {data.personal.email && (
          <div className="flex items-center gap-3">
            <div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><Mail size={14} /></div>
            <span className="break-all text-xs">{data.personal.email}</span>
          </div>
        )}
        {data.personal.address && (
          <div className="flex items-center gap-3">
            <div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><MapPin size={14} /></div>
            <span>{data.personal.address}</span>
          </div>
        )}
        {data.personal.linkedin && (
            <div className="flex items-center gap-3">
            <div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><Linkedin size={14} /></div>
            <span className="text-xs break-all">{data.personal.linkedin}</span>
          </div>
        )}
        {data.personal.license && (
            <div className="flex items-center gap-3">
            <div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><Car size={14} /></div>
            <span>{data.personal.license}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-lg font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider text-slate-200">{t[lang].preview.skills}</h3>
          <div className="flex flex-wrap gap-2">
            {(data.skills || []).map((skill, idx) => (
              <span key={idx} className={`${currentTheme.iconBg} text-xs px-2 py-1 rounded`}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-lg font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider text-slate-200">{t[lang].preview.lang}</h3>
          <div className="space-y-2 text-sm">
            {(data.languages || []).map((lang, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-semibold">{lang.lang}</span>
                <span className="text-xs text-slate-300">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {data.hobbies?.length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-lg font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider text-slate-200">{t[lang].preview.hobbies}</h3>
          <ul className="text-sm list-disc list-inside text-slate-300">
            {(data.hobbies || []).map((hobby, idx) => (
              <li key={idx}>{hobby}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  const MainContent = () => (
    <>
      {/* Header Name */}
      <div className={`mb-8 border-b-2 ${currentTheme.primaryText} pb-4 border-opacity-20`}>
        <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 leading-tight mb-2">
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <h2 className={`text-xl font-medium ${currentTheme.accentText} tracking-wide uppercase`}>{data.personal.title}</h2>
      </div>

      {/* Profile */}
      {data.profile && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 flex items-center gap-2">
            <User className={currentTheme.accentText} size={20} /> {t[lang].preview.profile}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 text-justify">
            {data.profile}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experiences?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 flex items-center gap-2">
            <Briefcase className={currentTheme.accentText} size={20} /> {t[lang].preview.exp}
          </h3>
          <div className="space-y-6">
            {(data.experiences || []).map((exp, idx) => (
              <div key={idx} className="relative border-l-2 border-gray-200 pl-4 ml-1 break-inside-avoid">
                {/* Dot color dynamic */}
                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${currentTheme.primaryText.replace('text-', 'bg-')}`}></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-800 text-lg">{exp.poste}</h4>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border whitespace-nowrap ${currentTheme.pillBg} ${currentTheme.accentText} ${currentTheme.pillBorder}`}>
                    {formatDate(exp.dateDebut)} — {exp.dateFin ? formatDate(exp.dateFin) : t[lang].exp.present}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-600 mb-2">
                  {exp.entreprise} | {exp.ville}
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div>
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 flex items-center gap-2">
            <GraduationCap className={currentTheme.accentText} size={20} /> {t[lang].preview.edu}
          </h3>
          <div className="space-y-4">
            {(data.education || []).map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start break-inside-avoid">
                  <div>
                    <h4 className="font-bold text-gray-800">{edu.diplome}</h4>
                    <div className="text-sm text-gray-600">{edu.ecole}, {edu.ville}</div>
                    {edu.details && <div className="text-xs text-gray-500 italic mt-1">{edu.details}</div>}
                  </div>
                  <div className="text-sm font-bold text-gray-500 whitespace-nowrap">{formatDate(edu.annee)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  // Background Calculation based on layout
  let pdfBackground = `linear-gradient(to right, ${currentTheme.sidebarHex} 32%, #ffffff 32%)`;
  if (layout === 'sidebar-right') {
    pdfBackground = `linear-gradient(to left, ${currentTheme.sidebarHex} 32%, #ffffff 32%)`;
  } else if (layout === 'classic') {
    pdfBackground = '#ffffff'; // Classic uses white bg with colored header
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800">
      
      {/* Header - Fixed Top Bar */}
      <header className="bg-blue-900 text-white p-3 shadow-md print:hidden flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          <div className="flex items-center gap-2 shrink-0">
            <FileText size={20} />
            <h1 className="text-lg font-bold hidden md:block whitespace-nowrap">{t[lang].appTitle}</h1>
          </div>
          
          {/* Design Button */}
          <button 
            onClick={() => setActiveTab('design')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors border border-blue-700 hover:bg-blue-800 shrink-0 ${activeTab === 'design' ? 'bg-blue-800 ring-2 ring-blue-400' : 'bg-blue-900'}`}
          >
            <Palette size={14} />
            <span className="hidden sm:inline">{t[lang].customize}</span>
          </button>

          {/* Lang Switcher */}
          <button
            onClick={() => setLang(prev => prev === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-1 bg-blue-800 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-blue-700 transition-colors uppercase border border-blue-600 shrink-0"
          >
            <Globe size={12} /> {lang}
          </button>

          {/* Save Indicator */}
          {isSaved && (
             <span className="text-[10px] bg-green-500 text-white px-2 py-1 rounded-full animate-fade-in-out flex items-center gap-1 shrink-0">
               <Save size={10} /> <span className="hidden sm:inline">{t[lang].saved}</span>
             </span>
          )}
        </div>

        <div className="flex gap-2 shrink-0">
          <button 
            onClick={handlePrint}
            className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold text-sm hidden sm:flex"
          >
            <Printer size={16} />
            <span className="hidden md:inline">{t[lang].print}</span>
          </button>
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold shadow-sm text-xs md:text-sm ${isDownloading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isDownloading ? <Loader className="animate-spin" size={16} /> : <Download size={16} />}
            <span>{isDownloading ? '...' : t[lang].download}</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* --- LEFT COLUMN: EDITOR (No Print) --- */}
        <div className="w-full lg:w-1/3 bg-white border-r border-gray-200 overflow-y-auto h-[40vh] lg:h-[calc(100vh-64px)] print:hidden shadow-lg z-10 flex flex-col order-1 lg:order-1">
          
          <div className="p-4 bg-blue-50 border-b border-blue-100 text-xs md:text-sm text-blue-800 flex items-start gap-2">
             <AlertTriangle size={16} className="mt-0.5 shrink-0" />
             <p>{t[lang].tip}</p>
          </div>
          
          {/* Tabs Menu */}
          <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-20 flex gap-2 overflow-x-auto no-scrollbar">
            {['personal', 'profile', 'exp', 'edu', 'skills'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {/* @ts-ignore */}
                {t[lang].tabs[tab]}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* DESIGN TAB CONTENT */}
            {activeTab === 'design' && (
               <div className="space-y-6 animate-fadeIn">
                 <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <Palette size={18} /> {t[lang].design.title}
                    </h2>
                    <button onClick={() => setActiveTab('personal')} className="text-sm text-blue-600 hover:underline">{t[lang].design.close}</button>
                 </div>

                 {/* Layout Selection */}
                 <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                     <LayoutTemplate size={16} /> {t[lang].design.layout}
                   </h3>
                   <div className="grid grid-cols-3 gap-2">
                     <button
                       onClick={() => setLayout('sidebar-left')}
                       className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center gap-2 ${
                         layout === 'sidebar-left'
                         ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                         : 'border-gray-200 hover:bg-gray-50'
                       }`}
                     >
                       <AlignLeft size={24} className="text-gray-600" />
                       <span className="text-xs font-medium">{t[lang].design.modern}</span>
                     </button>
                     <button
                       onClick={() => setLayout('sidebar-right')}
                       className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center gap-2 ${
                         layout === 'sidebar-right'
                         ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                         : 'border-gray-200 hover:bg-gray-50'
                       }`}
                     >
                       <AlignRight size={24} className="text-gray-600" />
                       <span className="text-xs font-medium">{t[lang].design.inverted}</span>
                     </button>
                     <button
                       onClick={() => setLayout('classic')}
                       className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center gap-2 ${
                         layout === 'classic'
                         ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                         : 'border-gray-200 hover:bg-gray-50'
                       }`}
                     >
                       <Columns size={24} className="text-gray-600 transform rotate-90" />
                       <span className="text-xs font-medium">{t[lang].design.classic}</span>
                     </button>
                   </div>
                 </div>
                 
                 {/* Color Themes */}
                 <div className="space-y-3">
                   <h3 className="font-semibold text-gray-700">{t[lang].design.theme}</h3>
                   <div className="grid grid-cols-1 gap-3">
                     {themes.map((theme) => (
                       <button
                         key={theme.id}
                         onClick={() => setCurrentTheme(theme)}
                         className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                           currentTheme.id === theme.id 
                           ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                           : 'border-gray-200 hover:bg-gray-50'
                         }`}
                       >
                         <div 
                           className="w-10 h-10 rounded-full shadow-sm" 
                           style={{ backgroundColor: theme.sidebarHex }}
                         ></div>
                         <div className="text-left">
                           <div className="font-semibold text-gray-800">{theme.name}</div>
                           <div className="text-xs text-gray-500">{t[lang].design.stylePro}</div>
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>

                 <hr className="border-gray-200" />

                 {/* Font Selection */}
                 <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                     <Type size={16} /> {t[lang].design.font}
                   </h3>
                   <div className="grid grid-cols-2 gap-3">
                     <button
                       onClick={() => setFontStyle('sans')}
                       className={`p-3 rounded-lg border-2 text-center transition-all font-sans ${
                         fontStyle === 'sans'
                         ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                         : 'border-gray-200 hover:bg-gray-50'
                       }`}
                     >
                       <span className="text-xl font-bold block mb-1">Ag</span>
                       {t[lang].design.fontModern}
                     </button>
                     <button
                       onClick={() => setFontStyle('serif')}
                       className={`p-3 rounded-lg border-2 text-center transition-all font-serif ${
                         fontStyle === 'serif'
                         ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                         : 'border-gray-200 hover:bg-gray-50'
                       }`}
                     >
                       <span className="text-xl font-bold block mb-1">Ag</span>
                       {t[lang].design.fontClassic}
                     </button>
                   </div>
                 </div>
               </div>
            )}

            {/* PERSONAL INFO */}
            {activeTab === 'personal' && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <User size={18} /> {t[lang].personal.title}
                </h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input name="firstName" placeholder={t[lang].personal.firstName} value={data.personal.firstName} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                    <input name="lastName" placeholder={t[lang].personal.lastName} value={data.personal.lastName} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  </div>
                  <input name="title" placeholder={t[lang].personal.jobTitle} value={data.personal.title} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  <input name="email" placeholder="Email" value={data.personal.email} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  <input name="phone" placeholder={t[lang].personal.phone} value={data.personal.phone} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  <input name="address" placeholder={t[lang].personal.address} value={data.personal.address} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  <div className="grid grid-cols-2 gap-2">
                     <input name="license" placeholder={t[lang].personal.license} value={data.personal.license} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                     <input name="linkedin" placeholder={t[lang].personal.linkedin} value={data.personal.linkedin} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{t[lang].personal.photo}</label>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FileText size={18} /> {t[lang].profile.title}
                </h2>
                <textarea 
                  value={data.profile} 
                  onChange={(e) => setData(prev => ({...prev, profile: e.target.value}))}
                  rows={6}
                  placeholder={t[lang].profile.placeholder}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* EXPERIENCE */}
            {activeTab === 'exp' && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Briefcase size={18} /> {t[lang].exp.title}
                </h2>
                {data.experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-4 border rounded bg-gray-50 relative group">
                    <button onClick={() => removeItem('experiences', exp.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                    <div className="space-y-2">
                      <input placeholder={t[lang].exp.role} value={exp.poste} onChange={(e) => updateItem('experiences', exp.id, 'poste', e.target.value)} className="w-full p-1 border rounded" />
                      <input placeholder={t[lang].exp.company} value={exp.entreprise} onChange={(e) => updateItem('experiences', exp.id, 'entreprise', e.target.value)} className="w-full p-1 border rounded" />
                      <div className="grid grid-cols-2 gap-2">
                         <input type="month" placeholder={t[lang].exp.start} value={exp.dateDebut} onChange={(e) => updateItem('experiences', exp.id, 'dateDebut', e.target.value)} className="p-1 border rounded" />
                         <input placeholder={t[lang].exp.end} value={exp.dateFin} onChange={(e) => updateItem('experiences', exp.id, 'dateFin', e.target.value)} className="p-1 border rounded" />
                      </div>
                      <input placeholder={t[lang].exp.city} value={exp.ville} onChange={(e) => updateItem('experiences', exp.id, 'ville', e.target.value)} className="w-full p-1 border rounded" />
                      <textarea placeholder={t[lang].exp.desc} value={exp.description} onChange={(e) => updateItem('experiences', exp.id, 'description', e.target.value)} className="w-full p-1 border rounded h-20" />
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('experiences', { id: Date.now().toString(), poste: '', entreprise: '', ville: '', dateDebut: '', dateFin: '', description: '' })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:border-blue-500 hover:text-blue-500 flex justify-center items-center gap-2">
                  <Plus size={16} /> {t[lang].exp.add}
                </button>
              </div>
            )}

            {/* EDUCATION */}
            {activeTab === 'edu' && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <GraduationCap size={18} /> {t[lang].edu.title}
                </h2>
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 border rounded bg-gray-50 relative">
                    <button onClick={() => removeItem('education', edu.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                    <div className="space-y-2">
                      <input placeholder={t[lang].edu.degree} value={edu.diplome} onChange={(e) => updateItem('education', edu.id, 'diplome', e.target.value)} className="w-full p-1 border rounded" />
                      <input placeholder={t[lang].edu.school} value={edu.ecole} onChange={(e) => updateItem('education', edu.id, 'ecole', e.target.value)} className="w-full p-1 border rounded" />
                      <div className="grid grid-cols-2 gap-2">
                         <input placeholder={t[lang].edu.year} value={edu.annee} onChange={(e) => updateItem('education', edu.id, 'annee', e.target.value)} className="p-1 border rounded" />
                         <input placeholder={t[lang].edu.city} value={edu.ville} onChange={(e) => updateItem('education', edu.id, 'ville', e.target.value)} className="p-1 border rounded" />
                      </div>
                      <input placeholder={t[lang].edu.details} value={edu.details} onChange={(e) => updateItem('education', edu.id, 'details', e.target.value)} className="w-full p-1 border rounded" />
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('education', { id: Date.now().toString(), diplome: '', ecole: '', ville: '', annee: '', details: '' })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:border-blue-500 hover:text-blue-500 flex justify-center items-center gap-2">
                  <Plus size={16} /> {t[lang].edu.add}
                </button>
              </div>
            )}

            {/* SKILLS & OTHERS */}
            {activeTab === 'skills' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Skills */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700">{t[lang].skills.techTitle}</h3>
                  {(data.skills || []).map((skill, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={skill} onChange={(e) => handleArrayStringChange('skills', idx, e.target.value)} className="flex-1 p-2 border rounded" placeholder={t[lang].skills.techPlaceholder} />
                      <button onClick={() => removeArrayString('skills', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => addArrayString('skills')} className="text-sm text-blue-600 flex items-center gap-1 hover:underline"><Plus size={14} /> {t[lang].skills.addSkill}</button>
                </div>

                {/* Languages */}
                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-semibold text-gray-700">{t[lang].skills.langTitle}</h3>
                  {(data.languages || []).map((lang, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={lang.lang} onChange={(e) => updateLanguage(idx, 'lang', e.target.value)} className="flex-1 p-2 border rounded" placeholder={t[lang].skills.langName} />
                      <input value={lang.level} onChange={(e) => updateLanguage(idx, 'level', e.target.value)} className="flex-1 p-2 border rounded" placeholder={t[lang].skills.langLevel} />
                      <button onClick={() => removeLanguage(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={addLanguage} className="text-sm text-blue-600 flex items-center gap-1 hover:underline"><Plus size={14} /> {t[lang].skills.addLang}</button>
                </div>

                {/* Hobbies */}
                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-semibold text-gray-700">{t[lang].skills.hobbyTitle}</h3>
                  {(data.hobbies || []).map((hobby, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={hobby} onChange={(e) => handleArrayStringChange('hobbies', idx, e.target.value)} className="flex-1 p-2 border rounded" placeholder={t[lang].skills.hobbyPlaceholder} />
                      <button onClick={() => removeArrayString('hobbies', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => addArrayString('hobbies')} className="text-sm text-blue-600 flex items-center gap-1 hover:underline"><Plus size={14} /> {t[lang].skills.addHobby}</button>
                </div>

              </div>
            )}
          </div>

          {/* Credits Footer */}
          <div className="p-4 border-t text-xs text-center text-gray-500 bg-gray-50">
            <p>
              {t[lang].footer.devBy} <span className="font-semibold text-gray-700">Ghassen Ouerghi</span>
            </p>
            <a 
              href="https://www.facebook.com/ghassen.ouerghi1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Facebook size={12} /> Facebook
            </a>
          </div>

        </div>

        {/* --- RIGHT COLUMN: PREVIEW (Printable Area) --- */}
        <div className="w-full lg:w-2/3 bg-gray-500 p-4 lg:p-8 overflow-y-auto overflow-x-auto flex justify-center items-start order-2 lg:order-2">
          
          {/* THE CV PAGE - A4 Ratio - WRAPPER FOR SHADOW ONLY */}
          <div className="shadow-2xl shrink-0">
            {/* ACTUAL CONTENT FOR PDF */}
            <div 
              ref={cvRef}
              className={`w-[210mm] min-h-[297mm] flex ${layout === 'classic' ? 'flex-col' : (layout === 'sidebar-right' ? 'flex-row-reverse' : 'flex-row')} relative bg-white ${fontStyle === 'serif' ? 'font-serif' : 'font-sans'}`}
              style={{ 
                // Use gradient background to ensure sidebar color persists across multiple pages
                background: pdfBackground
              }}
            >
              
              {layout === 'classic' ? (
                // CLASSIC LAYOUT CONTENT
                <div className="w-full flex flex-col h-full min-h-[297mm]">
                  {/* Top Header */}
                  <div className={`${currentTheme.headerBg || 'bg-slate-900'} text-white p-8 text-center print:text-white print:-webkit-print-color-adjust-exact`}>
                    <div className="flex justify-center mb-4">
                      <div className={`w-32 h-32 rounded-full border-4 border-white overflow-hidden flex items-center justify-center relative shadow-lg bg-white/20`}>
                        {data.personal.photo ? (
                          <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl text-white font-bold">{data.personal.firstName[0]}{data.personal.lastName[0]}</span>
                        )}
                      </div>
                    </div>
                    <h1 className="text-4xl font-bold uppercase tracking-tight leading-tight mb-2">
                      {data.personal.firstName} {data.personal.lastName}
                    </h1>
                    <h2 className="text-xl font-medium tracking-wide uppercase opacity-90">{data.personal.title}</h2>
                    
                    {/* Horizontal Contacts */}
                    <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm opacity-90">
                       {data.personal.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={14} /> <span>{data.personal.phone}</span>
                        </div>
                      )}
                      {data.personal.email && (
                        <div className="flex items-center gap-2">
                          <Mail size={14} /> <span>{data.personal.email}</span>
                        </div>
                      )}
                       {data.personal.address && (
                        <div className="flex items-center gap-2">
                          <MapPin size={14} /> <span>{data.personal.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body Content - Single Column / Two Column Split without sidebar color */}
                  <div className="p-8 grid grid-cols-12 gap-8 text-gray-800 flex-1">
                     
                     {/* Main Left Column (Exp & Edu) */}
                     <div className="col-span-8 space-y-8">
                       {/* Profile */}
                       {data.profile && (
                        <div>
                          <h3 className={`text-xl font-bold border-b-2 ${currentTheme.primaryText} pb-2 mb-4 uppercase tracking-wider`}>{t[lang].preview.profile}</h3>
                          <p className="text-sm leading-relaxed text-gray-600 text-justify">
                            {data.profile}
                          </p>
                        </div>
                      )}

                      {/* Exp */}
                      {data.experiences?.length > 0 && (
                        <div>
                          <h3 className={`text-xl font-bold border-b-2 ${currentTheme.primaryText} pb-2 mb-4 uppercase tracking-wider`}>{t[lang].preview.exp}</h3>
                          <div className="space-y-6">
                            {(data.experiences || []).map((exp, idx) => (
                              <div key={idx} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                  <h4 className="font-bold text-gray-800 text-lg">{exp.poste}</h4>
                                  <span className="text-xs font-semibold text-gray-500 italic">
                                    {formatDate(exp.dateDebut)} — {exp.dateFin ? formatDate(exp.dateFin) : t[lang].exp.present}
                                  </span>
                                </div>
                                <div className={`text-sm font-semibold ${currentTheme.accentText} mb-2`}>
                                  {exp.entreprise}, {exp.ville}
                                </div>
                                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                                  {exp.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                       {/* Edu */}
                       {data.education?.length > 0 && (
                        <div>
                          <h3 className={`text-xl font-bold border-b-2 ${currentTheme.primaryText} pb-2 mb-4 uppercase tracking-wider`}>{t[lang].preview.edu}</h3>
                          <div className="space-y-4">
                            {(data.education || []).map((edu, idx) => (
                              <div key={idx} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline">
                                   <h4 className="font-bold text-gray-800">{edu.diplome}</h4>
                                   <span className="text-sm font-bold text-gray-500">{formatDate(edu.annee)}</span>
                                </div>
                                <div className={`text-sm ${currentTheme.accentText}`}>{edu.ecole}, {edu.ville}</div>
                                {edu.details && <div className="text-xs text-gray-500 italic mt-1">{edu.details}</div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                     </div>

                     {/* Right Side Column (Skills/Lang/Hobbies) */}
                     <div className="col-span-4 space-y-8 border-l border-gray-100 pl-8">
                        {data.skills?.length > 0 && (
                          <div>
                            <h3 className={`text-lg font-bold border-b-2 ${currentTheme.primaryText} pb-2 mb-4 uppercase tracking-wider`}>{t[lang].preview.skills}</h3>
                            <div className="flex flex-wrap gap-2">
                              {(data.skills || []).map((skill, idx) => (
                                <span key={idx} className={`bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded`}>{skill}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {data.languages?.length > 0 && (
                          <div>
                            <h3 className={`text-lg font-bold border-b-2 ${currentTheme.primaryText} pb-2 mb-4 uppercase tracking-wider`}>{t[lang].preview.lang}</h3>
                            <ul className="space-y-2 text-sm">
                              {(data.languages || []).map((lang, idx) => (
                                <li key={idx} className="flex justify-between border-b border-gray-100 pb-1 last:border-0">
                                  <span className="font-semibold">{lang.lang}</span>
                                  <span className="text-gray-500">{lang.level}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {data.hobbies?.length > 0 && (
                          <div>
                            <h3 className={`text-lg font-bold border-b-2 ${currentTheme.primaryText} pb-2 mb-4 uppercase tracking-wider`}>{t[lang].preview.hobbies}</h3>
                            <ul className="text-sm list-disc list-inside text-gray-600 space-y-1">
                              {(data.hobbies || []).map((hobby, idx) => (
                                <li key={idx}>{hobby}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                     </div>
                  </div>
                </div>
              ) : (
                // MODERN & SPLIT LAYOUTS (Default)
                <>
                  <div className="w-[32%] text-white p-6 flex flex-col gap-6 print:text-white print:-webkit-print-color-adjust-exact">
                    <SidebarContent />
                  </div>
                  <div className="w-[68%] p-8 text-gray-800">
                    <MainContent />
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for printing to ensure background colors (sidebar) appear */}
      <style>{`
        @media print {
          @page { margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          /* Hide scrollbars and UI elements */
          ::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </div>
  );
}