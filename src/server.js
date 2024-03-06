import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iekbropydvhnzsaadpga.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlla2Jyb3B5ZHZobnpzYWFkcGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0OTc2NDEsImV4cCI6MjAyNTA3MzY0MX0.WKa0arNBh_eVTw7wwM8e8wE1IebIAhg5eXNk2ovG3RA'

export const supabase = createClient(supabaseUrl, supabaseKey)