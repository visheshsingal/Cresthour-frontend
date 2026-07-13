import Link from 'next/link';

const modules = [
    {
        title: 'MERN Stack Development',
        description: 'Learn the complete web development flow using MongoDB, Express, React, and Node.js.',
        points: ['Frontend with React and modern UI patterns', 'Backend APIs with Node.js and Express', 'Database design and CRUD operations with MongoDB']
    },
    {
        title: 'Git & GitHub',
        description: 'Build professional coding habits with version control, branching, pull requests, and collaboration.',
        points: ['Git basics and commit history', 'Branching, merging, and resolving conflicts', 'Remote repositories and GitHub workflows']
    },
    {
        title: 'Technical Knowledge for Servers',
        description: 'Understand how web apps run in real environments, from hosting basics to troubleshooting.',
        points: ['How servers and deployments work', 'Environment variables and project setup', 'Basic debugging and performance awareness']
    },
    {
        title: 'Projects & Deployment',
        description: 'Move from learning to building by creating projects that feel close to real-world work.',
        points: ['Build practical mini-projects', 'Prepare apps for deployment', 'Learn how to present and document your work']
    }
];

const Curriculum = () => {
    return (
        <div className="pt-24 pb-20 bg-white">
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden mb-12 sm:mb-16 lg:mb-20 bg-deepGreen">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/10760867/pexels-photo-10760867.jpeg')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="container-custom relative z-10 text-center text-white py-20 sm:py-24">
                    <div>
                        <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Learning Path</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 leading-tight">Curriculum</h1>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg font-light text-gray-200 leading-relaxed px-2 sm:px-0">
                            A practical roadmap that covers modern web development, Git/GitHub, and the technical foundation behind servers and deployment.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container-custom py-16">
                <div className="grid gap-8 lg:grid-cols-2">
                    {modules.map((module, index) => (
                        <div
                            key={module.title}
                            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
                        >
                            <div className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-3">Module {index + 1}</div>
                            <h3 className="text-2xl font-serif mb-3">{module.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-5">{module.description}</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {module.points.map((point) => (
                                    <li key={point} className="flex items-start gap-2">
                                        <span className="mt-1 text-gold">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 rounded-3xl bg-[#f7f3ea] p-8 md:p-10">
                    <h3 className="text-2xl font-serif mb-3">Who is this for?</h3>
                    <p className="text-gray-700 leading-relaxed max-w-3xl">
                        This curriculum is perfect for students, early-career developers, and anyone who wants to build real web apps using modern tools and get comfortable with the technical side of development.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <Link href="/faq" className="btn-outline-dark">Read FAQs</Link>
                        <a href="https://rzp.io/rzp/Igar24r" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex">Enroll now</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Curriculum;
