import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-4 md:p-8">
      <Helmet>
        <title>About - চিঠি (Chithi)</title>
        <meta name="description" content="Learn about the vision behind চিঠি (Chithi), a digital artifact designed with the soul of a handwritten letter." />
        <meta property="og:title" content="About - চিঠি (Chithi)" />
        <meta property="og:description" content="Learn about the vision behind চিঠি (Chithi), a digital artifact designed with the soul of a handwritten letter." />
        <meta property="og:image" content="https://chithi.cursorstudios.net/meta.png" />
        <meta property="twitter:title" content="About - চিঠি (Chithi)" />
        <meta property="twitter:description" content="Learn about the vision behind চিঠি (Chithi), a digital artifact designed with the soul of a handwritten letter." />
        <meta property="twitter:image" content="https://chithi.cursorstudios.net/meta.png" />
      </Helmet>
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-xl relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100">
          <X className="w-5 h-5" />
        </button>

        <div className="mt-4 flex flex-col items-center">
          <img src="/logo with text.png" alt="Chithi Logo" className="h-16 md:h-20 mb-2" />
          <p className="text-sm text-stone-500 mb-10">
            A <a href="https://cursorstudios.net/" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium hover:underline">Cursor Studios</a> Initiative
          </p>

          <div className="space-y-8 text-stone-700 leading-relaxed text-sm md:text-base w-full text-left">
            <section>
              <h2 className="font-serif text-xl mb-3 text-stone-900">The Vision</h2>
              <p className="font-sans mb-3">
                In an era of instant blue ticks and vanishing "stories," the weight of a word has been lost. We've traded the tactile thrill of tearing open an envelope for the sterile tap of a notification.
              </p>
              <p className="font-sans mb-3">
                <strong>চিঠি</strong> is our attempt to restore that gravity.
              </p>
              <p className="font-sans mb-3">
                It is a digital artifact designed with the soul of a handwritten letter. We combined the nostalgia of the 90s "Eid Card" culture with the precision of modern physics-based interactions to create a space where secrets have a home.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl mb-3 text-stone-900">Why "চিঠি"?</h2>
              <p className="font-sans mb-3">
                Because a message is data, but a <strong className="font-bangla text-lg font-normal">চিঠি</strong> is a memory.
              </p>
              <p className="font-sans mb-3">
                By naming it <strong className="font-bangla text-lg font-normal">চিঠি</strong>, we are honoring the tradition of private, thoughtful communication. It’s not about speed; it’s about the reveal. The pull-tab, the tension of the paper, and the final 3D fall—it’s all a tribute to the physical letters that used to travel across districts just to say "Eid Mubarak."
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl mb-4 text-stone-900">Why we are different</h2>
              <p className="font-sans mb-5">
                In a world of data-mining and permanent digital footprints, we believe your personal wishes shouldn't be "content" for a server.
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="font-sans font-semibold text-stone-900 mb-1">Privacy by Design</h3>
                  <p className="font-sans text-sm opacity-90">Your messages are encoded into your unique link. We don't store them, we don't read them, and we don't sell them.</p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-stone-900 mb-1">Zero Footprint</h3>
                  <p className="font-sans text-sm opacity-90">No accounts, no logins, no tracking. Just pure emotion.</p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-stone-900 mb-1">The Scented Pen Vibe</h3>
                  <p className="font-sans text-sm opacity-90">Our templates are designed to evoke the specific nostalgia of <span className="font-bangla text-base">শৈশব</span>—from glossy patterns to classic calligraphy.</p>
                </div>
              </div>
            </section>

            <div className="mt-10 pt-6 border-t border-stone-100 text-center space-y-2">
              
              <p className="font-sans text-xs text-stone-400 pt-2">
                In collaboration with <span className="font-semibold text-stone-500">Project Eunoia</span> <span className="mx-1 opacity-50">•</span> v1.2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
