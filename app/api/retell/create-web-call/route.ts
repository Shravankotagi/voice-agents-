import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { agentId } = await req.json();

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
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error("Retell Error:", error);

    return NextResponse.json(
      {
        error: "Failed to create call"
      },
      {
        status: 500
      }
    );
  }
}


