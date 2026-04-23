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
