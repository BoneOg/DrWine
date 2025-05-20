import Header from '@/components/header';
import Footer from '@/components/footer';

export default function notfound() {
    return (
        <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
                <p className="text-xl text-gray-700">Page Not Found</p>
            </div>
        </div>
        <Footer />
        </>
    );
}
