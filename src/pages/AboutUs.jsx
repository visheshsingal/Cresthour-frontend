const AboutUs = () => {
    return (
        <div className="pt-20 pb-20 bg-white">
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20 bg-deepGreen">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="container-custom relative z-10 text-center text-white">
                    <div>
                        <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Built for modern learners</span>
                        <h1 className="text-5xl md:text-7xl font-serif mb-8">Learn deeply, build boldly.</h1>
                        <p className="max-w-2xl mx-auto text-lg font-light text-gray-200 leading-relaxed">
                            Cresthour helps curious minds turn ideas into real-world skills through structured programs, expert mentorship, and hands-on learning experiences.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container-custom mb-24">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-serif mb-6 text-black">Practical learning with <br /> real momentum</h2>
                        <div className="w-20 h-1 bg-gold mb-8"></div>
                        <p className="text-gray-500 mb-6 font-light leading-relaxed">
                            We design every cohort to feel like a launchpad for your next step. Learners work on guided projects, receive thoughtful feedback, and gain confidence through consistent support.
                        </p>
                        <p className="text-gray-500 mb-6 font-light leading-relaxed">
                            From first principles to portfolio-ready outcomes, Cresthour focuses on clarity, discipline, and growth so students can move from curiosity to career readiness.
                        </p>
                        <div className="grid grid-cols-2 gap-8 mt-10">
                            <div>
                                <span className="block text-4xl font-serif text-deepGreen mb-2">10k+</span>
                                <span className="text-xs uppercase tracking-widest text-gray-400">Learners supported</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-serif text-deepGreen mb-2">100+</span>
                                <span className="text-xs uppercase tracking-widest text-gray-400">Hands-on projects</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative h-[600px] bg-gray-100"
                    >
                        <img
                            src="https://images.pexels.com/photos/14016664/pexels-photo-14016664.jpeg"
                            alt="Learners collaborating"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-24">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-3 block">Our philosophy</span>
                        <h2 className="text-4xl font-serif">What makes Cresthour different</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-serif mb-4 text-deepGreen">Practical focus</h3>
                            <p className="text-gray-500 font-light">Every program is built around real tasks, tangible outcomes, and skills you can use immediately.</p>
                        </div>
                        <div className="text-center p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-serif mb-4 text-deepGreen">Mentor guidance</h3>
                            <p className="text-gray-500 font-light">Experienced mentors help learners stay on track, think clearly, and grow with confidence.</p>
                        </div>
                        <div className="text-center p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-serif mb-4 text-deepGreen">Career readiness</h3>
                            <p className="text-gray-500 font-light">We blend concept learning with portfolio building so you are prepared to step forward.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
