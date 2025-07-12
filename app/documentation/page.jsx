'use client';
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function DocsPage() {
    const router = useRouter();
    const handleHome = () => {
        router.push("/");
    }
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <header className="text-center py-10 border-b border-gray-700">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white drop-shadow-lg">
          🧠 Saadhna AI Assistant
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Your smart companion for medical guidance & mental wellness.
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">
        {sections.map((section, idx) => (
          <motion.section
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/60 p-6 md:p-10 border border-gray-700 shadow-md"
          >
            <h2
              className={`text-2xl md:text-3xl font-bold mb-4 ${
                section.color
              } drop-shadow-md`}
            >
              {section.icon} {section.title}
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              {section.description}
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-400 space-y-1">
              {section.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>

      <div className='w-[100vw] flex justify-center'>
        <button onClick={handleHome} className='px-3 py-2 bg-sky-700 rounded-md cursor-pointer'>Home</button>
      </div>

      <footer className="text-center text-gray-600 text-sm py-8 border-t border-gray-700 mt-12">
        © 2025 Saadhna AI — Built for Health, Designed for Peace of Mind.
      </footer>
    </main>
  )
}

const sections = [
  {
    icon: '👨‍⚕️',
    title: 'Doctor Assistant',
    color: 'text-teal-400',
    description:
      'Saadhna AI acts as a reliable assistant to doctors, students, and medical professionals — offering precise insights, simplifying prescriptions, and making complex terms easier to understand.',
    points: [
      'Summarize prescriptions instantly',
      'Answer medical queries using trained knowledge',
      'Acts as a support system for diagnosis and clarity',
    ],
  },
  {
    icon: '🧘‍♀️',
    title: 'Saadho – Mental Wellness Companion',
    color: 'text-purple-400',
    description:
      'When life feels heavy, Saadho is your space for emotional grounding. This AI offers positive, therapeutic, and mindfulness-centered responses to support your inner peace.',
    points: [
      'Soothing motivational guidance',
      'Coping help for anxiety, overthinking, sadness',
      'Acts as a digital listener without judgment',
    ],
  },
  {
    icon: '📄',
    title: 'Upload Prescription',
    color: 'text-blue-400',
    description:
      'Easily upload your prescriptions — Saadhna decodes your doctor’s writing and provides a plain-language explanation of your treatment, dosage, and frequency.',
    points: [
      'Text & image recognition',
      'Explains everything simply',
      'Helps patients take better control of health',
    ],
  },
  {
    icon: '💊',
    title: 'Medicine Availability',
    color: 'text-green-400',
    description:
      'Need to locate a medicine nearby or online? Upload a name or image, and Saadhna searches availability in nearby pharmacies and platforms (coming soon).',
    points: [
      'Search via text or image input',
      'Location-aware availability check',
      'Supports common & rare medicines',
    ],
  },
]