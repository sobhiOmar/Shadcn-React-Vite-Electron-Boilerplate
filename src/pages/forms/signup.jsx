import React, { useState } from 'react'

import { signup } from '@/components/api/api'

function SignupForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    // check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match')
    }
    // check if password is at least 8 characters
    if (password.length < 8) {
      alert('Password must be at least 8 characters')
    }
    // if all checks pass, submit the
    // print the form data to the console
    console.log('First Name:', firstName)
    console.log('Last Name:', lastName)
    console.log('Email:', email)
    console.log('Password:',password)
    console.log('Confirm Password:',confirmPassword)
    // clear the form
    setPassword('')
    try {
      const response = await signup({
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        // redirect to the login page
      }
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <form onSubmit={handleSubmit} className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name"
      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" />

      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name"
       className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" />

      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
       className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" />

      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" />

      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password"
      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" />

      <button type="submit"
      className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">Submit</button>

    </form>
  )
}

export default SignupForm
