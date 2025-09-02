'use client'

import { useState, useEffect } from 'react'
import { Loader2, AlertCircle, School as SchoolIcon } from 'lucide-react'
import SchoolCard from '@/components/SchoolCard'

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/schools')
      const result = await response.json()

      if (result.success) {
        setSchools(result.data)
      } else {
        setError(result.error || 'Failed to fetch schools')
      }
    } catch (err) {
      setError('Failed to fetch schools')
      console.error('Error fetching schools:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Schools</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchSchools}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SchoolIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Our Schools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover educational institutions in your area
          </p>
        </div>

        {schools.length === 0 ? (
          <div className="text-center py-16">
            <SchoolIcon className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No Schools Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              There are no schools in our database yet. Be the first to add one!
            </p>
            <a
              href="/add-school"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add First School
            </a>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Found <span className="font-semibold text-blue-600">{schools.length}</span> school{schools.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {schools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}