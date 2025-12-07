import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EcoTrackPro',
  description: 'EcoTrackPro offers small businesses an AI-driven platform to track and reduce their carbon footprint with personalized insights and recommendations, empowering them to make sustainable choices without sacrificing efficiency.',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">EcoTrackPro</h1>
      <p className="mt-4 text-lg">EcoTrackPro offers small businesses an AI-driven platform to track and reduce their carbon footprint with personalized insights and recommendations, empowering them to make sustainable choices without sacrificing efficiency.</p>
    </main>
  )
}
