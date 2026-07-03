import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://www.enlightlab.com",
  "https://voice.enlightlab.com",
];

function getCorsHeaders(origin: string | null) {
  const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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
    console.log("API KEY LOADED:", process.env.RETELL_API_KEY);
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