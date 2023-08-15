import { Link } from 'react-router-dom'
import { checkPassword } from './password'

const Home = () => {
  checkPassword()
  const links = [
    ['/mouse', 'Mouse'],
    ['/keyboard-mouse', 'Keyboard & Mouse'],
    ['/screen', 'Screen'],
    ['/settings', 'Settings'],
  ]

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <h1 className="text-4xl">Laptop Controller</h1>
      <ul>
        {links.map(([link, page], index) => (
          <li key={index}>
            <Link to={link} className="hover:scale-100">
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
