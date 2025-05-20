import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header />
      <main className="flex-grow w-screen p-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

