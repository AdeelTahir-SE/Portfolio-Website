"use client";
import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Check,
  Zap,
  Code,
  Smartphone,
  Wrench,
  FileCode,
  Paintbrush,
  Braces,
  Atom,
  Triangle,
  Wind,
  Hexagon,
  CloudCog,
  Monitor,
  Globe,
  Puzzle,
  Cpu,
  Server,
  Database,
  GitBranch,
  Package,
  FileType,
  Container,
  Workflow,
  Radio,
  Activity,
  ListTodo
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const typedEl = useRef(null);
  const heroRef = useRef(null);
  const featureBarRef = useRef(null);
  const skillsRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [dbProjects, setDbProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.projects) setDbProjects(data.projects);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // Typed.js initialization
    const typed = new Typed(typedEl.current, {
      strings: [
        `const developer = {
  name: 'Adeel Tahir',
  role: 'Full Stack Developer',
  skills: ['Next.js', 'React', 'Node.js', 'Tailwind'],
  passion: 'Building scalable web applications',
  isAvailable: true
};

// Ready to build something amazing?`
      ],
      typeSpeed: 40,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    // GSAP Animations
    const sections = [heroRef, featureBarRef, skillsRef, servicesRef, projectsRef, contactRef];
    
    sections.forEach((section) => {
      if(section.current) {
        gsap.fromTo(section.current, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const oldProjects = [
    { title: 'Restaurant Application', tech: 'React, Node.js', desc: 'A full-stack restaurant management system.' },
    { title: 'BroadCast Server', tech: 'Node.js, WebSockets', desc: 'Real-time broadcasting server for high throughput.' },
    { title: 'Weather App', tech: 'JavaScript, OpenWeather API', desc: 'A dynamic weather forecasting application.' },
    { title: 'Todo List API', tech: 'Express, MongoDB', desc: 'RESTful API for managing tasks efficiently.' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12 bg-white">
        {/* Decorative elements - Flying SVGs */}
        <div className="absolute top-20 left-10 text-[#c9f31d] opacity-50 animate-float-slow">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 22 22 22" /></svg>
        </div>
        <div className="absolute bottom-32 right-20 text-gray-300 opacity-50 animate-float-fast">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
        </div>
        <div className="absolute top-32 right-1/4 text-gray-200 opacity-40 animate-float-medium">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
        </div>
        <div className="absolute bottom-20 left-1/4 text-[#c9f31d] opacity-30 animate-float-slow" style={{ animationDelay: '1s' }}>
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </div>
        
        {/* Left Side */}
        <div className="lg:w-1/2 flex flex-col items-start z-10">
          <h1 className="text-5xl lg:text-7xl font-bold font-main leading-tight mb-6">
            I BUILD <span className="text-[#c9f31d] bg-gray-900 px-2">FAST,</span><br/>
            MODERN & SCALABLE<br/>
            WEB APPLICATIONS.
          </h1>
          <p className="text-2xl font-semibold mb-4 text-gray-700">CLEAN CODE. GREAT EXPERIENCES.</p>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            I&apos;m a Next.js developer who loves turning ideas into real-world products that solve problems and create impact.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#projects" className="btn-outline flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-bold hover:bg-[#c9f31d] hover:border-[#c9f31d] transition-colors">
              VIEW MY WORK <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-outline flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-bold hover:bg-gray-900 hover:text-white transition-colors">
              LET&apos;S CONNECT ↗
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm uppercase tracking-wider">FIND ME ON</span>
            <div className="flex gap-4">
              <a href="#" className="text-2xl text-gray-600 hover:text-gray-900 transition-colors"><Github size={24} /></a>
              <a href="#" className="text-2xl text-gray-600 hover:text-[#0077b5] transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="text-2xl text-gray-600 hover:text-[#1da1f2] transition-colors"><Twitter size={24} /></a>
            </div>
          </div>
        </div>

        {/* Right Side - Code Editor Mockup */}
        <div className="lg:w-1/2 w-full z-10">
          <div className="code-editor bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden border border-gray-800">
            <div className="code-editor-header flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500 code-dot"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 code-dot"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 code-dot"></div>
              <span className="ml-2 text-xs text-gray-400 font-mono">developer.js</span>
            </div>
            <div className="p-6 h-80 overflow-hidden text-sm lg:text-base font-mono text-gray-300">
              <span ref={typedEl} style={{ whiteSpace: 'pre' }}></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BOTTOM BAR */}
      <section ref={featureBarRef} className="w-full bg-[#1a1a1a] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <Zap size={28} className="text-[#c9f31d]" />
            <h3 className="font-bold text-xl">PERFORMANCE</h3>
            <p className="text-gray-400 text-sm">Built with Next.js for blazing-fast performance.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Code size={28} className="text-[#c9f31d]" />
            <h3 className="font-bold text-xl">CLEAN CODE</h3>
            <p className="text-gray-400 text-sm">Writing maintainable, scalable and efficient code.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Smartphone size={28} className="text-[#c9f31d]" />
            <h3 className="font-bold text-xl">RESPONSIVE</h3>
            <p className="text-gray-400 text-sm">Creating seamless experience across all devices.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Wrench size={28} className="text-[#c9f31d]" />
            <h3 className="font-bold text-xl">MODERN STACK</h3>
            <p className="text-gray-400 text-sm">Using the latest tools to build future-ready products.</p>
          </div>
        </div>
      </section>

      {/* 3. MY SKILLS SECTION */}
      <section id="skills" ref={skillsRef} className="w-full max-w-7xl mx-auto px-6 py-24 bg-white">
        <h2 className="section-title text-4xl font-black text-center mb-16 font-main tracking-tight uppercase">MY SKILLS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* FRONTEND */}
          <div className="p-6 border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-xl mb-5 border-b-4 border-[#c9f31d] inline-block pb-1">FRONTEND</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'HTML', cls: 'devicon-html5-plain colored' },
                { name: 'CSS', cls: 'devicon-css3-plain colored' },
                { name: 'JavaScript', cls: 'devicon-javascript-plain colored' },
                { name: 'TypeScript', cls: 'devicon-typescript-plain colored' },
                { name: 'React', cls: 'devicon-react-original colored' },
                { name: 'Next.js', cls: 'devicon-nextjs-plain' },
                { name: 'Tailwind', cls: 'devicon-tailwindcss-original colored' }
              ].map(s => (
                <div key={s.name} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 hover:border-[#c9f31d] hover:bg-[#c9f31d08] transition-all group bg-white">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-50 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-200 shadow-sm">
                    <i className={`${s.cls} text-[22px]`}></i>
                  </div>
                  <span className="font-mono text-xs font-bold truncate group-hover:text-black transition-colors">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* BACKEND */}
          <div className="p-6 border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-xl mb-5 border-b-4 border-[#c9f31d] inline-block pb-1">BACKEND</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Node.js', cls: 'devicon-nodejs-plain colored' },
                { name: 'Express', cls: 'devicon-express-original colored' },
                { name: 'FastAPI', cls: 'devicon-fastapi-plain colored' },
                { name: 'Flask', cls: 'devicon-flask-original colored' },
                { name: 'Rust', cls: 'devicon-rust-plain text-black' },
                { name: 'MongoDB', cls: 'devicon-mongodb-plain colored' },
                { name: 'PostgreSQL', cls: 'devicon-postgresql-plain colored' },
                { name: 'MySQL', cls: 'devicon-mysql-plain colored' },
                { name: 'Redis', cls: 'devicon-redis-plain colored' }
              ].map(s => (
                <div key={s.name} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 hover:border-[#c9f31d] hover:bg-[#c9f31d08] transition-all group bg-white">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-50 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-200 shadow-sm">
                    <i className={`${s.cls} text-[22px]`}></i>
                  </div>
                  <span className="font-mono text-xs font-bold truncate group-hover:text-black transition-colors">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MESSAGE QUEUES & STREAMING */}
          <div className="p-6 border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-xl mb-5 border-b-4 border-[#c9f31d] inline-block pb-1">QUEUES & STREAMING</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Kafka', cls: 'devicon-apachekafka-original colored' },
                { name: 'RabbitMQ', cls: 'devicon-rabbitmq-original colored' },
                { name: 'Flink', cls: 'devicon-apache-plain colored' },
                { name: 'BullMQ', cls: 'devicon-redis-plain colored' }
              ].map(s => (
                <div key={s.name} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 hover:border-[#c9f31d] hover:bg-[#c9f31d08] transition-all group bg-white">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-50 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-200 shadow-sm">
                    <i className={`${s.cls} text-[22px]`}></i>
                  </div>
                  <span className="font-mono text-xs font-bold truncate group-hover:text-black transition-colors">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TOOLS */}
          <div className="p-6 border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-xl mb-5 border-b-4 border-[#c9f31d] inline-block pb-1">TOOLS</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Git', cls: 'devicon-git-plain colored' },
                { name: 'npm', cls: 'devicon-npm-original-wordmark colored' },
                { name: 'Docker', cls: 'devicon-docker-plain colored' },
                { name: 'GitHub', cls: 'devicon-github-original colored' }
              ].map(s => (
                <div key={s.name} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 hover:border-[#c9f31d] hover:bg-[#c9f31d08] transition-all group bg-white">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-50 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-200 shadow-sm">
                    <i className={`${s.cls} text-[22px]`}></i>
                  </div>
                  <span className="font-mono text-xs font-bold truncate group-hover:text-black transition-colors">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn-outline border-2 border-gray-900 px-8 py-3 font-bold hover:bg-gray-900 hover:text-white transition-colors uppercase">
            VIEW ALL SKILLS <ArrowRight size={16} className="inline ml-2" />
          </button>
        </div>
      </section>

      {/* 4. WHAT I DO SECTION */}
      <section ref={servicesRef} className="w-full bg-[#f7f7f7] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-4xl font-black text-center mb-16 font-main tracking-tight uppercase">WHAT I DO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: 'WEB DESIGN', d: 'Modern, responsive and user-focused designs that convert visitors.', Icon: Paintbrush },
              { t: 'FULL STACK DEVELOPMENT', d: 'End-to-end web applications using modern tech stacks.', Icon: Code },
              { t: 'MOBILE APPS', d: 'Cross-platform mobile applications for iOS and Android.', Icon: Smartphone },
              { t: 'DESKTOP APPS', d: 'Native and cross-platform desktop applications.', Icon: Monitor },
              { t: 'PWAs', d: 'Progressive Web Apps that work offline and feel native.', Icon: Globe },
              { t: 'BROWSER EXTENSIONS', d: 'Custom browser extensions to enhance workflows.', Icon: Puzzle },
              { t: 'LOW LEVEL SOLUTIONS', d: 'High-performance system programming and architecture.', Icon: Cpu },
              { t: 'PERFORMANCE OPTIMIZATION', d: 'Speed up your application for better SEO and UX.', Icon: Zap },
              { t: 'DEPLOYMENT & DEVOPS', d: 'Deploy scalable apps on modern cloud infrastructure.', Icon: CloudCog }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white p-8 border-2 border-transparent hover:border-[#c9f31d] rounded-xl shadow-sm hover:shadow-lg transition-all group">
                <srv.Icon size={36} className="text-[#c9f31d] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl mb-4 font-main uppercase">{srv.t}</h3>
                <p className="text-gray-600 mb-6 text-sm">{srv.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <section id="projects" ref={projectsRef} className="w-full max-w-7xl mx-auto px-6 py-24 bg-white">
        <h2 className="section-title text-4xl font-black text-center mb-16 font-main tracking-tight uppercase">FEATURED PROJECTS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dbProjects.slice(0, 3).map((proj, idx) => (
            <div key={idx} className="card-bordered border-2 border-gray-200 rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow flex flex-col bg-white">
              <div className="h-48 bg-gradient-to-br from-[#c9f31d] to-[#8aab13] relative p-6 flex items-end justify-center">
                 <div className="w-[90%] h-[80%] bg-white rounded-t-lg shadow-2xl relative overflow-hidden flex items-center justify-center border-t-4 border-gray-800">
                    <span className="text-gray-400 font-bold tracking-widest uppercase text-center px-4">{proj.title}</span>
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-3">{proj.title}</h3>
                <p className="text-gray-600 mb-4 flex-1 text-sm">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tech.map(t => (
                    <span key={t} className="tech-badge bg-gray-100 text-[10px] font-mono px-2 py-1 rounded-full font-bold">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex-1 bg-[#c9f31d] text-gray-900 font-bold py-3 rounded hover:bg-[#b0d618] transition-colors flex items-center justify-center gap-2 text-xs">
                    LIVE DEMO <ArrowRight size={14} />
                  </a>
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex-1 border-2 border-gray-900 text-gray-900 font-bold py-3 rounded hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs">
                    VIEW CODE <Github size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" ref={contactRef} className="w-full max-w-7xl mx-auto px-6 py-24 bg-white relative">
        {/* Decorative background shape */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
        
        <h2 className="section-title text-4xl font-black text-center mb-16 font-main tracking-tight uppercase">LET&apos;S WORK TOGETHER</h2>
        
        <div className="flex flex-col lg:flex-row gap-16 relative z-10">
          {/* Contact Info */}
          <div className="lg:w-1/3 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center text-xl shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-500 mb-1">EMAIL</h4>
                <p className="font-semibold text-lg">adeeltahir6a@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center text-xl shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-500 mb-1">PHONE</h4>
                <p className="font-semibold text-lg">03334062285</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center text-xl shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-500 mb-1">LOCATION</h4>
                <p className="font-semibold text-lg">Islamabad, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#c9f31d] text-gray-900 rounded-full flex items-center justify-center text-xl shrink-0">
                <Check size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-500 mb-1">AVAILABLE</h4>
                <p className="font-semibold text-lg">For Freelance & Full-time</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm relative">
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9f31d] focus:ring-2 focus:ring-[#c9f31d] focus:ring-opacity-50 transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Your Email</label>
                  <input 
                    type="email" 
                    required 
                    className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9f31d] focus:ring-2 focus:ring-[#c9f31d] focus:ring-opacity-50 transition-all"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Subject</label>
                <input 
                  type="text" 
                  required 
                  className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9f31d] focus:ring-2 focus:ring-[#c9f31d] focus:ring-opacity-50 transition-all"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Your Message</label>
                <textarea 
                  required 
                  rows="5"
                  className="p-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9f31d] focus:ring-2 focus:ring-[#c9f31d] focus:ring-opacity-50 transition-all resize-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-[#c9f31d] text-gray-900 font-bold py-4 rounded-lg hover:bg-[#b0d618] transition-colors flex items-center justify-center gap-2 mt-2"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'SENDING...' : 'SEND MESSAGE'} <Check size={16} />
              </button>
              
              {formStatus === 'success' && <p className="text-green-600 font-bold text-center mt-2">Message sent successfully!</p>}
              {formStatus === 'error' && <p className="text-red-600 font-bold text-center mt-2">Failed to send message. Please try again.</p>}
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
