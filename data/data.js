/* ---------------- DATA ---------------- */
const TEAM = [
  {name:"Karima",role:"Présidente",photo:"images/karimalhrari.png",bio:"Supervise la vision stratégique du club, anime la dynamique inter-équipes et impulse l'innovation.",expertise:["Leadership","Organisation","Vision"],github:"#",linkedin:"#"},
  {name:"Ahmed Karim",role:"Vice-Président",photo:"images/haraouiahmedkarim.png",bio:"Coordination opérationnelle, médiatisation des actions et support transversal.",expertise:["Coordination","Communication"],github:"#",linkedin:"#"},
  {name:"Anouar",role:"HR Manager",photo:"images/anouarkhalfi.png",bio:"Gestion des talents, intégration des nouveaux membres et culture collaborative.",expertise:["RH","Onboarding","Coaching"],github:"#",linkedin:"#"},
  {name:"Asmae",role:"Trésorière",photo:"images/mknasiya.jpg",bio:"Optimisation des budgets et pilotage financier responsable.",expertise:["Finance","Gestion","Analyse"],github:"#",linkedin:"#"},
  {name:"Noussaiba",role:"Events Manager",photo:"images/noussaibamoudnib.png",bio:"Organisation d'ateliers, hack sessions et rencontres externes.",expertise:["Événementiel","Logistique"],github:"#",linkedin:"#"},
  {name:"Imane",role:"Secrétaire Générale",photo:"images/imane.jpg",bio:"Formalisation, documentation, suivi des décisions et archivage.",expertise:["Documentation","Coordination"],github:"#",linkedin:"#"},
  {name:"Abdelghafour",role:"Project Manager",photo:"images/1.png",bio:"Supervision technique, architecture systèmes et intégration multi-modulaire.",expertise:["Architecture","Robotique","Gestion"],github:"#",linkedin:"#"},
  {name:"Jean Pierre",role:"Training Manager",photo:"images/badojeanpierre.png",bio:"Conception de programmes formation embarqué + IA légère.",expertise:["Formation","Embarqué","Pédagogie"],github:"#",linkedin:"#"},
  {name:"Raheb",role:"Development Advisor",photo:"images/raheb.png",bio:"Support vision, optimisation logicielle et prototypage rapide.",expertise:["Vision","Optimisation","IA"],github:"#",linkedin:"#"},
  {name:"Mohammed el adarissi",role:"Membre",photo:"images/eladarissimohammed.png",bio:"Participe à la création de solutions robotiques innovantes.",expertise:["Motivation","Curiosité"],github:"#",linkedin:"#"}
];

const PROJECTS = [
  {id:"p1",title:"Robot Suiveur d'Objets",cover:"assets/projects/object-tracker.jpg",summary:"Robot autonome vision temps réel.",description:"Plateforme Raspberry Pi + OpenCV détectant puis suivant un objet coloré avec contrôle moteur PID.",tags:["Vision","Raspberry Pi"],tech:["Python","OpenCV","PID"],repo:"#",demo:"#"},
  {id:"p2",title:"Système d'Irrigation IoT",cover:"assets/projects/iot-irrigation.jpg",summary:"Gestion intelligente humidité.",description:"Capteurs d'humidité connectés, envoi des données en temps réel et commande de pompes via interface web.",tags:["IoT","Agritech"],tech:["ESP8266","MQTT","JS"],repo:"#"},
  {id:"p3",title:"Suiveur Solaire Bi-Axe",cover:"assets/projects/solar-tracker.jpg",summary:"Orientation panneau optimisée.",description:"LDR multi-axes + servos pour maximiser l'irradiance locale avec recalibrage automatique matin/soir.",tags:["Énergie","Embedded"],tech:["C","Servo","LDR"]},
  {id:"p4",title:"Cobot 4WD Vision Main",cover:"assets/projects/cobot-hand.jpg",summary:"Interaction gestuelle mobile.",description:"Contrôle gestuel via segmentation de la main et mapping gestes -> commandes différentielles.",tags:["Robotique","Vision"],tech:["ESP32-CAM","Python","Control"]},
  {id:"p5",title:"Robot Quadrupède",cover:"assets/projects/quadruped.jpg",summary:"Locomotion multi-terrain stable.",description:"Cinématique simplifiée, calibration servo, séquence de marche adaptative selon inclinaison.",tags:["Cinématique","Robotique"],tech:["C++","Servos","IMU"]},
  {id:"p6",title:"Drone Autonome",cover:"assets/projects/drone.jpg",summary:"Navigation waypoint + évitement.",description:"Contrôleur de vol custom, planification de trajectoire et évitement obstacles ultrason + vision.",tags:["Aérien","Autonome"],tech:["PX4","Python","Nav"]},
];

const NEWS = [
  {
    id: "n1",
    title: "Workshop Vision & OpenCV",
    date: "2025-01-25",
    category: "Workshop",
    tags: ["Vision", "OpenCV", "Formation"],
    cover: "assets/news/workshop-opencv.jpg", // ← Nouveau: photo de couverture
    excerpt: "Découverte filtrage, contours, suivi couleur temps réel. 42 participants.",
    content: "Notre dernier workshop sur la vision par ordinateur avec OpenCV a rassemblé 42 participants passionnés. Au programme : traitement d'images, détection de contours, filtrage avancé et suivi d'objets en temps réel. Les participants ont pu travailler sur des cas concrets de robotique mobile.",
    featured: true // ← Nouveau: mise en avant
  },
  {
    id: "n2", 
    title: "Participation RoboChallenge 2025",
    date: "2025-02-10",
    category: "Compétition",
    tags: ["Competition", "Autonome", "Victoire"],
    cover: "assets/news/robochallenge-2025.jpg",
    excerpt: "Trois équipes engagées : quadrupède, suiveur, drone. Phase tests validée.",
    content: "Le FSDM Robotics Club a brillamment participé au RoboChallenge 2025 avec trois équipes compétitives. Nos robots quadrupède, suiveur de ligne et drone autonome ont tous validé la phase de tests techniques. Félicitations à toute l'équipe pour leur travail remarquable !",
    featured: true
  },
  {
    id: "n3",
    title: "Recrutement 2025 Ouvert",
    date: "2025-03-01", 
    category: "Annonce",
    tags: ["Recrutement", "Opportunité"],
    cover: "assets/news/recrutement-2025.jpg",
    excerpt: "Candidatures ouvertes domaines : IA, embarqué, mécatronique, média jusqu'au 20 mars.",
    content: "Le recrutement 2025 est officiellement ouvert ! Nous recherchons des passionnés en intelligence artificielle, systèmes embarqués, mécatronique et communication. Que vous soyez débutant ou expert, venez rejoindre notre aventure robotique. Date limite : 20 mars 2025.",
    featured: false
  },
  {
    id: "n4",
    title: "Nouveau Partenariat Industriel",
    date: "2025-02-28",
    category: "Partenariat", 
    tags: ["Partenariat", "Innovation"],
    cover: "assets/news/partenariat-industriel.jpg",
    excerpt: "Collaboration avec TechRobotics pour le développement de nouveaux prototypes.",
    content: "Nous sommes fiers d'annoncer un nouveau partenariat stratégique avec TechRobotics, leader dans les solutions robotiques industrielles. Cette collaboration nous permettra d'accéder à des technologies de pointe et de développer des prototypes innovants.",
    featured: true
  }
];

const EVENTS = [
{
    id: "e1",
    name: "Competeion knetra",
    date: "2025-04-30",
    location: "knetra", 
    cover: "assets/events/compknetra/3.jpg",
    imagesFolder: "assets/events/compknetra/",
    imageCount: 25},
    {
    id: "e2",
    name: " Fez Scientific Heritage Festival ",
    date: "2025-4-27",
    location: "fes", 
    cover: "assets/events/fesma3rid3ilmi/7.jpg",
    imagesFolder: "assets/events/fesma3rid3ilmi/",
    imageCount: 15,
    },
   {
    id: "e3",
    name: "workshoAI SYSTEMS ",
    date: "2025-1-30",
    location: "fes", 
    cover: "assets/events/iasystem/2.jpg",
    imagesFolder: "assets/events/iasystem/",
    imageCount: 9},
       {
    id: "e4",
    name: "comp fes 2024 ",
    date: "2024-11-30",
    location: "fes", 
    cover: "assets/events/comptfes2024/2.jpg",
    imagesFolder: "assets/events/comptfes2024/",
    imageCount: 9}
    ,
       {
    id: "e5",
    name: "Journée PFE  ",
    date: "2025-3-10",
    location: "fes", 
    cover: "assets/events/pfeworksho/4.jpg",
    imagesFolder: "assets/events/pfeworksho/",
    imageCount: 9}
        ,
       {
    id: "e6",
    name: " robotics marathon at UM6P’s NRC  ",
    date: "2024-4-10",
    location: "fes", 
    cover: "assets/events/um6pcomp/4.jpg",
    imagesFolder: "assets/events/um6pcomp/",
    imageCount: 15}
  ];

const COMPETITIONS = [
  {id:"c1",name:"RoboTrack Challenge",status:"Past",date:"2024-05-14",location:"Rabat",cover:"assets/competitions/robotrack/cover.jpg",short:"Course & suivi de ligne.",description:"Châssis optimisé et algorithme de détection de ligne robuste IR + vision hybride.",tags:["Ligne","Optimisation"],team:["Karima","Ahmed Karim","Anouar"]},
  {id:"c2",name:"Quadruped Invitational",status:"Past",date:"2024-10-02",location:"Marrakech",cover:"assets/competitions/quadruped/cover.jpg",short:"Mobilité multi-surfaces.",description:"Génération de patterns d'allure et calibration inertielle dynamique.",tags:["Quadrupède","Gait"],team:["Abdelghafour","Jean Pierre","Raheb"]},
  {id:"c3",name:"AeroNav Cup",status:"Upcoming",date:"2025-04-20",location:"Fès",cover:"assets/competitions/aeronav/cover.jpg",short:"Navigation waypoint + évitement.",description:"Drone modulaire avec stack navigation et planification adaptative météo.",tags:["Drone","Navigation"],team:["Jean Pierre","Raheb","Karima"],highlight:true}
];

const ACHIEVEMENTS = [
  {year:"2025",title:"Prototype Drone Autonome",text:"Tests waypoint + évitement."},
  {year:"2024",title:"Finalistes Quadrupède",text:"Top 5 national locomotion."},
  {year:"2024",title:"Cobot Vision Gestuelle",text:"Interaction main en temps réel."},
  {year:"2023",title:"Extension Lab",text:"Nouvelles zones de prototypage."},
  {year:"2022",title:"Création du Club",text:"Noyau fondateur établi."}
];

// FONCTION POUR GÉNÉRER LES CHEMINS D'IMAGES AVEC VÉRIFICATION D'EXTENSION
function generateImagePaths(event) {
  const images = [];
  const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']; // Extensions supportées
  
  for (let i = 1; i <= event.imageCount; i++) {
    // Si une extension spécifique est définie pour l'événement
    if (event.imageExtension) {
      images.push(`${event.imagesFolder}${i}.${event.imageExtension}`);
    } else {
      // Par défaut, utiliser jpg
      images.push(`${event.imagesFolder}${i}.jpg`);
    }
  }
  return images;
}

// FONCTION POUR OBTENIR LES IMAGES D'UN ÉVÉNEMENT
function getEventImages(eventId) {
  const event = EVENTS.find(ev => ev.id === eventId);
  if (!event) {
    console.warn(`Événement ${eventId} non trouvé`);
    return [];
  }
  
  const images = generateImagePaths(event);
  console.log(`Images pour ${event.name}:`, images); // Debug
  return images;
}