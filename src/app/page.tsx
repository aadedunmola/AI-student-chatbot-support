import DemoFlow from '../components/landing/DemoFlow';
import Footer from '../components/landing/Footer';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5fbff]">
      <Header />
      <Hero />
      <DemoFlow />
      <Footer />
    </main>
  );
}
