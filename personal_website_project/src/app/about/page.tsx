import PageTransition from '@/components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center">
          I'm a passionate Software Engineer with expertise in modern web technologies. 
          I love building innovative solutions and learning new technologies.
        </p>
      </div>
    </PageTransition>
  )
}