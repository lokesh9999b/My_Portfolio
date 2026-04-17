import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    
    // The payload from a Supabase Database Webhook looks like this:
    // { "type": "INSERT", "table": "contact_submissions", "record": { ... }, "schema": "public", ... }
    const { record } = payload

    if (!record) {
      throw new Error('No record found in payload')
    }

    const { name, email, role_or_project, message } = record

    console.log(`Sending email for contact: ${name} (${email})`)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Lokesh Portfolio <onboarding@resend.dev>',
        to: [Deno.env.get('NOTIFY_EMAIL') || ''], 
        subject: `🌐 Portfolio Lead: ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; color: #ffffff; margin: 0; padding: 40px; }
                .container { max-width: 900px; margin: 0 auto; background-color: #0A0A0A; border: 1px solid #1A1A1A; border-radius: 24px; padding: 50px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                .top-bar { height: 6px; width: 100%; position: absolute; top: 0; left: 0; background: linear-gradient(90deg, #F5C518, #FFD84D); }
                
                .header-section { border-bottom: 1px solid #1A1A1A; padding-bottom: 30px; margin-bottom: 40px; display: table; width: 100%; }
                .header-left { display: table-cell; vertical-align: middle; }
                .header-right { display: table-cell; vertical-align: middle; text-align: right; }
                
                .title { font-size: 28px; font-weight: 800; letter-spacing: -0.01em; margin: 0; }
                .status-pill { display: inline-block; padding: 6px 16px; background: rgba(245, 197, 24, 0.1); color: #F5C518; border-radius: 100px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
                
                .info-grid { display: table; width: 100%; border-collapse: separate; border-spacing: 20px 0; margin: 0 -20px 40px; }
                .info-card { display: table-cell; width: 33.33%; background: #0D0D0D; padding: 25px; border: 1px solid #1A1A1A; border-radius: 16px; }
                
                .label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 10px; }
                .value { font-size: 16px; color: #FFF; font-weight: 500; }
                
                .message-section { margin-top: 20px; }
                .msg-box { background: #0D0D0D; padding: 40px; border: 1px solid #1A1A1A; border-radius: 20px; line-height: 1.8; color: #CCC; font-size: 16px; white-space: pre-wrap; }
                
                .footer { margin-top: 50px; text-align: center; border-top: 1px solid #1A1A1A; padding-top: 30px; color: #333; font-size: 12px; letter-spacing: 1px; }
                .button { display: inline-block; margin-top: 40px; padding: 16px 45px; background: #F5C518; color: #000; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 15px; letter-spacing: 0.5px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header-section">
                  <div class="header-left">
                    <div class="status-pill">Active Lead</div>
                    <h1 class="title">New Client Inquiry</h1>
                  </div>
                  <div class="header-right">
                    <div style="font-size: 14px; color: #444;">Received: ${new Date().toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div class="info-grid">
                  <div class="info-card">
                    <div class="label">Consultant</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="info-card">
                    <div class="label">Contact</div>
                    <div class="value">${email}</div>
                  </div>
                  <div class="info-card">
                    <div class="label">Interest</div>
                    <div class="value">${role_or_project || 'Fullstack Dev'}</div>
                  </div>
                </div>
                
                <div class="message-section">
                  <div class="label" style="padding-left: 10px;">Message from Sender</div>
                  <div class="msg-box">
${message}
                  </div>
                </div>
                
                <center>
                  <a href="mailto:${email}" class="button">START CONVERSATION</a>
                </center>
                
                <div class="footer">
                  SECURE PORTFOLIO TRANSMISSION &bull; LOKESH BOMMAGANI &bull; 2026
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(data)}`)
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
