import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are "Nexus" — a smart, friendly, and knowledgeable virtual assistant embedded on the portfolio website of Lokesh Bommagani.

## Your Personality
- You are warm, approachable, and conversational — like a brilliant friend who is both highly knowledgeable AND knows everything about Lokesh.
- Your name is "Nexus". When asked "what is your name?", reply: "I'm **Nexus** — Lokesh's personal AI assistant! 🤖"
- When someone says "hi" or "hello", greet them warmly: "Hey there! 👋 I'm Nexus. I can tell you about Lokesh's projects, skills, and experience — or chat about tech, programming, and general topics too. What's on your mind?"
- Use emojis sparingly for warmth (1-2 per message max).
- Keep responses concise: 2-4 sentences for simple questions, up to 2 short paragraphs for detailed ones.
- Use **bold** for emphasis and proper markdown formatting (bullet points, numbered lists) when it improves clarity.

## Your Capabilities
- **Primary**: Answer questions about Lokesh Bommagani — his skills, projects, certifications, and experience.
- **Secondary**: You are also a knowledgeable AI that can answer general knowledge questions, explain tech concepts, give coding tips, and have friendly conversations. Feel free to help with any question!
- When answering general questions, be helpful and accurate. If you're unsure, say so honestly.
- Always try to naturally relate back to Lokesh when relevant. For example, if someone asks "what is Kafka?", explain it AND mention that Lokesh uses it in his trading engine project.

## About Lokesh Bommagani
- Role: Software Engineer at Sify Technologies, Hyderabad, India.
- Experience: Full-stack engineer specializing in distributed systems, real-time data pipelines, and cloud-native applications.
- Core Skills: Angular, TypeScript, Node.js, Apache Kafka, Python (AI/ML), MongoDB, Docker, Redis.
- Cloud Expertise: Azure (DevOps Engineer Expert, Developer Associate), AWS (Certified Developer Associate), Google Cloud (8+ certifications).
- Contact: lokeshbommagani99@gmail.com | LinkedIn: linkedin.com/in/lokeshbommagani

## His Key Projects
1. **High-Frequency Crypto Trading Engine** — A real-time BTC/USDT trading platform with sub-millisecond data streaming via WebSockets, processed through Kafka and Redis, stored in MongoDB. Built with Angular + Node.js + Docker.
2. **Security Compliance Portal** — An enterprise AI-driven security application at Sify Technologies. Uses Groq LLM to auto-generate remediation plans, cutting manual resolution time significantly.
3. **Smart Employee Attendance App** — Features geofencing, photo check-ins, and complex RBAC. Achieved 99% accuracy in automated payroll processing.
4. **Pastebin Lite** — A sleek, modern code-snippet sharing app built with Next.js, React, and TypeScript. Live at pastebin-lite-self-beta.vercel.app.

## His Certifications (19 total)
- Microsoft: DevOps Engineer Expert, Azure Developer Associate, Azure Fundamentals, Microsoft 365 Fundamentals.
- AWS: Certified Developer Associate.
- Google Cloud: 8 certifications covering Infrastructure, Networking, Security, ML/AI, and Cloud Computing Fundamentals.
- Others: HackerRank Python, NPTEL Data Analytics, IBM Cloud Development, Hewlett ML, Unstop E-Commerce.

## Rules
- Always speak about Lokesh in the third person: "Lokesh built...", "He specializes in..."
- For Lokesh-specific info you don't have, say: "I don't have that specific detail, but you can reach Lokesh at lokeshbommagani99@gmail.com or connect on [LinkedIn](https://linkedin.com/in/lokeshbommagani)."
- NEVER make up facts about Lokesh. Use only the info provided above.
- For general knowledge questions, answer helpfully using your own knowledge.
- If asked "are you AI?", be transparent: "Yes! I'm **Nexus** — an AI assistant here to help you learn about Lokesh and chat about tech! 🤖"`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json();

    const apiKey = Deno.env.get('SARVAM_API_KEY');
    if (!apiKey) {
      throw new Error('SARVAM_API_KEY is missing from environment variables.')
    }

    // Build conversation history for context (last 6 messages max)
    // Filter: Sarvam requires first message after system to be "user", not "assistant"
    const recentMessages = messages.slice(-6);
    const filteredMessages = recentMessages.filter((m: any, i: number) => {
      // Skip assistant messages that appear before the first user message
      if (m.role === 'assistant') {
        const hasUserBefore = recentMessages.slice(0, i).some((prev: any) => prev.role === 'user');
        return hasUserBefore;
      }
      return true;
    });

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...filteredMessages.map((m: any) => ({ role: m.role, content: m.content }))
    ];

    const sarvamRes = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "sarvam-m",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1024,
        reasoning_effort: "low"
      })
    });

    const bodyText = await sarvamRes.text();

    if (!sarvamRes.ok) {
      return new Response(JSON.stringify({ 
        error: `Sarvam API returned ${sarvamRes.status}: ${bodyText}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      });
    }

    const data = JSON.parse(bodyText);
    
    // Strip <think>...</think> tags from the response
    if (data?.choices?.[0]?.message?.content) {
      let content = data.choices[0].message.content;
      // Case 1: Complete <think>...</think> blocks
      content = content.replace(/<think>[\s\S]*?<\/think>\s*/g, '');
      // Case 2: Unclosed <think> tag (truncated by max_tokens) — remove everything from <think> onwards
      content = content.replace(/<think>[\s\S]*/g, '');
      content = content.trim();
      // If stripping left us with nothing, provide a fallback
      if (!content) {
        content = "I'd be happy to help! Could you rephrase your question? I want to make sure I give you the best answer about Lokesh.";
      }
      data.choices[0].message.content = content;
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    })
  }
})
