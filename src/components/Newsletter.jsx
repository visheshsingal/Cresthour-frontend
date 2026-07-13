const Newsletter = () => {
    return (
        <section className="py-24 bg-deepGreen text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="container-custom text-center max-w-3xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Stay ahead in tech</h2>
                <p className="text-gray-300 mb-10 font-light text-lg">Subscribe for latest course updates, practical learning tips, and early access to new programs.</p>
                <form className="flex flex-col sm:flex-row gap-0">
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 transition-colors backdrop-blur-sm"
                    />
                    <button className="bg-white text-deepGreen px-8 py-4 uppercase tracking-widest font-bold hover:bg-gold hover:text-white transition-colors">Subscribe</button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
