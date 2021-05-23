import Image from 'next/image'

const Footer = (): JSX.Element => {
  return (
    <footer className="text-white w-full bg-black border-solid border-gray-100 flex justify-center items-center h-16">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center"
      >
        @ {new Date().getFullYear()} Powered by{' '}
        <span className="mx-2 h-4 text-white">
          <Image src="/nextjs.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  )
}

export default Footer
