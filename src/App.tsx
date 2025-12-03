import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Facebook,
  GripVertical, 
  FileJson,
  Upload,
  Eye,       
  EyeOff,    
  Undo,      
  Redo,      
  Bold,      
  List,
  Layers,    // New: For Custom Sections
  Settings,  // New: For Sliders icon
  Minus,     // New: For removing sections
  MoveVertical // New: For spacing icon
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
    tip: "Conseil : Sur mobile, utilisez l'icône 'Œil' en haut pour voir l'aperçu.",
    actions: {
        export: "Sauvegarder (JSON)",
        import: "Charger (JSON)",
        undo: "Annuler",
        redo: "Rétablir",
        preview: "Aperçu"
    },
    tabs: {
      personal: "Infos",
      profile: "Profil",
      exp: "Expérience",
      edu: "Formation",
      skills: "Compétences",
      custom: "Sections+" // New Tab Name
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
      stylePro: "Style pro",
      size: "Taille Police",
      spacing: "Espacement"
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
    custom: { // New Translations
        addSection: "Ajouter une section",
        sectionTitle: "Titre de la section",
        itemTitle: "Titre (ex: Projet X)",
        itemSubtitle: "Sous-titre (ex: Client Y)",
        itemDate: "Date / Durée",
        addItem: "Ajouter un élément"
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
    tip: "Tip: On mobile, use the 'Eye' icon at the top to toggle preview.",
    actions: {
        export: "Save Data (JSON)",
        import: "Load Data (JSON)",
        undo: "Undo",
        redo: "Redo",
        preview: "Preview"
    },
    tabs: {
      personal: "Info",
      profile: "Profile",
      exp: "Experience",
      edu: "Education",
      skills: "Skills",
      custom: "Sections+"
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
      stylePro: "Pro Style",
      size: "Font Size",
      spacing: "Spacing"
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
    custom: {
        addSection: "Add Section",
        sectionTitle: "Section Title",
        itemTitle: "Title (e.g. Project X)",
        itemSubtitle: "Subtitle (e.g. Client Y)",
        itemDate: "Date / Duration",
        addItem: "Add Item"
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

// New Types for Custom Sections
type CustomItem = {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    description: string;
};

type CustomSection = {
    id: string;
    title: string;
    items: CustomItem[];
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
  // New Fields
  customSections: CustomSection[];
  style: {
      fontSize: number; // Scale factor (e.g., 1.0)
      spacing: number;  // Scale factor (e.g., 1.0)
  }
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
  hobbies: ['Sport', 'Vie Associative', 'Lecture', 'Voyages'],
  customSections: [],
  style: {
      fontSize: 1,
      spacing: 1
  }
};

export default function CVMakerTunisie() {
  // --- Helper: Data Sanitizer ---
  const sanitizeData = (parsed: any): CVData => {
    if (!parsed || typeof parsed !== 'object') return initialData;

    const safeStringArray = (arr: any) => 
      Array.isArray(arr) 
        ? arr.map(x => {
            if (x === null || x === undefined) return "";
            if (typeof x === 'string') return x;
            if (typeof x === 'object') return x.value || x.name || "";
            return String(x);
          }).filter(x => x !== "") 
        : [];

    const safeObjectArray = (arr: any) =>
      Array.isArray(arr) ? arr.filter(x => x && typeof x === 'object') : [];

    // Ensure style object exists
    const safeStyle = parsed.style ? {
        fontSize: typeof parsed.style.fontSize === 'number' ? parsed.style.fontSize : 1,
        spacing: typeof parsed.style.spacing === 'number' ? parsed.style.spacing : 1,
    } : initialData.style;

    return {
      ...initialData,
      ...parsed,
      personal: { ...initialData.personal, ...(parsed.personal || {}) },
      experiences: safeObjectArray(parsed.experiences || initialData.experiences),
      education: safeObjectArray(parsed.education || initialData.education),
      languages: safeObjectArray(parsed.languages || initialData.languages),
      skills: safeStringArray(parsed.skills || initialData.skills),
      hobbies: safeStringArray(parsed.hobbies || initialData.hobbies),
      customSections: safeObjectArray(parsed.customSections || []),
      style: safeStyle
    };
  };

  // --- 1. Robust Initialization ---
  const [data, setData] = useState<CVData>(() => {
    try {
      const savedData = localStorage.getItem('cv_data_v2'); 
      if (savedData) {
        return sanitizeData(JSON.parse(savedData));
      }
    } catch (e) {
      console.error("Data load error", e);
    }
    return initialData;
  });

  // --- UX States ---
  const [activeTab, setActiveTab] = useState('personal');
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [fontStyle, setFontStyle] = useState<'sans' | 'serif'>('sans');
  const [layout, setLayout] = useState<LayoutType>('sidebar-left');
  const [lang, setLang] = useState<Lang>('fr');
  const [isSaved, setIsSaved] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [history, setHistory] = useState<CVData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const cvRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  // --- Load External PDF Lib ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
       if(document.body.contains(script)) document.body.removeChild(script);
    }
  }, []);

  // --- Auto-Save ---
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        localStorage.setItem('cv_data_v2', JSON.stringify(data)); 
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  // --- UX Feature: Undo/Redo Logic ---
  useEffect(() => {
    const timer = setTimeout(() => {
        setHistory(prev => {
            const current = prev[historyIndex];
            if (JSON.stringify(current) !== JSON.stringify(data)) {
                const newHistory = prev.slice(0, historyIndex + 1);
                newHistory.push(data);
                if (newHistory.length > 20) newHistory.shift();
                setHistoryIndex(newHistory.length - 1);
                return newHistory;
            }
            return prev;
        });
    }, 800);
    return () => clearTimeout(timer);
  }, [data]);

  const handleUndo = () => {
    if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1);
        setData(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
        setHistoryIndex(prev => prev + 1);
        setData(history[historyIndex + 1]);
    }
  };

  // --- Helper: Rich Text Parser ---
  const renderRichText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
        let content = line;
        let isList = false;
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            isList = true;
            content = line.trim().substring(1).trim();
        }

        const parts = content.split(/(\*\*.*?\*\*)/g);
        const renderedLine = parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });

        if (isList) {
            return (
                <div key={i} className="flex items-start gap-2 pl-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-70" />
                    <span>{renderedLine}</span>
                </div>
            );
        }
        return <div key={i} className="min-h-[1.2em]">{renderedLine}</div>;
    });
  };

  // --- Helper: Format Date ---
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    if (dateString.length === 4) return dateString;
    try {
      const [year, month] = dateString.split('-');
      const months = lang === 'fr' 
        ? ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if(month && year) return `${months[parseInt(month) - 1]} ${year}`;
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

  const addItem = <T extends { id: string }>(section: 'experiences' | 'education', item: T) => {
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
    const safeArray = Array.isArray(data[section]) ? [...data[section]] : [];
    safeArray[index] = value;
    setData(prev => ({ ...prev, [section]: safeArray }));
  };

  const addArrayString = (section: 'skills' | 'hobbies') => {
    const safeArray = Array.isArray(data[section]) ? [...data[section]] : [];
    setData(prev => ({ ...prev, [section]: [...safeArray, ''] }));
  };

  const removeArrayString = (section: 'skills' | 'hobbies', index: number) => {
    const safeArray = Array.isArray(data[section]) ? [...data[section]] : [];
    safeArray.splice(index, 1);
    setData(prev => ({ ...prev, [section]: safeArray }));
  };

  const updateLanguage = (index: number, field: 'lang' | 'level', value: string) => {
    const newLangs = [...(data.languages || [])];
    if (newLangs[index]) {
      newLangs[index] = { ...newLangs[index], [field]: value };
      setData(prev => ({ ...prev, languages: newLangs }));
    }
  };

  const addLanguage = () => {
    setData(prev => ({ ...prev, languages: [...(prev.languages || []), { lang: '', level: '' }] }));
  };

  const removeLanguage = (index: number) => {
    const newLangs = [...(data.languages || [])];
    newLangs.splice(index, 1);
    setData(prev => ({ ...prev, languages: newLangs }));
  };

  // --- Handlers for Custom Sections ---
  const addCustomSection = () => {
      const newSection: CustomSection = {
          id: Date.now().toString(),
          title: "Nouvelle Section",
          items: []
      };
      setData(prev => ({ ...prev, customSections: [...prev.customSections, newSection] }));
  };

  const removeCustomSection = (id: string) => {
      setData(prev => ({ ...prev, customSections: prev.customSections.filter(s => s.id !== id) }));
  };

  const updateCustomSectionTitle = (id: string, newTitle: string) => {
      setData(prev => ({
          ...prev,
          customSections: prev.customSections.map(s => s.id === id ? { ...s, title: newTitle } : s)
      }));
  };

  const addCustomItem = (sectionId: string) => {
      const newItem: CustomItem = {
          id: Date.now().toString(),
          title: "",
          subtitle: "",
          date: "",
          description: ""
      };
      setData(prev => ({
          ...prev,
          customSections: prev.customSections.map(s => s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s)
      }));
  };

  const updateCustomItem = (sectionId: string, itemId: string, field: keyof CustomItem, value: string) => {
      setData(prev => ({
          ...prev,
          customSections: prev.customSections.map(s => 
              s.id === sectionId 
              ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) }
              : s
          )
      }));
  };

  const removeCustomItem = (sectionId: string, itemId: string) => {
      setData(prev => ({
          ...prev,
          customSections: prev.customSections.map(s => 
              s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s
          )
      }));
  };

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `CV_Data_${data.personal.firstName}_${data.personal.lastName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const cleanData = sanitizeData(parsed);
        setData(cleanData);
        alert("Données chargées avec succès !");
      } catch (err) {
        alert("Erreur lors de la lecture du fichier JSON.");
        console.error(err);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
    dragItem.current = index;
  };

  const onDragEnter = (e: React.DragEvent, index: number) => {
    dragOverItem.current = index;
  };

  const onDragEnd = (section: 'experiences' | 'education') => {
    const _items = [...data[section]];
    const dragIndex = dragItem.current;
    const dragOverIndex = dragOverItem.current;

    if (dragIndex === null || dragOverIndex === null || dragIndex === dragOverIndex) {
        dragItem.current = null;
        dragOverItem.current = null;
        return;
    }

    const draggedItemContent = _items.splice(dragIndex, 1)[0];
    _items.splice(dragOverIndex, 0, draggedItemContent);

    setData(prev => ({ ...prev, [section]: _items }));
    
    dragItem.current = null;
    dragOverItem.current = null;
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

  // --- Sub-Components ---

  const RichTextArea = ({ 
    value, 
    onChange, 
    placeholder, 
    rows = 4 
  }: { 
    value: string, 
    onChange: (val: string) => void, 
    placeholder?: string,
    rows?: number
  }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const insertText = (before: string, after: string = '') => {
        const el = textAreaRef.current;
        if (!el) return;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const text = el.value;
        const newText = text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end);
        onChange(newText);
        setTimeout(() => {
            el.focus();
            el.selectionStart = start + before.length;
            el.selectionEnd = end + before.length;
        }, 0);
    };

    return (
        <div className="border rounded focus-within:ring-2 focus-within:ring-blue-500 bg-white">
            <div className="flex items-center gap-1 border-b bg-gray-50 p-1">
                <button onClick={() => insertText('**', '**')} title="Gras" className="p-1 hover:bg-gray-200 rounded text-gray-600"><Bold size={14} /></button>
                <button onClick={() => insertText('• ')} title="Liste à puces" className="p-1 hover:bg-gray-200 rounded text-gray-600"><List size={14} /></button>
            </div>
            <textarea
                ref={textAreaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full p-2 outline-none resize-none bg-transparent"
            />
        </div>
    );
  };

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><Loader className="animate-spin text-blue-600" size={32} /></div>;

  const translations = t[lang] || t['en'];

  // Style Scaling for Preview
  // We use CSS variables to handle the scaling cleanly
  const previewStyle = {
      '--scale-factor': data.style.fontSize,
      '--spacing-factor': data.style.spacing,
  } as React.CSSProperties;

  const SidebarContent = () => (
    <>
      <div className="flex justify-center mb-6">
        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden flex items-center justify-center relative shadow-lg ${currentTheme.iconBg}`}>
          {data.personal.photo ? (
            <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-slate-400 font-bold">
              {(data.personal.firstName || ' ')[0]}{(data.personal.lastName || ' ')[0]}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 text-sm" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
        <h3 className="text-lg font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider text-slate-200">{translations.preview.contact}</h3>
        {data.personal.phone && <div className="flex items-center gap-3"><div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><Phone size={14} /></div><span>{data.personal.phone}</span></div>}
        {data.personal.email && <div className="flex items-center gap-3"><div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><Mail size={14} /></div><span className="break-all text-xs">{data.personal.email}</span></div>}
        {data.personal.address && <div className="flex items-center gap-3"><div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><MapPin size={14} /></div><span>{data.personal.address}</span></div>}
        {data.personal.linkedin && <div className="flex items-center gap-3"><div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><Linkedin size={14} /></div><span className="text-xs break-all">{data.personal.linkedin}</span></div>}
        {data.personal.license && <div className="flex items-center gap-3"><div className={`${currentTheme.iconBg} p-2 rounded-full shrink-0`}><Car size={14} /></div><span>{data.personal.license}</span></div>}
      </div>

      {(data.skills || []).length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-lg font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider text-slate-200">{translations.preview.skills}</h3>
          <div className="flex flex-wrap gap-2">
            {(data.skills || []).map((skill, idx) => (
              <span key={idx} className={`${currentTheme.iconBg} text-xs px-2 py-1 rounded`} style={{ fontSize: 'calc(0.75rem * var(--scale-factor))' }}>
                {typeof skill === 'string' ? skill : String(skill)}
              </span>
            ))}
          </div>
        </div>
      )}

      {(data.languages || []).length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-lg font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider text-slate-200">{translations.preview.lang}</h3>
          <div className="space-y-2 text-sm" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
            {(data.languages || []).map((lang, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-semibold">{lang?.lang || ''}</span>
                <span className="text-xs text-slate-300">{lang?.level || ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(data.hobbies || []).length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-lg font-bold border-b border-white/20 pb-1 mb-2 uppercase tracking-wider text-slate-200">{translations.preview.hobbies}</h3>
          <ul className="text-sm list-disc list-inside text-slate-300" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
            {(data.hobbies || []).map((hobby, idx) => (
              <li key={idx}>
                {typeof hobby === 'string' ? hobby : String(hobby)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  const MainContent = () => (
    <>
      <div className={`mb-8 border-b-2 ${currentTheme.primaryText} pb-4 border-opacity-20`} style={{ marginBottom: 'calc(2rem * var(--spacing-factor))' }}>
        <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 leading-tight mb-2" style={{ fontSize: 'calc(2.25rem * var(--scale-factor))' }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <h2 className={`text-xl font-medium ${currentTheme.accentText} tracking-wide uppercase`} style={{ fontSize: 'calc(1.25rem * var(--scale-factor))' }}>{data.personal.title}</h2>
      </div>

      {data.profile && (
        <div className="mb-8" style={{ marginBottom: 'calc(2rem * var(--spacing-factor))' }}>
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 flex items-center gap-2" style={{ fontSize: 'calc(1.125rem * var(--scale-factor))' }}>
            <User className={currentTheme.accentText} size={20} /> {translations.preview.profile}
          </h3>
          <div className="text-sm leading-relaxed text-gray-600 text-justify" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
            {renderRichText(data.profile)}
          </div>
        </div>
      )}

      {(data.experiences || []).length > 0 && (
        <div className="mb-8" style={{ marginBottom: 'calc(2rem * var(--spacing-factor))' }}>
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 flex items-center gap-2" style={{ fontSize: 'calc(1.125rem * var(--scale-factor))' }}>
            <Briefcase className={currentTheme.accentText} size={20} /> {translations.preview.exp}
          </h3>
          <div className="space-y-6" style={{ gap: 'calc(1.5rem * var(--spacing-factor))' }}>
            {(data.experiences || []).map((exp, idx) => (
              <div key={idx} className="relative border-l-2 border-gray-200 pl-4 ml-1 break-inside-avoid">
                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${currentTheme.primaryText.replace('text-', 'bg-')}`}></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-800 text-lg" style={{ fontSize: 'calc(1.125rem * var(--scale-factor))' }}>{exp.poste}</h4>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border whitespace-nowrap ${currentTheme.pillBg} ${currentTheme.accentText} ${currentTheme.pillBorder}`} style={{ fontSize: 'calc(0.75rem * var(--scale-factor))' }}>
                    {formatDate(exp.dateDebut)} — {exp.dateFin ? formatDate(exp.dateFin) : translations.exp.present}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-600 mb-2" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
                  {exp.entreprise} | {exp.ville}
                </div>
                <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
                  {renderRichText(exp.description)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(data.education || []).length > 0 && (
        <div style={{ marginBottom: 'calc(2rem * var(--spacing-factor))' }}>
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 flex items-center gap-2" style={{ fontSize: 'calc(1.125rem * var(--scale-factor))' }}>
            <GraduationCap className={currentTheme.accentText} size={20} /> {translations.preview.edu}
          </h3>
          <div className="space-y-4" style={{ gap: 'calc(1rem * var(--spacing-factor))' }}>
            {(data.education || []).map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start break-inside-avoid">
                  <div>
                    <h4 className="font-bold text-gray-800" style={{ fontSize: 'calc(1rem * var(--scale-factor))' }}>{edu.diplome}</h4>
                    <div className="text-sm text-gray-600" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>{edu.ecole}, {edu.ville}</div>
                    {edu.details && <div className="text-xs text-gray-500 italic mt-1" style={{ fontSize: 'calc(0.75rem * var(--scale-factor))' }}>{edu.details}</div>}
                  </div>
                  <div className="text-sm font-bold text-gray-500 whitespace-nowrap" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>{formatDate(edu.annee)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RENDER CUSTOM SECTIONS */}
      {(data.customSections || []).map((section) => (
          <div key={section.id} className="break-inside-avoid" style={{ marginBottom: 'calc(2rem * var(--spacing-factor))' }}>
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1 flex items-center gap-2" style={{ fontSize: 'calc(1.125rem * var(--scale-factor))' }}>
                <Layers className={currentTheme.accentText} size={20} /> {section.title}
              </h3>
              <div className="space-y-6" style={{ gap: 'calc(1.5rem * var(--spacing-factor))' }}>
                  {section.items.map((item) => (
                      <div key={item.id} className="break-inside-avoid">
                          <div className="flex justify-between items-baseline mb-1">
                              <h4 className="font-bold text-gray-800 text-lg" style={{ fontSize: 'calc(1.125rem * var(--scale-factor))' }}>{item.title}</h4>
                              {item.date && (
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border whitespace-nowrap ${currentTheme.pillBg} ${currentTheme.accentText} ${currentTheme.pillBorder}`} style={{ fontSize: 'calc(0.75rem * var(--scale-factor))' }}>
                                      {item.date}
                                  </span>
                              )}
                          </div>
                          {item.subtitle && (
                              <div className="text-sm font-semibold text-gray-600 mb-2" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
                                  {item.subtitle}
                              </div>
                          )}
                          <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
                              {renderRichText(item.description)}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      ))}
    </>
  );

  let pdfBackground = `linear-gradient(to right, ${currentTheme.sidebarHex} 32%, #ffffff 32%)`;
  if (layout === 'sidebar-right') {
    pdfBackground = `linear-gradient(to left, ${currentTheme.sidebarHex} 32%, #ffffff 32%)`;
  } else if (layout === 'classic') {
    pdfBackground = '#ffffff'; 
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800">
      
      {/* Header */}
      <header className="bg-blue-900 text-white p-3 shadow-md print:hidden flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          <div className="flex items-center gap-2 shrink-0">
            <FileText size={20} />
            <h1 className="text-lg font-bold hidden md:block whitespace-nowrap">{translations.appTitle}</h1>
          </div>
          
          <button 
            onClick={() => setActiveTab('design')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors border border-blue-700 hover:bg-blue-800 shrink-0 ${activeTab === 'design' ? 'bg-blue-800 ring-2 ring-blue-400' : 'bg-blue-900'}`}
          >
            <Palette size={14} />
            <span className="hidden sm:inline">{translations.customize}</span>
          </button>

          <button onClick={() => setLang(prev => prev === 'fr' ? 'en' : 'fr')} className="flex items-center gap-1 bg-blue-800 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-blue-700 transition-colors uppercase border border-blue-600 shrink-0">
            <Globe size={12} /> {lang}
          </button>

          <div className="flex gap-1 ml-2 border-l border-blue-800 pl-2">
            <button onClick={handleUndo} disabled={historyIndex <= 0} className={`p-1.5 rounded-full hover:bg-blue-800 transition-colors ${historyIndex <= 0 ? 'opacity-30 cursor-not-allowed' : ''}`}><Undo size={16} /></button>
            <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className={`p-1.5 rounded-full hover:bg-blue-800 transition-colors ${historyIndex >= history.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}><Redo size={16} /></button>
          </div>

          <button onClick={() => setMobileView(prev => prev === 'editor' ? 'preview' : 'editor')} className="md:hidden ml-2 p-1.5 bg-blue-800 rounded-full hover:bg-blue-700 text-white transition-colors">
            {mobileView === 'editor' ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>

          {isSaved && <span className="text-[10px] bg-green-500 text-white px-2 py-1 rounded-full animate-fade-in-out flex items-center gap-1 shrink-0 ml-1"><Save size={10} /> <span className="hidden sm:inline">{translations.saved}</span></span>}
        </div>

        <div className="flex gap-2 shrink-0">
          <div className="hidden md:flex gap-1 border-r border-blue-800 pr-2 mr-2">
            <button onClick={handleExportJSON} title={translations.actions.export} className="bg-blue-800 hover:bg-blue-700 p-2 rounded-lg transition-colors"><FileJson size={16} /></button>
            <button onClick={handleImportClick} title={translations.actions.import} className="bg-blue-800 hover:bg-blue-700 p-2 rounded-lg transition-colors"><Upload size={16} /></button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
          </div>
          <button onClick={handlePrint} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold text-sm hidden sm:flex"><Printer size={16} /><span className="hidden md:inline">{translations.print}</span></button>
          <button onClick={handleDownloadPDF} disabled={isDownloading} className={`bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold shadow-sm text-xs md:text-sm ${isDownloading ? 'opacity-70 cursor-wait' : ''}`}>{isDownloading ? <Loader className="animate-spin" size={16} /> : <Download size={16} />}<span>{isDownloading ? '...' : translations.download}</span></button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* --- LEFT COLUMN: EDITOR --- */}
        <div className={`w-full lg:w-1/3 bg-white border-r border-gray-200 overflow-y-auto h-[calc(100vh-64px)] print:hidden shadow-lg z-10 flex-col order-1 lg:order-1 ${mobileView === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 bg-blue-50 border-b border-blue-100 text-xs md:text-sm text-blue-800 flex items-start gap-2">
             <AlertTriangle size={16} className="mt-0.5 shrink-0" />
             <p>{translations.tip}</p>
          </div>
          
          {/* Tabs Menu - Updated to wrap instead of scroll */}
          <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-20 flex flex-wrap gap-2 justify-start">
            {['personal', 'profile', 'exp', 'edu', 'skills', 'custom'].map(tab => (
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
                {translations.tabs[tab]}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* DESIGN */}
            {activeTab === 'design' && (
               <div className="space-y-6 animate-fadeIn">
                 {/* Layout */}
                 <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2"><LayoutTemplate size={16} /> {translations.design.layout}</h3>
                    <div className="grid grid-cols-3 gap-2">
                     <button onClick={() => setLayout('sidebar-left')} className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center gap-2 ${layout === 'sidebar-left' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}`}><AlignLeft size={24} className="text-gray-600" /><span className="text-xs font-medium">{translations.design.modern}</span></button>
                     <button onClick={() => setLayout('sidebar-right')} className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center gap-2 ${layout === 'sidebar-right' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}`}><AlignRight size={24} className="text-gray-600" /><span className="text-xs font-medium">{translations.design.inverted}</span></button>
                     <button onClick={() => setLayout('classic')} className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center gap-2 ${layout === 'classic' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}`}><Columns size={24} className="text-gray-600 transform rotate-90" /><span className="text-xs font-medium">{translations.design.classic}</span></button>
                   </div>
                 </div>
                 
                 {/* Themes */}
                 <div className="space-y-3">
                   <h3 className="font-semibold text-gray-700">{translations.design.theme}</h3>
                   <div className="grid grid-cols-1 gap-3">
                     {themes.map((theme) => (
                       <button key={theme.id} onClick={() => setCurrentTheme(theme)} className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${currentTheme.id === theme.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}`}>
                         <div className="w-10 h-10 rounded-full shadow-sm" style={{ backgroundColor: theme.sidebarHex }}></div>
                         <div className="text-left"><div className="font-semibold text-gray-800">{theme.name}</div><div className="text-xs text-gray-500">{translations.design.stylePro}</div></div>
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Advanced Customization (Sliders) */}
                 <div className="space-y-4 pt-2 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2"><Settings size={16} /> Personnalisation</h3>
                    
                    {/* Font Size Slider */}
                    <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span className="flex items-center gap-1"><Type size={12}/> {translations.design.size}</span>
                            <span>{Math.round(data.style.fontSize * 100)}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0.8" 
                            max="1.3" 
                            step="0.05" 
                            value={data.style.fontSize} 
                            onChange={(e) => setData(prev => ({ ...prev, style: { ...prev.style, fontSize: parseFloat(e.target.value) } }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Spacing Slider */}
                    <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span className="flex items-center gap-1"><MoveVertical size={12}/> {translations.design.spacing}</span>
                            <span>{Math.round(data.style.spacing * 100)}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0.8" 
                            max="2.0" 
                            step="0.1" 
                            value={data.style.spacing} 
                            onChange={(e) => setData(prev => ({ ...prev, style: { ...prev.style, spacing: parseFloat(e.target.value) } }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                 </div>

                 {/* Font */}
                 <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2"><Type size={16} /> {translations.design.font}</h3>
                    <div className="grid grid-cols-2 gap-3">
                     <button onClick={() => setFontStyle('sans')} className={`p-3 rounded-lg border-2 text-center transition-all font-sans ${fontStyle === 'sans' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}`}><span className="text-xl font-bold block mb-1">Ag</span>{translations.design.fontModern}</button>
                     <button onClick={() => setFontStyle('serif')} className={`p-3 rounded-lg border-2 text-center transition-all font-serif ${fontStyle === 'serif' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}`}><span className="text-xl font-bold block mb-1">Ag</span>{translations.design.fontClassic}</button>
                   </div>
                 </div>
               </div>
            )}

            {/* PERSONAL */}
            {activeTab === 'personal' && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><User size={18} /> {translations.personal.title}</h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input name="firstName" placeholder={translations.personal.firstName} value={data.personal.firstName} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                    <input name="lastName" placeholder={translations.personal.lastName} value={data.personal.lastName} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  </div>
                  <input name="title" placeholder={translations.personal.jobTitle} value={data.personal.title} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  <input name="email" placeholder="Email" value={data.personal.email} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  <input name="phone" placeholder={translations.personal.phone} value={data.personal.phone} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  <input name="address" placeholder={translations.personal.address} value={data.personal.address} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  <div className="grid grid-cols-2 gap-2">
                      <input name="license" placeholder={translations.personal.license} value={data.personal.license} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                      <input name="linkedin" placeholder={translations.personal.linkedin} value={data.personal.linkedin} onChange={handlePersonalChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{translations.personal.photo}</label>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><FileText size={18} /> {translations.profile.title}</h2>
                <RichTextArea value={data.profile} onChange={(val) => setData(prev => ({...prev, profile: val}))} placeholder={translations.profile.placeholder} rows={6}/>
              </div>
            )}

            {/* EXP */}
            {activeTab === 'exp' && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Briefcase size={18} /> {translations.exp.title}</h2>
                {(data.experiences || []).map((exp, idx) => (
                  <div key={exp.id} className="p-4 border rounded bg-gray-50 relative group transition-colors hover:border-blue-300" draggable onDragStart={(e) => onDragStart(e, idx)} onDragEnter={(e) => onDragEnter(e, idx)} onDragEnd={() => onDragEnd('experiences')} onDragOver={(e) => e.preventDefault()}>
                    <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-white border rounded shadow-sm p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10 text-gray-400 hover:text-blue-500"><GripVertical size={16} /></div>
                    <button onClick={() => removeItem('experiences', exp.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 z-10"><Trash2 size={16} /></button>
                    <div className="space-y-2">
                      <input placeholder={translations.exp.role} value={exp.poste} onChange={(e) => updateItem('experiences', exp.id, 'poste', e.target.value)} className="w-full p-1 border rounded" />
                      <input placeholder={translations.exp.company} value={exp.entreprise} onChange={(e) => updateItem('experiences', exp.id, 'entreprise', e.target.value)} className="w-full p-1 border rounded" />
                      <div className="grid grid-cols-2 gap-2">
                          <input type="month" placeholder={translations.exp.start} value={exp.dateDebut} onChange={(e) => updateItem('experiences', exp.id, 'dateDebut', e.target.value)} className="p-1 border rounded" />
                          <input placeholder={translations.exp.end} value={exp.dateFin} onChange={(e) => updateItem('experiences', exp.id, 'dateFin', e.target.value)} className="p-1 border rounded" />
                      </div>
                      <input placeholder={translations.exp.city} value={exp.ville} onChange={(e) => updateItem('experiences', exp.id, 'ville', e.target.value)} className="w-full p-1 border rounded" />
                      <RichTextArea value={exp.description} onChange={(val) => updateItem('experiences', exp.id, 'description', val)} placeholder={translations.exp.desc}/>
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('experiences', { id: Date.now().toString(), poste: '', entreprise: '', ville: '', dateDebut: '', dateFin: '', description: '' })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:border-blue-500 hover:text-blue-500 flex justify-center items-center gap-2"><Plus size={16} /> {translations.exp.add}</button>
              </div>
            )}

            {/* EDU */}
            {activeTab === 'edu' && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><GraduationCap size={18} /> {translations.edu.title}</h2>
                {(data.education || []).map((edu, idx) => (
                  <div key={edu.id} className="p-4 border rounded bg-gray-50 relative group transition-colors hover:border-blue-300" draggable onDragStart={(e) => onDragStart(e, idx)} onDragEnter={(e) => onDragEnter(e, idx)} onDragEnd={() => onDragEnd('education')} onDragOver={(e) => e.preventDefault()}>
                    <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-white border rounded shadow-sm p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10 text-gray-400 hover:text-blue-500"><GripVertical size={16} /></div>
                    <button onClick={() => removeItem('education', edu.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 z-10"><Trash2 size={16} /></button>
                    <div className="space-y-2">
                      <input placeholder={translations.edu.degree} value={edu.diplome} onChange={(e) => updateItem('education', edu.id, 'diplome', e.target.value)} className="w-full p-1 border rounded" />
                      <input placeholder={translations.edu.school} value={edu.ecole} onChange={(e) => updateItem('education', edu.id, 'ecole', e.target.value)} className="w-full p-1 border rounded" />
                      <div className="grid grid-cols-2 gap-2">
                          <input placeholder={translations.edu.year} value={edu.annee} onChange={(e) => updateItem('education', edu.id, 'annee', e.target.value)} className="p-1 border rounded" />
                          <input placeholder={translations.edu.city} value={edu.ville} onChange={(e) => updateItem('education', edu.id, 'ville', e.target.value)} className="p-1 border rounded" />
                      </div>
                      <input placeholder={translations.edu.details} value={edu.details} onChange={(e) => updateItem('education', edu.id, 'details', e.target.value)} className="w-full p-1 border rounded" />
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('education', { id: Date.now().toString(), diplome: '', ecole: '', ville: '', annee: '', details: '' })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:border-blue-500 hover:text-blue-500 flex justify-center items-center gap-2"><Plus size={16} /> {translations.edu.add}</button>
              </div>
            )}

            {/* SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700">{translations.skills.techTitle}</h3>
                  {(data.skills || []).map((skill, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={typeof skill === 'string' ? skill : String(skill)} onChange={(e) => handleArrayStringChange('skills', idx, e.target.value)} className="flex-1 p-2 border rounded" placeholder={translations.skills.techPlaceholder} />
                      <button onClick={() => removeArrayString('skills', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => addArrayString('skills')} className="text-sm text-blue-600 flex items-center gap-1 hover:underline"><Plus size={14} /> {translations.skills.addSkill}</button>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-semibold text-gray-700">{translations.skills.langTitle}</h3>
                  {(data.languages || []).map((lang, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={lang.lang} onChange={(e) => updateLanguage(idx, 'lang', e.target.value)} className="flex-1 p-2 border rounded" placeholder={translations.skills.langName} />
                      <input value={lang.level} onChange={(e) => updateLanguage(idx, 'level', e.target.value)} className="flex-1 p-2 border rounded" placeholder={translations.skills.langLevel} />
                      <button onClick={() => removeLanguage(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={addLanguage} className="text-sm text-blue-600 flex items-center gap-1 hover:underline"><Plus size={14} /> {translations.skills.addLang}</button>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-semibold text-gray-700">{translations.skills.hobbyTitle}</h3>
                  {(data.hobbies || []).map((hobby, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={typeof hobby === 'string' ? hobby : String(hobby)} onChange={(e) => handleArrayStringChange('hobbies', idx, e.target.value)} className="flex-1 p-2 border rounded" placeholder={translations.skills.hobbyPlaceholder} />
                      <button onClick={() => removeArrayString('hobbies', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => addArrayString('hobbies')} className="text-sm text-blue-600 flex items-center gap-1 hover:underline"><Plus size={14} /> {translations.skills.addHobby}</button>
                </div>
              </div>
            )}

            {/* NEW TAB: CUSTOM SECTIONS */}
            {activeTab === 'custom' && (
                <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Layers size={18} /> {translations.tabs.custom}</h2>
                    
                    {(data.customSections || []).map(section => (
                        <div key={section.id} className="border rounded-lg p-4 bg-gray-50 space-y-4">
                            <div className="flex items-center gap-2">
                                <input 
                                    className="font-bold text-gray-800 bg-transparent border-b border-dashed border-gray-400 focus:border-blue-500 outline-none w-full"
                                    value={section.title}
                                    onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)}
                                    placeholder={translations.custom.sectionTitle}
                                />
                                <button onClick={() => removeCustomSection(section.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                            </div>

                            <div className="space-y-3">
                                {section.items.map(item => (
                                    <div key={item.id} className="p-3 bg-white border rounded shadow-sm space-y-2 relative group">
                                        <button onClick={() => removeCustomItem(section.id, item.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><Minus size={16} /></button>
                                        <input 
                                            className="w-full p-1 border-b text-sm font-semibold" 
                                            placeholder={translations.custom.itemTitle}
                                            value={item.title}
                                            onChange={(e) => updateCustomItem(section.id, item.id, 'title', e.target.value)}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input 
                                                className="p-1 border-b text-xs" 
                                                placeholder={translations.custom.itemSubtitle}
                                                value={item.subtitle}
                                                onChange={(e) => updateCustomItem(section.id, item.id, 'subtitle', e.target.value)}
                                            />
                                            <input 
                                                className="p-1 border-b text-xs" 
                                                placeholder={translations.custom.itemDate}
                                                value={item.date}
                                                onChange={(e) => updateCustomItem(section.id, item.id, 'date', e.target.value)}
                                            />
                                        </div>
                                        <RichTextArea 
                                            value={item.description}
                                            onChange={(val) => updateCustomItem(section.id, item.id, 'description', val)}
                                            placeholder="Description..."
                                            rows={2}
                                        />
                                    </div>
                                ))}
                                <button 
                                    onClick={() => addCustomItem(section.id)} 
                                    className="w-full py-1.5 border border-dashed border-blue-300 text-blue-500 rounded text-sm hover:bg-blue-50 flex justify-center items-center gap-1"
                                >
                                    <Plus size={14} /> {translations.custom.addItem}
                                </button>
                            </div>
                        </div>
                    ))}

                    <button 
                        onClick={addCustomSection} 
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex justify-center items-center gap-2 shadow-sm"
                    >
                        <Plus size={18} /> {translations.custom.addSection}
                    </button>
                </div>
            )}
          </div>

          <div className="p-4 border-t text-xs text-center text-gray-500 bg-gray-50">
            <p>{translations.footer.devBy} <span className="font-semibold text-gray-700">Ghassen Ouerghi</span></p>
            <a href="https://www.facebook.com/ghassen.ouerghi1/" target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-blue-600 hover:underline"><Facebook size={12} /> Facebook</a>
          </div>
        </div>

        {/* --- RIGHT COLUMN: PREVIEW --- */}
        <div className={`w-full lg:w-2/3 bg-gray-500 p-4 lg:p-8 overflow-y-auto overflow-x-auto justify-center items-start order-2 lg:order-2 ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="shadow-2xl shrink-0">
            <div 
              ref={cvRef}
              className={`w-[210mm] min-h-[297mm] flex ${layout === 'classic' ? 'flex-col' : (layout === 'sidebar-right' ? 'flex-row-reverse' : 'flex-row')} relative bg-white ${fontStyle === 'serif' ? 'font-serif' : 'font-sans'}`}
              style={{ background: pdfBackground, ...previewStyle }}
            >
              {layout === 'classic' ? (
                <div className="w-full flex flex-col h-full min-h-[297mm]">
                  <div className={`${currentTheme.headerBg || 'bg-slate-900'} text-white p-8 text-center print:text-white print:-webkit-print-color-adjust-exact`}>
                    <div className="flex justify-center mb-4">
                      <div className={`w-32 h-32 rounded-full border-4 border-white overflow-hidden flex items-center justify-center relative shadow-lg bg-white/20`}>
                        {data.personal.photo ? <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl text-white font-bold">{(data.personal.firstName || ' ')[0]}{(data.personal.lastName || ' ')[0]}</span>}
                      </div>
                    </div>
                    <h1 className="text-4xl font-bold uppercase tracking-tight leading-tight mb-2" style={{ fontSize: 'calc(2.25rem * var(--scale-factor))' }}>{data.personal.firstName} {data.personal.lastName}</h1>
                    <h2 className="text-xl font-medium tracking-wide uppercase opacity-90" style={{ fontSize: 'calc(1.25rem * var(--scale-factor))' }}>{data.personal.title}</h2>
                    <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm opacity-90" style={{ fontSize: 'calc(0.875rem * var(--scale-factor))' }}>
                       {data.personal.phone && <div className="flex items-center gap-2"><Phone size={14} /> <span>{data.personal.phone}</span></div>}
                       {data.personal.email && <div className="flex items-center gap-2"><Mail size={14} /> <span>{data.personal.email}</span></div>}
                       {data.personal.address && <div className="flex items-center gap-2"><MapPin size={14} /> <span>{data.personal.address}</span></div>}
                    </div>
                  </div>
                  <div className="p-8 grid grid-cols-12 gap-8 text-gray-800 flex-1">
                      <div className="col-span-8 space-y-8">
                        <MainContent />
                      </div>
                      <div className="col-span-4 space-y-8 border-l border-gray-100 pl-8">
                         <SidebarContent />
                      </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-[32%] text-white p-6 flex flex-col gap-6 print:text-white print:-webkit-print-color-adjust-exact"><SidebarContent /></div>
                  <div className="w-[68%] p-8 text-gray-800"><MainContent /></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media print { @page { margin: 0; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } ::-webkit-scrollbar { display: none; } }`}</style>
    </div>
  );
}