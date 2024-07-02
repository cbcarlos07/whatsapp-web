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