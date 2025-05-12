import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, zipCode } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const supabaseUrl = 'https://ctlseuuhmtqyiwmkqjwy.supabase.co';
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        { 
          email: email,
          zip_code: zipCode ? parseInt(zipCode, 10) : null
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to submit form' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 