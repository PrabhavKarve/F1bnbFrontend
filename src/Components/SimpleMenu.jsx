'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import '../index.css'

export default function SimpleMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="simple-menu">
      <button className="simple-menu__button" onClick={toggleMenu} aria-haspopup="true" aria-expanded={isOpen}>
        <Menu size={24} color='#ad0bde'/>
      </button>
      <div className={`simple-menu__dropdown ${isOpen ? 'simple-menu__dropdown--open' : ''}`}>
        <a href="#profile" className="simple-menu__item">Profile</a>
        <a href="#logout" className="simple-menu__item">Logout</a>
      </div>
    </div>
  )
}

