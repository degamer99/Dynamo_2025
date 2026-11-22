import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, Bot, Users, ArrowUpRight, Cpu } from 'lucide-react';

export default function ProjectsShowcase() {
  const projects = [
    {
      id: 'project_examination_countdown_timer',
      code: 'EEE-CAP-01',
      icon: Clock,
      title: 'Examination Countdown Timer Management System',
      description:
        'A dedicated digital control system designed to automate exam timing intervals, providing accurate visual and acoustic countdown cues for examination halls to minimize human oversight.',
      students: ['Abdulhyyu Muhd', 'Levi Dashe', 'Idris A. Shuaib', 'Caeb Ponsak Philip', 'Sani Philip Friday', 'Abdulgafar Saliu'],
      supervisor: 'Engr. Yusuf Saleh',
      image: '/images/text/project_examination_countdown_timer.jpg',
      tags: ['Embedded Systems', 'Digital Logic', 'Microcontrollers']
    },
    {
      id: 'project_gas_leakage_detector',
      code: 'EEE-CAP-02',
      icon: Flame,
      title: 'Gas Leakage Detector with Alarm & Fire Suppression',
      description:
        'An intelligent hazard-mitigation prototype equipped with high-sensitivity gas sensors, an automated GSM alert transceiver, and an integrated pneumatic fire suppression relay mechanism.',
      students: ['Abdulliadi Abdulbaki', 'Yahaya Tajudeen A.', 'Yusuf Hikmat O.'],
      supervisor: 'Dr. H. S. Miya',
      image: '/images/text/project_gas_leakage_detector.jpg',
      tags: ['IoT Safety', 'GSM Telemetry', 'Control Relays']
    },
    {
      id: 'project_obstacle_avoiding_robot',
      code: 'EEE-CAP-03',
      icon: Bot,
      title: 'Autonomous Obstacle-Avoiding Wheeled Robot',
      description:
        'A robotic navigation unit utilizing ultrasonic sensor arrays and pulse-width modulation motor controllers to execute real-time collision detection and autonomous spatial pathfinding.',
      students: ['Abdulazeez Suleimn'],
      supervisor: 'Engr. Abdulrazak Sabo',
      image: '/images/text/project_obstacle_avoiding_robot.jpg',
      tags: ['Robotics', 'Ultrasonic Array', 'PWM Kinematics']
    }
  ];

  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-[#F6F3EC] border-b border-stone-300 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #022c22 1px, transparent 1px), linear-gradient(to bottom, #022c22 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper-600 flex items-center justify-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Applied Hardware & Systems Engineering
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            FINAL-YEAR <span className="copper-gradient-text">CAPSTONE EXHIBITIONS</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-sans">
            Hardware prototypes and automated electronic systems designed, fabricated, and tested by the Class of 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-300/90 shadow-sm hover:shadow-xl hover:border-copper-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-52 w-full bg-stone-900 relative overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/images/cover/page_001_cover.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 text-copper-300 border border-copper-400/40 text-[10px] font-mono font-bold tracking-wider">
                        {proj.code}
                      </span>
                      <div className="p-2 rounded-lg bg-copper-500 text-white shadow-md">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-white border border-white/15 text-[10px] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-serif font-bold text-emerald-950 group-hover:text-copper-700 transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-stone-50 border-t border-stone-200/80 space-y-3 font-sans text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
                      <Users className="w-3 h-3 text-copper-600" />
                      Engineering Team
                    </span>
                    <p className="text-stone-800 font-medium mt-0.5 line-clamp-1">
                      {proj.students.join(', ')}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                        Supervisor
                      </span>
                      <span className="font-bold text-emerald-950">{proj.supervisor}</span>
                    </div>

                    <Link
                      to={`/magazine?article=${proj.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-copper-50 text-copper-700 hover:bg-copper-500 hover:text-white font-bold transition-colors"
                    >
                      <span>Full Report</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
