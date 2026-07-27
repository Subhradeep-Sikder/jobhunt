import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <main className="max-w-md space-y-6">
       
        <p className="text-neutral-400 text-sm leading-relaxed">
          Here the adimn have to render the media fron his api.<br/>
          So connect employer/media to lading/media
          </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-white text-black font-semibold text-sm tracking-wide rounded hover:bg-neutral-200 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}