import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-9xl font-extrabold text-black mb-4">404</h1>
          <h2 className="text-2xl font-bold text-black mb-6">Page Not Found</h2>
          <p className="text-gray-500 mb-10 max-w-md text-center">
            Sorry, we couldn't find the page you were looking for. It might have been removed, renamed, or did not exist in the first place.
          </p>
          <Link
            to="/"
            className="px-8 py-4 bg-white text-white font-bold text-[0.95rem] tracking-[0.08em] uppercase rounded-xl hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5"
          >
            Back to Home
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
