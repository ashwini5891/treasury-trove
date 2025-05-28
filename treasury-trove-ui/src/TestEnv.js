import React from 'react';
import { supabase } from './lib/supabase';

function TestEnv() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', whiteSpace: 'pre' }}>
      <h2>Environment Variables Test</h2>
      <p>REACT_APP_SUPABASE_URL: {process.env.REACT_APP_SUPABASE_URL || 'Not set'}</p>
      <p>REACT_APP_SUPABASE_ANON_KEY: {process.env.REACT_APP_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
      
      <h3>Supabase Client Status</h3>
      <p>Supabase Client: {supabase ? 'Initialized' : 'Not initialized'}</p>
      
      <h3>Test Login</h3>
      <button 
        onClick={async () => {
          try {
            console.log('Testing login...');
            const { error } = await supabase.auth.signInWithPassword({
              email: 'test@example.com',
              password: 'test1234',
            });
            console.log('Login test result:', { error });
            if (error) throw error;
            alert('Login test successful!');
          } catch (err) {
            console.error('Login test failed:', err);
            alert(`Login test failed: ${err.message}`);
          }
        }}
      >
        Test Login with Dummy Credentials
      </button>
    </div>
  );
}

export default TestEnv;
