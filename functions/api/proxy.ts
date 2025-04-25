
interface Env {
  columbo_az_func_code: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const request = context.request;
    const env = context.env;

    // Parse request body
    const data = await request.json();
    
    if (!data.domain) {
      return new Response(
        JSON.stringify({ success: false, error: "Domain is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Call Azure Function with the secret code
    const azureFunctionUrl = `https://columbo.azurewebsites.net/api/dnscheck?code=${env.columbo_az_func_code}`;
    
    const azureResponse = await fetch(azureFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain: data.domain }),
    });

    const azureData = await azureResponse.json();

    // Return the response from Azure Function
    return new Response(JSON.stringify(azureData), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

// Handle CORS preflight requests
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
