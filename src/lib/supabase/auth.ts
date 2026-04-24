import { createClient } from "./client";

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    },
  });

  return { data, error };
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  return { error };
}
