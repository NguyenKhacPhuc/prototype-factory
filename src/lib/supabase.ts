import { createClient } from "@supabase/supabase-js";

// Supabase anon key is public by design — security is enforced via RLS policies
const supabaseUrl = "https://zzpizwyjpsayrrksoxtu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6cGl6d3lqcHNheXJya3NveHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNzY5NDksImV4cCI6MjA4OTY1Mjk0OX0.MutvtkDsREb1mb-kgMd75hC8x_H29NpqdgL3575nQWk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    detectSessionInUrl: true,
    flowType: "implicit",
  },
});
