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

    if (azureResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, ...data }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    } else {
      const errorData = await azureResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ success: false, error: errorData.error || 'Network response was not ok', ...errorData }),
        { status: azureResponse.status, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
