import { useState } from 'react';
import { myProjects } from '../constants/index.js';
import { useInView } from 'react-intersection-observer'; // Import intersection observer

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const currentProject = myProjects[selectedProjectIndex];

  // Intersection Observer Hooks for triggering animation when elements are near the viewport
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // Trigger when 20% of the element is in the viewport
  });

  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="c-space my-20">
      <p className="head-text">My Selected Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img
              ref={imgRef}
              src={currentProject.spotlight}
              alt="spotlight"
              className={`w-full h-96 object-cover rounded-xl transition-all transform duration-1000 ${imgInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            />
          </div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img
              ref={textRef}
              className={`w-10 h-10 shadow-sm transition-all duration-1000 ${textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              src={currentProject.logo}
              alt="logo"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p
              ref={textRef}
              className={`text-white text-2xl font-semibold animatedText transition-all transform duration-1000 ${textInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              {currentProject.title}
            </p>

            <p
              className={`animatedText transition-all transform duration-1000 ${textInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              {currentProject.desc}
            </p>
            <p
              className={`animatedText transition-all transform duration-1000 ${textInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              {currentProject.subdesc}
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div
                  key={index}
                  className={`tech-logo transition-all transform duration-1000 ${textInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                >
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <a
              ref={buttonRef}
              className={`flex items-center gap-2 cursor-pointer text-white-600 transition-all duration-1000 ${buttonInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              href={currentProject.href}
              target="_blank"
              rel="noreferrer">
              <p>Check Live Site</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              className={`arrow-btn transition-all duration-1000 ${buttonInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>

            <button
              className={`arrow-btn transition-all duration-1000 ${buttonInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full"></div>
      </div>
    </section>
  );
};

export default Projects;
