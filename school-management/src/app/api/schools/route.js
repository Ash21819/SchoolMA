import { NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db'

// GET - Fetch all schools
export async function GET() {
  try {
    const schools = await executeQuery(
      'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY created_at DESC'
    );
    
    return NextResponse.json({
      success: true,
      data: schools
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch schools' 
      },
      { status: 500 }
    );
  }
}

// POST - Add new school
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, address, city, state, contact, image, email_id } = body;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Validate contact number
    if (!/^\d{10}$/.test(contact.toString())) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Contact number must be 10 digits' 
        },
        { status: 400 }
      );
    }

    // Insert school into database
    const result = await executeQuery(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, image, email_id]
    );

    return NextResponse.json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name,
        address,
        city,
        state,
        contact,
        image,
        email_id
      }
    });

  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add school' 
      },
      { status: 500 }
    );
  }
}