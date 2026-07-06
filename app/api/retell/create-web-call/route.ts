import { NextResponse } from "next/server";

function getCorsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    const { agentId, dynamicVariables } = await req.json();
    
    const response = await fetch(
      "https://api.retellai.com/v2/create-web-call",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
          retell_llm_dynamic_variables: dynamicVariables,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { headers: corsHeaders });

  } catch (error) {
    console.error("Retell Error:", error);

    return NextResponse.json(
      {
        error: "Failed to create call"
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}