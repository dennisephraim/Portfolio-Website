import PageTransition from '@/components/PageTransition';

export default function Projects() {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-6">My Projects</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center">
            Here you'll find a collection of my latest projects and work. 
            Each project represents my passion for creating meaningful solutions.
          </p>
        </div>
      </PageTransition>
    )
}