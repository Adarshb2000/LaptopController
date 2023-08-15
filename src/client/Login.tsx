import { useState } from 'react'
import { websitePassword } from './password'

const Login = () => {
  const [password, setPassword] = useState('')

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form
        className="w-80 h-80 bg-secondary flex flex-col justify-center p-4 gap-5 rounded-xl"
        onSubmit={(e) => {
          e.preventDefault()
          if (password !== websitePassword) alert('Invalid password')
          else {
            localStorage.setItem('password', websitePassword)
            window.location.href = '/'
          }
        }}
      >
        <label htmlFor="password" className="inline-flex gap-2 items-center">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </label>
        <button className="w-full bg-accent rounded-xl">Submit</button>
      </form>
    </div>
  )
}

export default Login
