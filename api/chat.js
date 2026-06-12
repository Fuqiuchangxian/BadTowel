// Vercel Serverless Function - 代理 MiMo API 请求
// 在 Vercel 项目设置中添加环境变量：MIMO_API_KEY = 你的API Key

export async function handler(req, res) {
    // 只允许 POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.MIMO_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'MIMO_API_KEY not configured' });
    }

    try {
        const response = await fetch('https://api.xiaomimimo.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(req.body),
        });

        // 如果是流式响应，直接转发
        if (req.body?.stream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                res.write(chunk);
            }
            res.end();
        } else {
            // 非流式响应
            const data = await response.json();
            res.status(response.status).json(data);
        }
    } catch (error) {
        console.error('API proxy error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}