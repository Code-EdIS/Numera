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

export async function contaImporto(){
  try{
  const {data: {user}} = await supabase.auth.getUser();
  
  const {data: numbers, error} = await supabase.from("transactions").select("amount, type").eq("user_id", user.id);

  let totale=0;
  
  numbers.forEach( t => {
    if(t.type === "expense"){
      totale -= t.amount;
    }else totale += t.amount;
  })
  
  return totale;
  }catch(error){
    alert(error.message);
    return 0;
  }
}

export async function logout() {
  try{
  const {error} = await supabase.auth.signOut();
  
  if(error){ 
    return{
    success: false,
    message: error.message,
    }} else {
    return{
      success: true
    }}
  }catch(e){
    return { 
      success: false,
      messagge: e.message,
    }
  }
}