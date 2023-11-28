Deno.serve(async req => {
  await fetch(Deno.env.get('HEROPAD_API_URL'));
  return new Response();
});
