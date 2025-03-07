export async function json(req, res) {
    const buffers = [];

    for await (let chunk of req) {
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }

    return res.setHeader('Content-Type', 'application/json');
}
