Robô WhatsApp


## Links

https://platform.openai.com


Olá! Seja bem-vindo ao assistente virtual da Brito Software. Como posso ajudar você hoje? Você pode escolher uma das opções abaixo para iniciar:\n
\n
*1* - Agendamento de serviços junto à Receita Federal (CPF).\n
*2* - Renovação de CNH, troca de permissão, recuperação de multa e IPVA, Geração de DUDA.\n
*3* - Agendamento do Seguro Desemprego.\n
Escolha a opção que melhor atende às suas necessidades.

## API Botpress

    http://127.0.0.1:3000/api/v1/bots/bot-zdg/converse/5522981290226

    {{ $json["body"]["from"].split("@c.us") }}

## Problema no WhatsApp-web.js

Error: Evaluation failed: TypeError: Cannot read properties of undefined (reading 'push')
    at fillModuleArray (eval at <anonymous> (:2:5), <anonymous>:6:74)
    at moduleRaid (eval at <anonymous> (:2:5), <anonymous>:15:3)
    at pptr://__puppeteer_evaluation_script__:4:17
    at ExecutionContext._ExecutionContext_evaluate (D:\Documentos\Projetos\whatsapp-web\node_modules\puppeteer-core\lib\cjs\puppeteer\common\ExecutionContext.js:229:15)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async ExecutionContext.evaluate (D:\Documentos\Projetos\whatsapp-web\node_modules\puppeteer-core\lib\cjs\puppeteer\common\ExecutionContext.js:107:16)
    at async Client.initialize (D:\Documentos\Projetos\whatsapp-web\node_modules\whatsapp-web.js\src\Client.js:340:9)

Resolvido instalando a versão

    npm install github:pedroslopez/whatsapp-web.js#webpack-exodus

# PRoblema
Quando der esse problema

    ProtocolError: Protocol error (Runtime.callFunctionOn): Execution context was destroyed

Remover a pasta

.wwebjs_auth e a .wwebjs_cache

# Enviar o QR Para o front

2

You're registering a callback that sends the qr when the "qr" event is emitted. The res.status(200) is executed before the event is emitted (Even if it is emitted immediately the callback will be executed after the rest of the function since Node is single threaded).

I'm not familiar with the whatsapp package but if you know the qr event will only be emitted once or you only need the first emission you can wrap it in a promise.

Try

router.get('/', async (req, res) => {
    const client = new Client(...)
    let qr = await new Promise((resolve, reject) => {
        client.once('qr', (qr) => resolve(qr))
    })
    res.send(qr)
}
Notice, I used client.once so the callback is unregistered from the client's event after one event is emitted to prevent memory leaks.

It is a good practice to add a reject scenario to prevent cases the promise doesn't resolve

router.get('/', async (req, res) => {
    try {
        const client = new Client(...)
        let qr = await new Promise((resolve, reject) => {
            client.once('qr', (qr) => resolve(qr))
            setTimeout(() => {
                reject(new Error("QR event wasn't emitted in 15 seconds."))
            }, 15000)
        })
        res.send(qr)
    } catch (err) {
        res.send(err.message)
    }
}