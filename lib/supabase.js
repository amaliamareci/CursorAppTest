import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function loginUser(email, password) {
  try {
    console.log('loginUser function called with:', { email, password });

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();

    console.log('Supabase query result:', { data, error });

    if (!data) {
      console.log('No user found');
      throw new Error('Invalid email or password');
    }

    if (error) {
      console.log('Supabase error:', error);
      throw error;
    }

    console.log('Login successful, returning user:', data);
    return data;
  } catch (error) {
    console.log('Error in loginUser:', error);
    throw error;
  }
}

export async function createUser(email, password) {
  try {
    console.log('Attempting to create user with:', { email });

    // First, verify the email doesn't exist
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    console.log('Check existing user result:', { existingUser, checkError });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Create new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        email, 
        password
      }])
      .select()
      .single();

    console.log('Insert result:', { data, error });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log('Error in createUser:', error);
    throw error;
  }
}
