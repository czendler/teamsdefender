export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { domain } = await request.json();

    if (!domain) {
      return new Response(JSON.stringify({ error: "Missing 'domain' parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Pobieramy kod dostępu z Environment Variables
    const azureFunctionCode = env.columbo_az_func_code;

    if (!azureFunctionCode) {
      return new Response(JSON.stringify({ error: "Missing Azure Function code in environment variables" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // NOWY URL Twojej funkcji Azure
    const apiUrl = `https://columboo.azurewebsites.net/api/httprecon?code=${azureFunctionCode}`;

    const azureResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain })
    });

    const data = await azureResponse.json();

    return new Response(JSON.stringify(data), {
      status: azureResponse.status,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
