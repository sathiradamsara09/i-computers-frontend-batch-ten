
export default function LandingPage() {
    return (
        <div className="w-full h-full relative">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/1080p.mp4" type="video/mp4" />
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex flex-col justify-center items-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to iComputer Store!</h1>
                <p className="text-lg md:text-2xl text-gray-300 mb-8">Your one-stop shop for all computer needs</p>
                <a href="/products" className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-primary-dark">
                    View Products
                </a>
            </div>
        </div>
    );
}
