import React from 'react';
import {
  Award,
  GraduationCap,
  Briefcase,
  Sparkles,
  ExternalLink,
  BookOpen,
  Trophy,
  HeartHandshake
} from 'lucide-react';

export default function SponsorSpotlight() {
  const achievements = [
    {
      icon: GraduationCap,
      tag: '5.0 GPA (3×) • Best Graduating Alumnus',
      title: 'Academic & Departmental Excellence',
      description:
        'Earned a perfect 5.0 GPA three times during his undergraduate studies at ATBU, graduating as the top overall student in both his Department and the Faculty of Engineering while receiving thesis awards.'
    },
    {
      icon: Trophy,
      tag: '15 Merit Scholarships',
      title: 'National & International Scholar',
      description:
        'Awarded 15 prestigious merit scholarships by leading energy and technology organizations including TotalEnergies, Seplat Energy, Chevron, PTDF, and the MTN Foundation.'
    },
    {
      icon: Briefcase,
      tag: 'MD/CEO • Zetch Engineering Ltd',
      title: 'Professional & Industry Leadership',
      description:
        'Accumulated core engineering experience with Shell and Setraco Nigeria Limited, and currently serves as Managing Director & CEO of Zetch Engineering Limited.'
    },
    {
      icon: BookOpen,
      tag: 'M.Eng & Published Researcher',
      title: 'Postgraduate Studies & Mentorship',
      description:
        'Pursued postgraduate M.Eng studies at Abubakar Tafawa Balewa University (ATBU), authored multiple engineering research papers, and actively mentors emerging Balewite engineers.'
    }
  ];

  return (
    <section
      id="patron-spotlight"
      className="py-16 md:py-24 bg-gradient-to-b from-[#FDFBF7] to-cream-100 border-b border-stone-200 relative overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-copper-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Spotlight Card */}
        <div className="bg-white rounded-3xl border border-copper-300/80 shadow-xl overflow-hidden">
          
          {/* Top Emerald & Copper Banner Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 px-6 py-8 sm:px-10 sm:py-10 text-white border-b border-copper-500/40 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-copper-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper-500/20 border border-copper-400/40 text-copper-300 text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5 text-copper-400" />
                  <span>Distinguished Alumnus • Event Sponsor & Pillar of Support</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white">
                  ENGR. ABRAHAM <span className="copper-gradient-text">ITOPA</span>
                </h2>

                <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed">
                  Standout Abubakar Tafawa Balewa University (ATBU) engineering alumnus, MD/CEO of{' '}
                  <strong className="text-white">Zetch Engineering Limited</strong>, and major supporter & sponsor of the{' '}
                  <strong className="text-copper-300">43rd EEE Balewite Dynamo</strong> magazine and graduation celebration.
                </p>
              </div>

              {/* Special Recognition Callout Box */}
              <div className="bg-emerald-950/90 border border-copper-400/50 rounded-2xl p-4 sm:p-5 shrink-0 lg:w-72 shadow-lg">
                <div className="flex items-center gap-2 text-copper-400 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>43rd Dynamo Honor</span>
                </div>
                <div className="mt-1.5 text-xl sm:text-2xl font-serif font-black text-white">
                  ₦500,000 Prize
                </div>
                <p className="mt-1 text-[11px] text-stone-300 font-sans leading-snug">
                  Awarded at the 43rd EEE Balewite Dynamo magazine launch & celebration in recognition of academic and engineering excellence.
                </p>
              </div>
            </div>
          </div>

          {/* 4-Pillar Achievement Grid */}
          <div className="p-6 sm:p-10 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {achievements.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-cream-50/80 border border-stone-200/90 hover:border-copper-400 transition-all flex items-start gap-4 group"
                  >
                    <div className="p-3 rounded-xl bg-emerald-950 text-copper-300 border border-copper-500/30 shrink-0 mt-0.5 group-hover:bg-copper-500 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-copper-700 block">
                        {item.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-emerald-950">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Links & Verification */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-stone-500 font-sans italic text-center sm:text-left">
                “Celebrated by the 43rd EEE Balewite Dynamos for his generous sponsorship, mentorship, and enduring example of ATBU engineering excellence.”
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <a
                  href="https://ng.linkedin.com/in/abraham-itopa-69a723207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-copper-400" />
                </a>

                <a
                  href="https://www.facebook.com/61590025747315/videos/and-he-was-awardedby-the-chief-launcher-of-the-43rd-ee-balewite-dynamo-magazinee/1449572086521387/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-copper-50 hover:bg-copper-100 text-copper-800 border border-copper-300 text-xs font-semibold transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-copper-600" />
                  <span>43rd Dynamo Award Video</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
