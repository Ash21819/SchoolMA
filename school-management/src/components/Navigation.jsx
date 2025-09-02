import Link from 'next/link'
import { School, Plus, List } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <School className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                School Management
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/addSchool" 
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
              <span>Add School</span>
            </Link>
            
            <Link 
              href="/showSchools" 
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              <List className="h-4 w-4" />
              <span>Show Schools</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}