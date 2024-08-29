import { createClient } from "@supabase/supabase-js";
const URL = "https://xoobtxfaxhmjyxmcsrrq.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvb2J0eGZheGhtanl4bWNzcnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3MjczMTUsImV4cCI6MjAyODMwMzMxNX0.928jD353uakw-Z1Oan1wKDe-7xW25tr3a46Q_Jledz0";
export const supabase = createClient(URL, API_KEY);