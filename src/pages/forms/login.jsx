/* eslint-disable jsx-a11y/label-has-associated-control */
// login page
import React, { useState } from 'react'

import { login } from '@/components/api/api'

function LoginForm() {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Email:', email, 'Password:', password)
    try {
      const response = await login({
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        console.log('Login successful');
      }
    }catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 theme-zinc">
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-2xl">Login</h3>
        <p className="text-sm text-muted-foreground">Enter your email below to login to your account.</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 pt-0 grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="m@example.com" required="" value={email} onChange={e => setEmail(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
          <input type="password" id="password" required="" value={password} onChange={e => setPassword(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
        <div className="flex items-center p-6 pt-0">
          <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">Sign in</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
