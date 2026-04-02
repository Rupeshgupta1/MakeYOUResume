import DUMMY_PIC from './dummy.png';

export const dummyResumeData = [
  {
    // ── Dashboard ke liye fields ──────────────────────────
    id: "101",                          // unique resume ID (URL mein use hota hai)
    title: "Joe Anderson",              // resume ka naam (edit title modal mein dikhta hai)
    fullName: "Joe Anderson",           // dashboard card pe dikhta hai
    image: DUMMY_PIC,                   // dashboard card pe profile pic
    updatedAt: "2024/03/10",            // dashboard card pe last updated date
    profession: "Frontend Developer",   // user ki job title

    // ── Contact Info (dashboard + personal_info dono mein same) ──
    email: "joe.anderson@gmail.com",
    phone: "+1 987-654-3210",
    linkedin: "https://www.linkedin.com/in/joe-anderson",
    website: "https://joeanderson.dev",

    // ── ResumeBuilder ke liye fields ─────────────────────
    personal_info: {                    // resume builder ka personal section
      name: "Joe Anderson",
      email: "joe.anderson@gmail.com",
      phone: "+1 987-654-3210",
      linkedin: "https://www.linkedin.com/in/joe-anderson",
      website: "https://joeanderson.dev",
    },
    professional_summary: "Experienced Frontend Developer with expertise in React and modern web technologies.", // resume ka summary section
    experience: [                       // job history section
      {
        company: "Google",
        role: "Frontend Developer",
        startDate: "2022/01",
        endDate: "Present",
        description: "Worked on large scale web applications."
      }
    ],
    education: [                        // education section
      {
        school: "MIT",
        degree: "B.Tech Computer Science",
        startDate: "2018",
        endDate: "2022"
      }
    ],
    project: [],                        // projects section (abhi empty)
    skills: ["React", "JavaScript", "TailwindCSS"], // skills section
    template: "classic",               // resume ka template type
    accent_color: "#3B82F6",           // resume ka theme color
    public: false                      // resume public hai ya private
  },

  // ─────────────────────────────────────────────────────────
  {
    // ── Dashboard ke liye fields ──────────────────────────
    id: "102",
    title: "Emma Watson",
    fullName: "Emma Watson",
    image: "https://i.pravatar.cc/300?img=32",
    updatedAt: "2024/05/22",
    profession: "UI/UX Designer",

    // ── Contact Info ──────────────────────────────────────
    email: "emma.watson@gmail.com",
    phone: "+1 234-567-8901",
    linkedin: "https://www.linkedin.com/in/emma-watson",
    website: "https://emmawatson.design",

    // ── ResumeBuilder ke liye fields ─────────────────────
    personal_info: {
      name: "Emma Watson",
      email: "emma.watson@gmail.com",
      phone: "+1 234-567-8901",
      linkedin: "https://www.linkedin.com/in/emma-watson",
      website: "https://emmawatson.design",
    },
    professional_summary: "Creative UI/UX Designer with a passion for building beautiful user experiences.",
    experience: [
      {
        company: "Adobe",
        role: "UI/UX Designer",
        startDate: "2021/06",
        endDate: "Present",
        description: "Designed intuitive user interfaces for enterprise products."
      }
    ],
    education: [
      {
        school: "Stanford University",
        degree: "B.A Design",
        startDate: "2017",
        endDate: "2021"
      }
    ],
    project: [],
    skills: ["Figma", "Adobe XD", "CSS", "Prototyping"],
    template: "classic",
    accent_color: "#9333ea",
    public: false
  },

  // ─────────────────────────────────────────────────────────
  {
    // ── Dashboard ke liye fields ──────────────────────────
    id: "103",
    title: "Michael Brown",
    fullName: "Michael Brown",
    image: "https://i.pravatar.cc/300?img=56",
    updatedAt: "2024/07/01",
    profession: "Full Stack Developer",

    // ── Contact Info ──────────────────────────────────────
    email: "michael.brown@gmail.com",
    phone: "+1 456-789-0123",
    linkedin: "https://www.linkedin.com/in/michael-brown",
    website: "https://michaelbrown.dev",

    // ── ResumeBuilder ke liye fields ─────────────────────
    personal_info: {
      name: "Michael Brown",
      email: "michael.brown@gmail.com",
      phone: "+1 456-789-0123",
      linkedin: "https://www.linkedin.com/in/michael-brown",
      website: "https://michaelbrown.dev",
    },
    professional_summary: "Full Stack Developer with strong experience in Node.js, React and cloud technologies.",
    experience: [
      {
        company: "Amazon",
        role: "Full Stack Developer",
        startDate: "2020/03",
        endDate: "Present",
        description: "Built and maintained scalable backend services and React frontends."
      }
    ],
    education: [
      {
        school: "Harvard University",
        degree: "B.Tech Software Engineering",
        startDate: "2016",
        endDate: "2020"
      }
    ],
    project: [],
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    template: "classic",
    accent_color: "#10b981",
    public: false
  },
];