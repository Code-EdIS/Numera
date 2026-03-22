import { supabase } from "./supabaseClient.js"

export async function loginUser(email, password) {
  try{
  const {data, error} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  
  if(error){
    return {
    success: false,
    message: error.message,
    }
  }
    return{
    success: true,
    user: data.user,
    }
  }catch(error){
    return{
    success: false,
    message: "errore di connessione",
    }
  }
}

export async function addTransaction(transaction){
  try{
  const {data: {user}} = await supabase.auth.getUser();
  
  const {data, error} = await supabase.from("transactions").insert([
    {
    ...transaction,
    user_id: user.id,
    }
  ])
  
  if(error){
    return{
      success: false,
      messagge: error.message,
    }
  }
  return {success: true}
  }catch(error){
    return{
      success: false,
      messagge: "errore di rete",
    }
  }
}