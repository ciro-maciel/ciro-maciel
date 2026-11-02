/**
 * The online kit of "IA no primeiro trabalho" (volume 4), as data. The page is
 * pages/BookKit.jsx, at /books/ia-no-primeiro-trabalho/kit.
 *
 * Written on 02/10/2026 from the book and brought to its final text after the
 * review (phase 4, the same day): chapters/o-kit.md (what the kit holds, the
 * tested prompts with [fields], the rule of the open AI, the fake-job
 * checklist, the 2026 values and "Como ler uma lei"), each chapter's "Confira",
 * "Faça agora" and privacy box, chapters/introducao.md,
 * chapters/dez-coisas-que-nunca-se-cola.md, and research/revisao
 * (guia-de-decisoes.md, D1 to D23, and 0-respostas-lote-*.md).
 *
 * Every prompt is the tested form (research/testes/rodar-t*.sh via o-kit.md),
 * word for word, with the material in {fields}; `add` is a chapter's addition
 * that was NOT tested. Each `result` is the count the book gives, as o-kit.md
 * words it after the review. Templates the book marks as not tested say so.
 *
 * The rule of the open AI is D1, worded as in o-kit.md and the introduction.
 * The fake-job checklist follows D6 (a job site may ask for the CPF; the sign
 * is payment, or a document photo, selfie, account data or password sent by
 * message before any hiring) and has no "uniforme" (research/contexto.md
 * §1a.1 marks it unverified). "Se já pagou" follows D7, with the MED worded
 * and sourced as in volume 1 (certbr-golpes-o-que-fazer-2026).
 *
 * The 2026 values come from o-kit.md, "Os valores de 2026" (official pages
 * opened on 02/10/2026); the training settings, from o-kit.md, "O treino com
 * as suas conversas" (pages checked on 24/09/2026 for the volume 1 kit).
 *
 * Final pass (04/10/2026), against o-kit.md: the messages prompt back to the
 * tested form (t06, situation 1), the note on the chapter 4 prompt, the salary
 * row of the checklist template (a floor, not a ceiling), and § 1º of art. 10
 * in the internship ruler; the notes of what you did join "what may go"
 * (author's decision, as in chapter 11's privacy box).
 *
 * Live: the book is in data/books.json, and the catalogue entry is what
 * BookKit uses. `preview` below is only the development stand-in.
 *
 * Review of 04/10/2026, against o-kit.md and the chapters: the prompts, `add`,
 * results, 2026 values, laws and links checked; screen text clarified where a
 * claim went past the book (the CNPJ check is what the test AI could not do).
 */

export const TASKS = [
    { id: "vaga", chap: "Capítulo 1", name: "Achar vaga e reconhecer vaga falsa",
      tpl: "Tô procurando {procuro} e achei esses anúncios. Para cada um, me diga: 1) o que o anúncio diz (só o que está escrito); 2) se tem sinal de golpe, qual é, citando o trecho; 3) o que não dá para saber só pelo texto (por exemplo, se a empresa existe) e como eu confiro. Separe o que está no anúncio do que você está supondo, e não afirme nada sobre as empresas que não esteja escrito.\n\n{anuncios}",
      fields: [
        { k: "procuro", label: "O que você procura", ph: "o meu primeiro trabalho" },
        { k: "anuncios", label: "Os anúncios", ph: "cole os anúncios, sem nenhum documento seu", area: true, hint: "Cole o texto do anúncio, nunca o seu documento, a sua selfie ou o seu dado de conta." }
      ],
      checks: ["A empresa e a vaga, por fora: a empresa existe e o endereço bate?", "A vaga está no site oficial da empresa ou na página da plataforma, com o endereço digitado por você?", "Um pedido de dinheiro: curso, exame, inscrição, \"taxa de cadastro\"", "Um pedido de foto de documento, selfie, dado de conta ou senha por mensagem, antes de qualquer contratação", "Um contato só por mensagem, com pressa", "Toda regra de lei citada, no artigo, no planalto.gov.br", "O salário do aprendiz: a lei garante um piso, o salário mínimo hora, e não fixa um teto"],
      result: "No teste, 36 de 36 classificações certas; com este pedido, 0 afirmação sobre as empresas fora do texto, contra 2 no pedido natural. O piso do salário do aprendiz saiu como teto em 5 de 6 respostas, 2 delas com este pedido.",
      privacy: "Ao pedir ajuda à IA, cole o anúncio, nunca o seu documento. Se o anúncio chegou como imagem, ela pode ir, cortada sem o nome e o número de quem encaminhou; com imagem, o pedido não foi testado. O checklist da vaga de verdade está em Modelos, e o que fazer se você já pagou ou mandou documento, mais abaixo." },
    { id: "curriculo", chap: "Capítulo 2", name: "Currículo sem inventar nada",
      tpl: "Faça meu currículo para essa vaga. Use só o que eu disse; marque com [?] o que faltar; não acrescente experiência, curso, nota ou habilidade que eu não disse.\nMeu perfil: {perfil}\nA vaga: {vaga}",
      fields: [
        { k: "perfil", label: "O seu perfil", ph: "o que você fez, onde, desde quando e com que frequência, sem CPF, RG nem endereço", area: true, hint: "Escola, bico, família, voluntariado, curso: cada um com o verbo do que você fazia de verdade." },
        { k: "vaga", label: "A vaga", ph: "cole o anúncio", area: true }
      ],
      checks: ["Cada linha contra o que você disse", "Tarefa que você não fez, ou o que você faz com nome maior: \"fico no caixa\" não vira \"fechamento do caixa\"", "Data que você não deu", "Qualidade que você não disse: para cada uma que ficar, um exemplo seu", "O cabeçalho: no teste do capítulo 11, a IA recebeu o nome e o e-mail da conta e os usou; confira o que ela escreveu sobre você", "Os requisitos da vaga que ela respondeu por você, como uma disponibilidade de horário", "Preencha você o que ficou com [?]: o nome da loja, o ano, o telefone e o e-mail"],
      result: "No teste, 30 informações fora do perfil em 3 currículos sem a regra; com a regra, 4 em 3, e nenhuma atividade inventada.",
      privacy: "Nome, telefone, e-mail, bairro e cidade bastam para chamarem você. Foto de documento, RG e endereço completo ficam para a admissão; o cadastro de um site de vagas conhecido, aberto por você digitando o endereço, pode pedir o número do CPF, e isso é normal. Ao pedir ajuda à IA, não cole CPF nem endereço. O modelo de currículo está em Modelos." },
    { id: "entrevista", chap: "Capítulo 3", name: "Preparar a entrevista",
      tpl: "Vou fazer entrevista para {vaga}. A empresa é a {empresa}, de {cidade}. Me dê 10 perguntas que costumam fazer nessa entrevista e, para 3 delas, a resposta que eu posso dar. Nas respostas, use só experiências que estão no meu perfil; onde faltar alguma coisa, marque [falta: ...] em vez de inventar. Não diga nada sobre a empresa que eu não tenha dito.\nMeu perfil: {perfil}",
      fields: [
        { k: "vaga", label: "A vaga", ph: "a vaga" },
        { k: "empresa", label: "A empresa", ph: "nome" },
        { k: "cidade", label: "A cidade", ph: "cidade" },
        { k: "perfil", label: "O seu perfil", ph: "o que você fez, sem documento e sem contato", area: true }
      ],
      checks: ["Cada frase, como quem vai ser perguntado sobre ela: eu consigo contar um caso disso?", "Cada verbo que diz o que você faz: se é o que você disse, fica; se você não consegue contar um caso, sai", "As palavras que crescem: \"organizo\", \"controlo\", \"cuido de\", \"sozinha\" ou \"sozinho\", \"por conta própria\", \"tenho facilidade para\"", "Cada [falta] preenchido com um caso seu", "O que você disser da empresa, na fonte dela, com a anotação de onde tirou", "Treine em voz alta, com as suas palavras, sem decorar o texto da IA"],
      result: "No teste, experiência que a candidata não tinha em 6 de 9 respostas sem a regra; com a regra, 2 de 9.",
      privacy: "Para preparar a entrevista, a IA precisa do que você fez, não de quem você é no papel: sem CPF, RG, endereço nem telefone." },
    { id: "siglas", chap: "Capítulo 4", name: "O primeiro dia e a língua da empresa",
      tpl: "Começo {quando} como {cargo} num {lugar}. O que significam essas siglas e termos? Para cada um, diga se é comum no comércio ou se pode ser interno da empresa. Se puder ser interno, diga que não dá para saber pelo texto, não chute o significado, e me diga o que perguntar no primeiro dia e a quem.\n\n{lista}",
      fields: [
        { k: "quando", label: "Quando você começa", ph: "quando" },
        { k: "cargo", label: "O cargo", ph: "cargo" },
        { k: "lugar", label: "O tipo de lugar", ph: "tipo de lugar" },
        { k: "lista", label: "As palavras", ph: "a lista das palavras que você não entendeu, sem o texto do manual e sem o nome da empresa", area: true, hint: "O manual é material da empresa: na IA aberta, só a lista de palavras. Um código de segurança, nem solto." }
      ],
      checks: ["Toda sigla que ganhou nome por extenso: o nome veio do manual?", "Se não veio, é palpite até alguém da empresa confirmar", "Um nome por extenso conta como explicação, mesmo com \"provável\" no título ou um aviso genérico no fim", "Os termos do comércio: confira no primeiro uso, vendo como a loja faz", "Junte as perguntas sugeridas, cada uma com a pessoa a quem perguntar", "Acrescente, por escrito, a quem responde pela loja: \"Para eu não errar: posso usar IA no trabalho? Qual, em que conta e para quê?\""],
      result: "No teste, as siglas internas foram explicadas com confiança em 9 de 9 respostas sem a regra, e em 0 de 9 com ela; 0 erro nos 42 termos comuns. No teste, o pedido dizia também \"e recebi esse trecho do manual de integração\", e o trecho de um manual inventado foi colado inteiro; só com a lista de palavras, o pedido não foi testado.",
      privacy: "O manual é material da empresa: sem o ok dela por escrito, não vai para IA nenhuma, e com o ok, só na conta que ela indicar. Não fotografe nem cole as páginas numa IA aberta, nem na do WhatsApp. O glossário em três colunas e a mensagem para pedir o ok estão em Modelos." },
    { id: "instrucao", chap: "Capítulo 5", name: "Anotar a instrução e pedir ajuda",
      tpl: "Comecei {quando} como {cargo} num {lugar} e {tarefa}. Transforma isso num checklist pra eu seguir. Não complete o que ela não disse: o que ficou faltando ou ficou vago, liste no fim como pergunta para eu fazer à supervisora.\n\n{fala}",
      fields: [
        { k: "quando", label: "Quando você começou", ph: "quando" },
        { k: "cargo", label: "O cargo", ph: "cargo" },
        { k: "lugar", label: "O tipo de lugar", ph: "tipo de lugar" },
        { k: "tarefa", label: "A tarefa", ph: "a tarefa", hint: "No teste: \"hoje vou fechar o caixa sozinho pela primeira vez\"." },
        { k: "fala", label: "A fala", ph: "cole a fala, como a pessoa disse, sem nenhum valor real", area: true, hint: "As palavras dela, não o seu resumo: é nelas que o vago aparece." }
      ],
      checks: ["Cada caixinha com quem, quanto, quando e onde", "Se a resposta não está no que a supervisora disse, a caixinha é uma pergunta", "O passo que nenhuma pergunta cobre: o que aparece pronto no meio do caminho?", "O checklist diz o que a supervisora disse, não o que a IA achou melhor", "Pergunte também: quem responde pela diferença do caixa, e isso está no contrato?", "Leve as perguntas antes do turno, numa mensagem só", "Escreva as respostas no item certo e mostre a versão final à supervisora"],
      result: "No teste, 0 palpite em 18 lacunas; sem a regra, 0 de 9 lacunas marcadas; com a regra, duas das três lacunas em 3 de 3, e a terceira só em parte.",
      privacy: "O jeito de fazer da loja só vai para uma IA com o ok da loja por escrito, de quem responde por ela, na conta que ela indicar; no capítulo, a mensagem da supervisora que responde pelo caixa é esse ok. Sem o ok, faça o checklist à mão. Em nenhuma IA vão os valores do caixa do dia, o relatório do sistema, o resumo da maquininha, a foto da folha, o comprovante de Pix com nome de cliente, a senha ou a combinação do cofre." },
    { id: "mensagens", chap: "Capítulo 6", name: "Mensagens de trabalho",
      tpl: "{fatos} Meu {chefe} é o {nome} e a gente se fala pelo WhatsApp. Escreve a mensagem pra eu mandar pra ele. Use só o que eu disse: não invente motivo nem detalhe e não prometa nada que eu não disse.",
      fields: [
        { k: "fatos", label: "Os fatos, em três linhas", ph: "O que aconteceu e o que você precisa, em três linhas.", area: true, hint: "O que aconteceu, o que você precisa e o que você oferece, se oferece. Decida a terceira linha antes de pedir." },
        { k: "chefe", label: "Quem é", ph: "supervisor" },
        { k: "nome", label: "O nome", ph: "nome" }
      ],
      checks: ["Toda frase que não está nas suas três linhas: um motivo, um fato ou uma promessa que você não deu", "As palavras de compromisso: \"compensar\", \"repor\", \"adiantar\", \"deixar tudo em dia\", \"à disposição\", \"aviso quando chegar\", \"não vai se repetir\"", "Todo fato que não aconteceu, como \"Já te avisei assim que soube\"", "Oferta só a que você decidiu, com dia e hora", "A abertura e o fecho com as suas palavras", "Aprendiz: a lei proíbe passar do horário e compensar o tempo depois (CLT, art. 432); desconto e banco de horas, pergunte ao RH"],
      result: "No teste, 0 motivo inventado em 18 mensagens; promessa que a pessoa não fez em 5 de 9 sem a regra e em 2 de 9, leves, com ela.",
      privacy: "Para avisar a falta, basta dizer que pegou atestado. O que você tem não entra na mensagem nem na IA: não cole o atestado em IA nenhuma, nem na do WhatsApp. Um modelo para cada situação está em Modelos." },
    { id: "planilha", chap: "Capítulo 7", name: "A planilha do dia",
      tpl: "Trabalho num {lugar} e {quem} me passou a planilha de {oque} pra eu {fazer}. Confere essa planilha pra mim.\n\n{linhas}",
      add: "Separe o que é erro do que é só observação. Não diga que uma linha está certa; liste o que você não conferiu.",
      fields: [
        { k: "lugar", label: "Onde você trabalha", ph: "lugar" },
        { k: "quem", label: "Quem passou a planilha", ph: "quem" },
        { k: "oque", label: "Planilha de quê", ph: "o quê" },
        { k: "fazer", label: "O que fazer com ela", ph: "o que fazer com ela" },
        { k: "linhas", label: "As linhas", ph: "cole as linhas, sem as colunas de cliente e de fornecedor", area: true, hint: "Deixe só o que se confere: código, produto, quantidade, validade. E só numa IA com o ok da empresa por escrito." }
      ],
      checks: ["\"Sem problemas\", \"está OK\", \"demais linhas conferem\": confira você, coluna por coluna", "Na quantidade, o número que destoa", "Na validade, o dia que não existe (31/09, 31/04, 30/02)", "No código, o mesmo número duas vezes", "Conte o que ela anunciou: \"4 problemas\" são quatro?", "Separe erro de observação", "\"Exclua\", \"remova\", \"apague\": vira pergunta a quem fez a planilha", "Se a validade importa, ponha a data de hoje no pedido: a IA do seu aplicativo pode não saber o dia"],
      result: "No teste, 11 de 12 armadilhas achadas em 3 rodadas; numa, a quantidade errada passou entre as linhas \"sem problemas\"; em 2 de 3, a ordem de apagar a linha repetida sem confirmar.",
      privacy: "A planilha é da loja: só vai para uma IA com o ok da empresa por escrito, na conta que ela indicar, e sem as colunas de cliente e de fornecedor. Sem regra, pergunte uma vez, por escrito; até a resposta, confira à mão, coluna por coluna. Não apague linha nem lance \"corrigido\". A mensagem à encarregada está em Modelos." },
    { id: "balcao", chap: "Capítulo 8", name: "Atender no balcão, no caixa e no telefone",
      tpl: "Comecei {quando} numa {loja}. Os clientes me fazem essas perguntas. O que eu respondo pra cada cliente? Use só esta política da loja. Não afirme nada sobre a lei e não prometa nada que não esteja nela; quando a política não responder, diga que vou chamar o gerente.\nPolítica de trocas da loja: {politica}\nPerguntas: {perguntas}",
      fields: [
        { k: "quando", label: "Quando você começou", ph: "quando" },
        { k: "loja", label: "A loja", ph: "loja", hint: "O tipo basta: \"loja de roupas e eletrônicos\"." },
        { k: "politica", label: "A política de trocas", ph: "cole a política", area: true, hint: "Se está afixada para o cliente, é pública e pode ir. Manual interno só vai para uma IA com o ok da empresa por escrito." },
        { k: "perguntas", label: "As perguntas", ph: "as perguntas, como o cliente fala, sem nome, CPF nem telefone", area: true }
      ],
      checks: ["Cada resposta contra a folha da política", "Lei citada, prazo, valor e \"pode deixar\"", "Toda lei citada no texto do artigo, no planalto.gov.br (o CDC é a Lei 8.078/1990)", "Na página, procure \"Art. 18\" com a busca do navegador; no celular, \"Localizar na página\"", "O número do artigo não prova nada: o que prova é o texto dele", "O que ela não perguntou ao cliente, e a política pede", "Chame o gerente: pedido de dinheiro de volta, lei citada ou caso que a folha não responde"],
      result: "No teste, sem a política, 3 regras que o CDC não diz, 1 artigo trocado e 3 promessas em nome da loja, em 24 respostas; com a política e a regra, 0 e 0.",
      privacy: "Nome, CPF, telefone e endereço do cliente não vão para a IA aberta: a pergunta basta, sem quem perguntou. Procurar a compra pelo CPF se faz no sistema da loja, nunca numa conversa com a IA." },
    { id: "holerite", chap: "Capítulo 9", name: "Contrato e holerite: o holerite",
      tpl: "Recebi meu holerite de {mes}. Me explica cada linha e confere se está certo. Diga de onde vem cada regra (a lei ou a norma); o que você não tiver certeza, marque para eu conferir no RH ou na lei.\n\n{linhas}",
      fields: [
        { k: "mes", label: "O mês", ph: "mês" },
        { k: "linhas", label: "As linhas do holerite", ph: "digite as linhas: código, descrição, referência e valor, e o rodapé com as bases, sem nome, CPF, matrícula, empresa nem banco", area: true, hint: "Digite, não mande print nem foto: eles levam tudo, inclusive o que você não viu." }
      ],
      checks: ["A conta, na tabela do ano (os valores de 2026 estão mais abaixo)", "O INSS por faixas: cada pedaço do salário paga a alíquota da sua faixa", "A tabela do INSS, na página do INSS, e não na Lei 8.212/1991", "Cada lei citada, no planalto.gov.br, pelo número", "Se a página diz \"Revogado\", a regra não vale mais daquele jeito: no teste, as três citaram o decreto revogado do vale-transporte", "O artigo citado diz o que a resposta afirma?", "O valor a cobrar é o que você conferiu na tabela, nunca o da IA", "Achou um erro: mensagem ao RH, por escrito, com a linha e a conta"],
      result: "No teste, o desconto errado foi achado em 0 de 3 respostas ao \"tá certo?\" e em 3 de 3 com este pedido. Mas o valor a cobrar saiu errado nas 3, e cada resposta trouxe de 7 a 9 valores ou regras errados ou desatualizados, quase todos na fonte citada.",
      privacy: "O holerite vai sem nome, CPF, matrícula, empresa e dados do banco; os números podem ir. A IA do WhatsApp também é uma IA aberta, e o cuidado é o mesmo. A conferência linha por linha e a mensagem ao RH estão em Modelos." },
    { id: "estagio", chap: "Capítulo 9", name: "Contrato e holerite: o termo de estágio",
      tpl: "Vou assinar meu termo de estágio. Tem algo errado aqui?\n\n{clausulas}",
      fields: [
        { k: "clausulas", label: "As cláusulas", ph: "cole as cláusulas, sem os seus dados", area: true }
      ],
      checks: ["Cada cláusula apontada, no artigo da Lei 11.788/2008", "Jornada: até 6 horas por dia e 30 por semana no ensino médio regular, no superior e na educação profissional de nível médio (art. 10, II)", "Nos períodos de avaliação, a carga reduzida \"pelo menos à metade, segundo estipulado no termo de compromisso\" (art. 10, § 2º)", "Bolsa e auxílio-transporte no estágio não obrigatório (art. 12)", "Recesso, seguro e duração (arts. 13, 9º, IV, e 11)", "A cláusula que a IA não apontou também se lê"],
      result: "No teste, a cláusula contra a lei foi achada em 3 de 3, com o artigo certo; o caso era claro, e uma cláusula ambígua não foi testada. O contrato de aprendiz não foi testado; a régua dele está nesta página, em \"O contrato de aprendiz\".",
      privacy: "Do contrato, vai a cláusula, sem os seus dados." },
    { id: "aprender", chap: "Capítulo 10", name: "Aprender o que o trabalho pede",
      tpl: "Comecei a trabalhar {onde} e preciso aprender {oque}. Use {qual}. Me faça perguntas, uma de cada vez, e não me dê a resposta antes de eu tentar.\n\n{exemplo}",
      fields: [
        { k: "onde", label: "Onde", ph: "onde", hint: "No teste: \"no estoque de um mercado\"." },
        { k: "oque", label: "O que aprender", ph: "o quê", hint: "No teste: \"PROCV no Excel\"." },
        { k: "qual", label: "Como chamar o exemplo", ph: "este exemplo", hint: "No teste: \"esta tabela\"." },
        { k: "exemplo", label: "O exemplo", ph: "um exemplo com dados de mentira", area: true, hint: "Uma cópia com dados inventados, nunca a planilha da loja." }
      ],
      checks: ["Quantas vezes ela deu a resposta antes de você tentar", "Se adiantar demais, diga \"uma dica por vez\"", "Escreva a sua resposta inteira antes de pedir ajuda, na planilha, não só na cabeça", "Explique com as suas palavras o que cada parte faz", "A fórmula muda com a tabela: confira a ordem das colunas da planilha da loja e conte de novo o número da coluna", "A regra da casa, com quem ensina"],
      result: "No teste, a aula, os 15 exercícios e as 15 correções saíram sem erro, e este pedido segurou a resposta em 3 de 3, na primeira tentativa; uma conversa mais longa não foi testada.",
      privacy: "A planilha do depósito é da loja: só vai para uma IA com o ok da empresa por escrito, na conta que ela indicar. Para treinar, uma cópia com dados de mentira. A regra da casa, como a planilha do seu depósito é usada, se confere com quem ensina." },
    { id: "relatorio", chap: "Capítulo 11", name: "Avaliação, feedback e relatório",
      tpl: "Faz meu relatório de estágio. Use só o que está nas anotações; não acrescente resultado, número ou elogio; marque com [?] o que faltar.\n\n{anotacoes}",
      fields: [
        { k: "anotacoes", label: "As anotações", ph: "cole as anotações: a data e o que você fez, sem nome de cliente nem da empresa", area: true, hint: "Uma linha por dia basta: a data, o que fez, quem pediu, quem conferiu, e o erro também." }
      ],
      checks: ["Adjetivo que ninguém disse: \"significativa\", \"plenamente\", \"com autonomia\"", "Número que não está no seu controle (a carga horária sai do controle de frequência)", "Efeito que ninguém mediu: \"contribuiu para a melhoria\"", "A identificação: no teste, a IA recebeu o nome e o e-mail da conta e os usou; confira o que ela escreveu sobre você", "Preencha você os [?]", "Se o estágio é obrigatório, quem diz é o projeto do curso", "As considerações finais com as suas palavras", "A regra da escola ou da faculdade sobre IA: pergunte ao professor orientador, por escrito"],
      result: "No teste, sem a regra, 4 resultados, 9 elogios e as 390 horas em 2 de 3 respostas; com a regra, 0, 0 e 0, e 20 lacunas [?]. Sem a regra, 2 de 3 respostas puseram na identificação o nome do dono da conta.",
      privacy: "As anotações do que você fez, contadas com as suas palavras, podem ir, sem nome de cliente, CNPJ, valor, documento, senha, certificado digital nem o nome da empresa. A guia, a planilha, o documento do cliente e o que está no sistema são material do trabalho: só vão para uma IA com o ok da empresa por escrito. Se a empresa ou a escola tem regra sobre IA, ela vale também para o relatório. O modelo de relatório está em Modelos." }
  ];

export const TEMPLATES = [
    { id: "ok-ia", kind: "text", title: "A mensagem para pedir o ok da empresa", chap: "Capítulos 4, 5 e 7",
      desc: "Para perguntar uma vez, por escrito, se pode usar IA no trabalho. Um modelo, não testado.",
      text: "Oi, [nome]. Para eu não errar:\n1. Posso usar IA no trabalho? Se puder, qual, e com qual conta?\n2. Que material pode ir para ela: a planilha, o manual, dado de cliente?\n3. As conversas ficam guardadas, e quem na empresa pode ler?\nEnquanto não souber, não ponho nada da loja em IA nenhuma.",
      after: "Até a resposta, nada do trabalho vai; faça à mão, do jeito de antes. Os exercícios do livro e o seu material próprio não dependem de ninguém. Pergunte sem medo: é uma pergunta de quem quer fazer certo." },
    { id: "vaga-falsa", kind: "check", title: "O checklist da vaga de verdade", chap: "Capítulo 1",
      desc: "Antes de se candidatar, e antes de mandar qualquer coisa, procure no anúncio e na conversa.",
      table: [["Sinal", "O que procurar"], ["Pedido de dinheiro", "Curso, exame, inscrição, \"taxa de cadastro\". Nenhuma empresa séria cobra para você participar da seleção"], ["Pedido por mensagem, antes de qualquer contratação", "Foto de documento, selfie segurando o documento, dado de conta ou senha. O cadastro num site de vagas conhecido, aberto por você digitando o endereço, pode pedir o número do CPF, e isso é normal"], ["Contato só por mensagem", "Que você não pediu, com pressa: \"só até sexta\", \"últimas vagas\""], ["Tarefa paga", "Pagam pouco para você curtir, seguir ou avaliar, e depois pedem um depósito para \"liberar\" um ganho maior"], ["Nome de empresa conhecida", "Usado por alguém que fala por mensagem, em nome dela, de uma agência ou de um site de vagas"], ["Salário que não combina", "Muito acima do comum para quase nenhuma exigência. Para aprendiz, a lei garante um piso, o salário mínimo hora, e não fixa um teto"]],
      after: "Uma dessas já é motivo para parar e conferir por fora: a vaga no site oficial da empresa ou na página da plataforma, com o endereço digitado por você; a empresa, se existe e se o endereço bate; a lei citada, no artigo, no planalto.gov.br. Na admissão de verdade, depois da proposta, a empresa que vai registrar você pede documentos para o registro, e nunca cobra. Antes de mandar: já houve entrevista e proposta? Quem pede é a empresa que vai registrar você? É para o registro? Há alguma cobrança? Se uma das três primeiras respostas for não, ou a última for sim, pare e confira por fora." },
    { id: "curriculo", kind: "text", title: "Um currículo sem invenção", chap: "Capítulo 2",
      desc: "Cada linha com o que você fez, onde, desde quando e com que frequência, com o verbo do que você fazia de verdade. O que você não sabe fica com [?] até você conferir.",
      text: "[Seu nome]\n[Bairro e cidade] · [Telefone] · [E-mail]\n\nObjetivo\n[A vaga, como o anúncio chama]\n\nFormação\n[Escola ou curso], [concluído em ou cursando, com o ano]\n\nExperiência\n[O que você fazia, com o verbo certo] · [onde] · [desde quando] · [com que frequência]\nExemplo: caixa eventual, na ausência da responsável · loja de roupas da família · desde [?] · aos sábados\n\nCursos\n[Nome do curso] · [onde] · [carga horária] · [ano]\n\nAtividades voluntárias\n[O que você fazia] · [onde] · [desde quando] · [com que frequência]",
      after: "Sem CPF, RG nem endereço completo: ficam para a admissão; o cadastro de um site de vagas conhecido, aberto por você digitando o endereço, pode pedir o número do CPF, e isso é normal. Foto, só se o anúncio pedir. Qualidade (\"pontualidade\", \"trabalho em equipe\") só entra se você tiver um exemplo para contar na entrevista. Para mandar, o texto vira PDF; pelo aplicativo de mensagens, mande o PDF, não a foto da tela." },
    { id: "glossario", kind: "sheet", title: "O glossário pessoal de siglas", chap: "Capítulo 4",
      desc: "Cole em A1. O termo, o que quer dizer e quem confirmou. Os termos do comércio entram com a explicação da IA, e você confere no primeiro uso; as siglas da empresa entram com a terceira coluna vazia.",
      rows: [["Termo", "O que quer dizer", "Quem confirmou"], ["[termo do comércio]", "[explicação da IA, conferida no primeiro uso]", ""], ["[sigla da empresa]", "", ""], ["[sigla da empresa]", "", ""]],
      after: "A sigla da empresa só ganha explicação quando alguém da empresa explicar: anote na hora, com o nome de quem explicou." },
    { id: "falta", kind: "text", title: "A falta com atestado", chap: "Capítulo 6",
      desc: "Para o privado do chefe, no WhatsApp. Basta dizer que pegou atestado.",
      text: "Bom dia, [nome]. Fui ao médico hoje cedo e peguei atestado de [1 dia], então não vou conseguir trabalhar hoje. [Amanhã eu levo o atestado.]",
      after: "Sem \"Qualquer coisa, estou à disposição\", se você não se ofereceu. O que você tem não entra na mensagem; como entregar o atestado, pergunte ao RH." },
    { id: "atraso", kind: "text", title: "O atraso", chap: "Capítulo 6",
      desc: "Para o privado do chefe, no WhatsApp, assim que você souber.",
      text: "Bom dia, [nome]. Vou me atrasar uns [40 minutos] hoje: [o ônibus quebrou no caminho].",
      after: "Sem \"me comprometo a compensar o tempo\" nem \"já aviso quando estiver chegando\", se você não decidiu isso. Aprendiz não pode compensar o tempo depois (CLT, art. 432): desconto e banco de horas, pergunte ao RH." },
    { id: "sair-cedo", kind: "text", title: "O pedido para sair mais cedo", chap: "Capítulo 6",
      desc: "Um pedido, com o dia, a hora e o motivo, que termina numa pergunta de sim ou não.",
      text: "Oi, [nome]! Tudo bem? Queria te perguntar uma coisa sobre [a sexta-feira, dia 9]. Tenho [prova do meu curso técnico às 17h30] e precisaria sair às [16h] nesse dia. Você consegue liberar?",
      after: "Se quiser oferecer algo, ofereça o que pode cumprir, com dia e hora. \"Posso me organizar\" vira o que o chefe imaginar." },
    { id: "encarregada", kind: "text", title: "A mensagem à encarregada sobre a planilha", chap: "Capítulo 7",
      desc: "O que você achou, linha por linha, como pergunta. Antes de lançar, e sem apagar nada.",
      text: "Bom dia! Antes de lançar [a reposição], achei estas coisas:\n\n1. A linha [14] é igual à [2] ([feijão]), e a [18] é igual à [7] ([leite]). Lanço uma vez só?\n2. [A manteiga], na linha [10], está com [120]. É isso mesmo?\n3. A validade [do sabonete], na linha [11], está [31/09]. Qual é a certa?\n4. [O iogurte] vence dia [25]. Repõe [as 24] assim mesmo?",
      after: "O número certo vem de quem pediu a mercadoria, não do palpite da IA. Quando ela responder, você lança." },
    { id: "holerite-conf", kind: "sheet", title: "A conferência do holerite, linha por linha", chap: "Capítulo 9",
      desc: "Cole em A1. Uma linha do holerite por linha da planilha, digitada por você, com a regra de onde ela vem e a conta refeita na tabela do ano.",
      rows: [["Linha do holerite", "Código", "Referência", "Valor no holerite", "Como se confere", "Fonte", "A sua conta", "Bate?"], ["Salário", "", "", "", "Aprendiz: horas do mês × salário mínimo hora, com as horas do curso dentro", "Decreto do salário mínimo do ano; CLT, art. 428, § 2º; Decreto 9.579/2018, art. 62", "", ""], ["INSS", "", "", "", "Por faixas: cada pedaço do salário paga a alíquota da sua faixa", "Tabela do INSS do ano, na página do INSS", "", ""], ["Vale-transporte", "", "", "", "Até 6% do salário básico", "Lei 7.418/1985, art. 4º; Decreto 10.854/2021, art. 114", "", ""], ["IRRF", "", "", "", "Base: salário menos INSS; tabela da Receita e redução da Lei 15.270/2025", "Tabela da Receita do ano", "", ""], ["FGTS (rodapé)", "", "", "", "Não é desconto: 8%, ou 2% no contrato de aprendizagem", "Lei 8.036/1990, art. 15 e § 7º", "", ""]],
      after: "Sem nome, CPF, matrícula, empresa nem banco. Linha que não está aqui, como descanso semanal remunerado, hora extra ou falta: pergunte ao RH como foi calculada. Os valores de 2026 estão mais abaixo, com a data em que foram conferidos." },
    { id: "rh", kind: "text", title: "A mensagem ao RH sobre um erro no holerite", chap: "Capítulo 9",
      desc: "Por escrito, com a linha, a conta e o que você pede.",
      text: "Olá. Conferindo meu holerite de [setembro], vi que o [INSS (código 310)] foi calculado com [9% sobre o salário inteiro]. Pela tabela de [2026], o cálculo é [por faixas], e cheguei a [R$ 142,19]. Vocês podem conferir e me dizer como fica a diferença?",
      after: "Use o número que você conferiu na tabela, nunca o da IA: no teste, ele saiu errado nas três. Guarde a resposta. Se o RH não resolver, procure o sindicato da sua categoria; se não sabe qual é, pergunte ao RH." },
    { id: "relatorio", kind: "text", title: "Um relatório de estágio", chap: "Capítulo 11",
      desc: "Se a escola tem modelo, use o dela. O que você não sabe fica com [?] até você conferir.",
      text: "RELATÓRIO DE ESTÁGIO\n\nIdentificação\nEstagiário(a): [?]\nCurso: [?]\nInstituição de ensino: [?]\nProfessor(a) orientador(a): [?]\nEmpresa e setor: [?]\nSupervisor(a): [?]\nPeríodo: [de dd/mm/aaaa a dd/mm/aaaa]\nJornada: [horas por dia]\nCarga horária total: [do controle de frequência]\n\nAtividades\n[Data] · [o que você fez] · [quem pediu] · [quem conferiu]\n\nDificuldades e o que aprendi\n[Data] · [o que deu errado] · [o que mudou depois]\n\nAvaliação da supervisão\n[O que a supervisora disse, com as palavras dela]\n\nConsiderações finais\n[Escritas por você, com as suas palavras]\n\n[Local e data]\n[Assinatura do(a) estagiário(a)] · [Visto do(a) supervisor(a)]",
      after: "Sem resultado, número ou elogio que não estejam nas suas anotações. Se o estágio é obrigatório, quem diz é o projeto do curso. A regra da escola ou da faculdade sobre IA vale também: pergunte ao professor orientador, por escrito, se pode usar IA e se precisa dizer que usou." }
  ];

const HOLERITE = "Holerite de setembro de 2026 · Auxiliar administrativo · Contrato CLT · 44 horas semanais\nCódigo | Descrição | Referência | Proventos | Descontos\n001 | Salário-base | 30 dias | 1.850,00 |\n310 | INSS | 9% | | 166,50\n320 | Vale-transporte | 6% | | 111,00\n330 | IRRF | — | | 0,00\nTotal de proventos: 1.850,00 · Total de descontos: 277,50 · Líquido a receber: R$ 1.572,50\nBase INSS: 1.850,00 · Base FGTS: 1.850,00 · FGTS do mês (8%): 148,00 · Base IRRF: 1.683,50";

export const EXERCISES = [
    { id: "e1", chap: "Capítulo 1", title: "O anúncio e a suposição", text: "Junte três anúncios de vaga que você viu esta semana, de qualquer lugar. Cole os três numa IA com o pedido da vaga. Conte quantas afirmações sobre as empresas ela fez que não estão no texto dos anúncios. Se der tempo, escolha uma vaga e confira por fora: a empresa existe, a vaga está no canal oficial? E, se a resposta citou uma regra de lei, procure o artigo, como mostra \"Como ler uma lei\", mais acima.", counts: ["Afirmações sobre as empresas fora do texto", "Regras de lei citadas", "Que dizem o mesmo no artigo"] },
    { id: "e2", chap: "Capítulo 2", title: "O currículo que cresce", text: "Escreva, em até dez linhas, o que você já fez: escola, bico, família, voluntariado, curso, com quando e com que frequência. Com um anúncio de vaga, peça à IA o currículo duas vezes, em conversas novas: uma só com \"faça meu currículo para essa vaga\", outra com o pedido do currículo. Em cada um, conte as tarefas que você não fez, as datas que você não deu, as qualidades que você não disse e os requisitos que ela deu como seus. De onde vieram as tarefas: do que você disse, aumentado, ou do anúncio?", counts: ["Tarefas que você não fez, sem a regra", "Tarefas, com a regra", "Datas que você não deu, sem a regra", "Datas, com a regra", "Qualidades que você não disse, sem a regra", "Qualidades, com a regra", "Requisitos dados como seus, sem a regra", "Requisitos, com a regra"] },
    { id: "e3", chap: "Capítulo 3", title: "A resposta que conta o que você não fez", text: "Escreva o seu perfil em cinco linhas, ou use o do currículo, sem documento e sem contato. Peça, em duas conversas novas, dez perguntas para uma vaga que você quer e a resposta para duas delas: na primeira, só com o perfil; na segunda, com o pedido da entrevista. Conte quantas respostas trazem algo que você não fez. Depois, responda uma em voz alta, com um caso seu.", counts: ["Respostas com algo que você não fez, sem a regra", "Com a regra"] },
    { id: "e4", chap: "Capítulo 4", title: "As siglas que só você sabe", text: "Escreva um \"manual\" de seis linhas de um lugar que você conhece, como a casa, a escola, o time ou um bico, sem nome de ninguém. Use três palavras comuns e invente duas siglas, com um sentido que só você sabe. Peça à IA o significado de tudo, em duas conversas novas: uma só com a pergunta, outra com o pedido do primeiro dia, trocando \"comércio\" e \"empresa\" pelo seu lugar. Conte quantas das suas siglas ganharam nome por extenso ou definição; um \"provável\" no título não conta como \"não sei\".", counts: ["Siglas suas com nome por extenso ou definição, só com a pergunta", "Com a regra"] },
    { id: "e5", chap: "Capítulo 5", title: "O checklist com cara de pronto", text: "Pegue uma instrução que você já recebeu, em casa, na escola, num curso ou num bico: como fechar a cantina, uma receita ditada, como entregar um trabalho. Escreva como a pessoa falou, sem nome nem dado de ninguém. Peça o checklist duas vezes, em conversas novas: uma só com \"transforma num checklist\", outra com o pedido da instrução. Conte quantos pontos vagos cada resposta marcou como pergunta. Depois, com quem, quanto, quando e onde, procure os que nenhuma marcou, e conte também.", counts: ["Pontos vagos marcados como pergunta, sem a regra", "Com a regra", "Pontos vagos que nenhuma marcou"] },
    { id: "e6", chap: "Capítulo 6", title: "A promessa que você não fez", text: "Escolha uma mensagem, com situação e nomes inventados: uma falta, um atraso ou um pedido ao chefe. Escreva os fatos em três linhas. Peça a mensagem duas vezes, em conversas novas: uma só com os fatos, outra com o pedido das mensagens. Em cada rascunho, conte as promessas que você não fez. Depois, reescreva a abertura e o fecho com as suas palavras. Se sobrar tempo, faça o mesmo com as outras duas.", counts: ["Promessas que você não fez, sem a regra", "Com a regra"] },
    { id: "e7", chap: "Capítulo 7", title: "As três armadilhas da planilha", text: "Invente uma planilha de dez linhas do que você tem em casa (produto, quantidade, validade), ou use uma do trabalho com o ok da empresa por escrito. No celular, basta escrever as linhas como texto. Ponha três armadilhas: uma linha repetida, uma quantidade fora do padrão e uma data que não existe. Peça à IA \"Confere essa planilha\", com a data de hoje.", counts: ["Armadilhas achadas (de 3)", "Vezes em que chamou o resto de certo", "Vezes em que mandou apagar"] },
    { id: "e8", chap: "Capítulo 8", title: "A lei que a política não disse", text: "Pegue a política de trocas afixada na loja onde você trabalha, ou invente uma de seis linhas. Escolha quatro perguntas, uma delas de produto com defeito. Peça as respostas duas vezes, em conversas novas: uma só com as perguntas, outra com a política e o pedido do balcão. Em cada resposta, conte as leis citadas e as promessas fora da política. Confira uma das leis citadas no planalto.gov.br.", counts: ["Leis citadas, só com as perguntas", "Promessas fora da política, só com as perguntas", "Leis citadas, com a política e a regra", "Promessas fora da política, com a política e a regra"] },
    { id: "e9", chap: "Capítulo 9", title: "O desconto explicado como certo", text: "Pegue o seu holerite, ou o da Bianca, o do capítulo, que está logo abaixo. Digite as linhas sem nome, CPF, matrícula e banco, e peça com o pedido do holerite. Conte as leis e normas que ela citou. Se ela citou a norma do vale-transporte, abra-a no planalto.gov.br e veja se a página diz \"Revogado\". Depois, refaça o INSS com a tabela do ano, na página oficial do INSS, e não na Lei 8.212, e compare com o valor dela.", material: HOLERITE, counts: ["Leis e normas citadas", "A norma do vale-transporte diz \"Revogado\"? (1 sim, 0 não)", "O INSS dela bate com o refeito pela tabela do ano? (1 sim, 0 não)"], after: "No exemplo, o INSS foi calculado com 9% sobre o salário inteiro; pela tabela de 2026, o certo é R$ 142,19, e foram R$ 24,31 a mais. No teste do livro, o erro foi achado em 3 de 3 com o pedido, e o valor a cobrar saiu errado nas 3." },
    { id: "e10", chap: "Capítulo 10", title: "Uma pergunta de cada vez", text: "Escolha uma coisa do seu trabalho, ou do curso, que você ainda não sabe fazer: uma fórmula, uma conta do caixa, uma palavra comum do comércio. Invente um exemplo com dados de mentira. Peça com o pedido de aprender e responda cada pergunta antes de ler a seguinte. No fim, conte quantas vezes ela deu a resposta antes de você tentar, e explique em três frases, sem olhar, o que aprendeu.", counts: ["Vezes em que deu a resposta antes de você tentar"] },
    { id: "e11", chap: "Capítulo 11", title: "O enfeite do relatório", text: "Escreva dez linhas sobre o que você fez nas últimas semanas, no trabalho, no curso ou num bico: a data e o fato, mais nada. Peça à IA, em duas conversas novas, \"Faz um relatório disso\", e depois o mesmo pedido com a regra do relatório. Em cada resposta, sublinhe cada adjetivo, número e resultado que não está nas suas linhas, e conte.", counts: ["Adjetivos, números e resultados a mais, sem a regra", "Com a regra"] }
  ];

// ─── The rest of the kit ──────────────────────────────────────────────────

export const KIT = {
    slug: 'ia-no-primeiro-trabalho',
    checkedOn: 'Valores de 2026 conferidos nas páginas oficiais em 04/10/2026; a opção de treino de cada IA, em 24/09/2026. Quando um valor, uma configuração ou uma página mudar, muda aqui, com a data.',
    lead: 'Os pedidos do livro para preencher e copiar, o checklist da vaga de verdade, os modelos de currículo e de mensagem, e os valores de 2026 que o holerite usa. É curto porque o do volume 1, o IA no dia a dia, já tem o resto, conferido nas páginas oficiais de cada empresa em 24 de setembro de 2026.',
    promises: ['Os pedidos testados no livro', 'Modelos sem dado de ninguém', 'O que você digita fica no seu navegador'],
}

// o-kit.md, "IA aberta ou IA da empresa" (D1), in three rules.
export const RULES = [
    {
        lead: 'Material do trabalho só vai para uma IA com o ok da empresa por escrito.',
        text: 'Manual, procedimento, planilha, dado de cliente, valores. O ok é de quem responde pela empresa, e vale na conta que ela indicar. Sem esse ok, não vai para IA nenhuma, nem a do WhatsApp. O que é público pode ir, como o anúncio da vaga e a política afixada para o cliente; o que é seu e não é do trabalho também, como o seu currículo sem documentos e as anotações do que você fez, sem cliente, valor nem o nome da empresa. Os treinos deste kit usam material inventado e podem ser feitos numa IA aberta.',
    },
    {
        lead: 'Documento, senha e dado de cliente, nunca.',
        text: 'CPF, RG, a foto do documento, a selfie, o holerite com o seu nome, a senha, o nome e o CPF do cliente: nenhum pedido precisa deles. Troque os dados antes de colar: se você pede para a IA apagar um nome, ele já foi.',
    },
    {
        lead: 'Confira antes de usar.',
        text: 'Cada pedido traz o que conferir e o que aconteceu no teste. Os pedidos foram testados numa IA; em outra, a resposta muda, e a conferência é a mesma. A lei se confere no artigo, a conta na tabela do ano, e a regra da casa com quem manda nela.',
    },
]

// o-kit.md, "O checklist da vaga de verdade" (D6, D7), and chapter 1.
export const FAKE_JOB = {
    flags: [
        { lead: 'Pedido de dinheiro:', text: 'curso, exame, inscrição, "taxa de cadastro". Nenhuma empresa séria cobra para você participar da seleção.' },
        { lead: 'Pedido, por mensagem, antes de qualquer contratação,', text: 'de foto de documento, selfie segurando o documento, dado de conta ou senha. O cadastro num site de vagas conhecido, aberto por você digitando o endereço, pode pedir o número do CPF, e isso é normal.' },
        { lead: 'Contato só por mensagem,', text: 'que você não pediu, com pressa: "só até sexta", "últimas vagas".' },
        { lead: 'Tarefa paga:', text: 'pagam pouco para você curtir, seguir ou avaliar, e depois pedem um depósito para "liberar" um ganho maior.' },
        { lead: 'Nome de empresa conhecida', text: 'usado por alguém que fala por mensagem, em nome dela, de uma agência ou de um site de vagas.' },
        { lead: 'Salário que não combina com a vaga:', text: 'muito acima do comum para quase nenhuma exigência. Para aprendiz, a lei garante um piso, o salário mínimo hora, e não fixa um teto.' },
    ],
    check: [
        { title: 'Não pague nem mande documento', description: 'Nenhuma empresa séria cobra para você participar da seleção. Foto de documento, selfie, dado de conta e senha não vão por mensagem antes de qualquer contratação.' },
        { title: 'Procure a vaga no canal oficial', description: 'No site oficial da empresa ou na página da plataforma, digitando você o endereço, em vez de clicar no link que chegou por mensagem.' },
        { title: 'Confira se a empresa existe', description: 'E se o endereço bate. No teste, a IA não tinha internet: não abriu o site da empresa nem consultou o CNPJ. Conferir é com você.' },
        { title: 'Confira a lei no artigo', description: 'Se a IA ou o anúncio citou uma regra de lei, abra o artigo no planalto.gov.br. O do aprendiz é o 428 da CLT. Como achar o artigo está em "Como ler uma lei", mais abaixo.' },
        { title: 'Documento, só na admissão de verdade', description: 'Depois da proposta, a empresa que vai registrar você pede documentos, como a carteira de trabalho, o RG, o CPF e a conta para o salário. É para o registro, e ela nunca cobra. Antes de mandar, quatro perguntas: já houve entrevista e proposta? Quem pede é a empresa que vai registrar você? É para o registro? Há alguma cobrança? Se uma das três primeiras respostas for não, ou a última for sim, pare e confira por fora.' },
    ],
    sent: [
        { title: 'Se só recebeu a mensagem', description: 'Não responda; bloqueie e denuncie o número no aplicativo, como ensina o volume 1, e avise quem encaminhou.' },
        { title: 'Se já pagou por Pix', description: 'Avise o seu banco na hora, pelo aplicativo ou pelos canais oficiais, e conteste o Pix. O Mecanismo Especial de Devolução, o MED, do Banco Central, existe para tentar devolver o dinheiro em caso de golpe, e quanto antes você contestar, maior a chance. A Febraban orienta também bloquear o aplicativo e a senha. Depois, registre boletim de ocorrência (volume 1, IA no dia a dia, em "Proteger seus dados e não cair em golpe").' },
        { title: 'Se mandou documento ou selfie', description: 'Avise o banco e registre boletim de ocorrência, na delegacia de polícia da sua cidade. E fique atento a conta ou empréstimo que apareça no seu nome: é para isso que o golpe do documento serve. No Registrato, do Banco Central, com a conta gov.br prata ou ouro, dá para ver em que bancos há conta e empréstimo no seu nome.' },
        { title: 'Nos dois casos, guarde tudo', description: 'As conversas, os perfis, os números e as contas usadas pelo golpista.' },
    ],
    sources: ['Febraban', 'CERT.br', 'Polícia Civil de Santa Catarina', 'Polícia Civil de São Paulo', 'CIEE'],
}

// chapters/dez-coisas-que-nunca-se-cola.md: the reason and what to do instead.
export const TEN_THINGS = [
    { title: 'CPF, RG, carteira de trabalho, título de eleitor', text: 'O número identifica você, e é com ele que alguém se passa por você. O currículo e o treino da entrevista se fazem sem documento nenhum. O cadastro num site de vagas conhecido, aberto por você digitando o endereço, pode pedir o número do CPF, e isso é normal; os documentos vão para a empresa que vai registrar você, na admissão, depois da proposta. Para a IA, nenhum deles vai.' },
    { title: 'A foto do documento e a selfie', text: 'É o que o golpe de vaga pede, por mensagem, antes de qualquer contratação, para abrir conta e pegar empréstimo no seu nome. A selfie com o documento serve para a biometria do rosto, que a LGPD trata como dado pessoal sensível, com proteção maior. Para saber se a vaga é verdadeira, cole o anúncio, nunca o documento. Na admissão de verdade, a empresa pede documentos depois da proposta, para o registro, e nunca cobra.' },
    { title: 'O holerite e o contrato com os seus dados', text: 'O holerite junta nome, CPF, matrícula e salário numa folha só. Para entender uma linha, ele vai digitado, sem nome, CPF, matrícula, empresa e banco; os números podem ir. Do contrato, vai a cláusula, sem os seus dados.' },
    { title: 'Nome, telefone, CPF e cartão do cliente', text: 'São dados pessoais de quem não está na conversa e não autorizou nada; o número do cartão, com a validade e o código, basta para comprar em nome dele. Vai a pergunta do cliente, sem quem perguntou; a compra se procura no sistema da loja.' },
    { title: 'O manual e os procedimentos internos, na IA aberta', text: 'O manual é da empresa, e só vai para uma IA com o ok dela por escrito. Na IA aberta, só as palavras que você não entendeu, sem o texto e sem o nome da empresa. Um código de segurança, nem solto.' },
    { title: 'Os valores do caixa, as senhas, o cofre e o certificado digital', text: 'Nenhum pedido precisa deles, e quem tem a senha, a combinação ou o certificado entra no seu lugar. O certificado digital é a identidade eletrônica com que uma empresa ou uma pessoa assina documentos e entra em sistemas do governo. Não vão para nenhuma IA, nem a senha de qualquer sistema ou portal, a sua ou a de um cliente. Um passo a passo se arruma sem nenhum número real.' },
    { title: 'A planilha da empresa com dado de cliente e de fornecedor', text: 'Tire essas colunas e deixe só o que se confere, como código, produto, quantidade e validade. E, mesmo assim, só numa IA com o ok da empresa por escrito.' },
    { title: 'A conversa do grupo do trabalho', text: 'Um print leva o nome e o problema de colegas que não estão na conversa. Conte a situação com as suas palavras: "uma colega" basta.' },
    { title: 'O atestado, o CID e qualquer dado de saúde', text: 'Dado de saúde é dado pessoal sensível na LGPD, o seu e o de qualquer colega. O CID, o código da doença que às vezes vem no atestado, diz o que você tem. Para avisar a falta, basta dizer que pegou atestado. Não cole o atestado numa IA nem mande foto dele no grupo do trabalho; como entregar, pergunte ao RH.' },
    { title: 'O que o recrutador mandou como confidencial', text: 'O estudo de caso, o teste e a proposta são da empresa. Prepare a entrevista com o anúncio e com o que a empresa publica, e pergunte ao recrutador, por escrito, se pode usar IA no material.' },
]

export const CAN_GO = [
    'O anúncio da vaga, para conferir se é falsa.',
    'A política da loja afixada para o cliente, que é pública.',
    'O que você fez na escola, no bico, na família e no curso, sem CPF nem endereço.',
    'A lista de palavras do manual que você não entendeu.',
    'Os fatos da falta, sem o motivo.',
    'A planilha sem as colunas de pessoas.',
    'A pergunta do cliente, sem quem perguntou.',
    'A linha do holerite, sem nome, CPF, matrícula, empresa e banco.',
    'As anotações do que você fez, com as suas palavras, sem cliente, valor nem o nome da empresa.',
    'O modelo em branco, para você preencher depois.',
]

export const IF_PASTED = [
    { title: 'Apague a conversa', description: 'Apagar não desfaz o envio; diminui o que fica na sua conta.' },
    { title: 'Confira a opção de treino', description: 'Veja se as conversas vão para treino, e desligue se der. O caminho de cada IA está mais abaixo, em "O treino com as suas conversas".' },
    { title: 'Avise o seu supervisor', description: 'Por escrito, se era material da empresa ou dado de cliente ou de colega. Pode ser curto, só com os fatos (um modelo, não testado): "Colei sem querer [o quê] numa IA, na minha conta. Já apaguei a conversa. O que mais devo fazer?"' },
    { title: 'Da próxima vez, troque antes', description: 'Os dados saem antes de colar, não depois.' },
]

// o-kit.md, "IA aberta ou IA da empresa" (D1). The plans for companies are in
// the kit of volume 3, not repeated here.
export const OPEN_OR_COMPANY = [
    { title: 'IA aberta', text: 'A que você usa com uma conta sua, pessoal, gratuita ou paga; a IA do WhatsApp também é uma. Sem o ok da empresa por escrito, material do trabalho nunca vai para ela.' },
    { title: 'IA da empresa', text: 'A que a empresa contratou e autorizou, por escrito.' },
    { title: 'Material do trabalho', text: 'Manual, procedimento, planilha, dado de cliente, valores: só vai para uma IA com o ok da empresa por escrito. O ok é de quem responde por ela: o dono, o gerente, o RH (o setor de pessoal) ou o supervisor com essa autoridade. E vale na conta que ela indicar. Sem esse ok, não vai para IA nenhuma, nem a do WhatsApp.' },
    { title: 'O que pode ir', text: 'O que é público: a política afixada para o cliente, o anúncio da vaga. O que é seu e não é do trabalho: o seu currículo sem documentos, a sua dúvida geral, os números do seu holerite sem nome, CPF, matrícula, empresa e banco, as anotações do que você fez, contadas com as suas palavras, sem nome de cliente, CNPJ, valor, documento, senha, certificado digital nem o nome da empresa.' },
    { title: 'Se o chefe manda usar a sua conta pessoal', text: 'Peça que ele escreva isso numa mensagem. Mesmo com a mensagem, sem dado de cliente e sem valores.' },
    { title: 'Se a empresa não tem regra nenhuma', text: 'Pergunte uma vez, por escrito. Até a resposta, nada do trabalho vai; faça à mão, do jeito de antes. Os exercícios do livro e o seu material próprio não dependem de ninguém. Pergunte sem medo: é uma pergunta de quem quer fazer certo. A mensagem para perguntar está em Modelos.' },
    { title: 'Os planos para empresas', text: 'O que cada fornecedor diz dos seus planos para empresas está no kit do volume 3, IA no escritório.', links: [{ label: 'Kit do IA no escritório, volume 3', href: '/books/ia-no-escritorio/kit#empresa' }] },
]

// o-kit.md, "As IAs de conversa e as configurações" and "O treino com as suas
// conversas, na conta pessoal": what each company said on 24/09/2026.
export const TRAINING = [
    { title: 'Claude, da Anthropic', text: 'Settings › Privacy › Help improve our AI models.', links: [{ label: 'claude.ai', href: 'https://claude.ai/' }, { label: 'Página de ajuda', href: 'https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings' }] },
    { title: 'Gemini, do Google', text: 'Em gemini.google.com, Configurações e ajuda › Atividade › Desativar. Para maiores de 18 anos, a opção vem ligada.', links: [{ label: 'gemini.google.com', href: 'https://gemini.google.com/' }, { label: 'Página de ajuda', href: 'https://support.google.com/gemini/answer/13278892?hl=pt-BR' }] },
    { title: 'Meta AI, da Meta, dentro do WhatsApp', text: 'O que você manda para ela, a Meta recebe. É uma IA aberta, como as outras desta lista, e vale a mesma regra: documento, dado de cliente e material do trabalho sem o ok da empresa não vão. As linhas do seu holerite, digitadas sem os seus dados, podem ir, como em qualquer IA aberta. A própria Meta recomenda mandar só o que você não se importa que ela lembre.', links: [{ label: 'Página de privacidade', href: 'https://www.whatsapp.com/privacyquestions' }] },
    { title: 'Copilot, da Microsoft', text: 'Na versão nova do aplicativo, a Microsoft diz que as conversas não treinam os modelos de base, e não há opção de treino para desligar.', links: [{ label: 'copilot.microsoft.com', href: 'https://copilot.microsoft.com/' }, { label: 'Histórico de atividade', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/activity-history' }, { label: 'Controles de privacidade', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls' }] },
    { title: 'ChatGPT, da OpenAI', text: 'Settings › Data Controls › desligar Improve the model for everyone.', links: [{ label: 'chatgpt.com', href: 'https://chatgpt.com/' }, { label: 'Página de ajuda', href: 'https://help.openai.com/en/articles/7730893-data-controls-faq' }] },
]

// o-kit.md, "Os valores de 2026": official pages opened on 02/10/2026.
export const VALUES_2026 = [
    { title: 'Salário mínimo', text: 'R$ 1.621,00 por mês, R$ 54,04 por dia e R$ 7,37 por hora, desde 1º de janeiro de 2026 (Decreto 12.797/2025, art. 1º). O aprendiz tem garantido, salvo condição mais favorável, o salário mínimo hora (CLT, art. 428, § 2º). "Salvo condição mais favorável" quer dizer: a não ser que a empresa pague mais.', links: [{ label: 'Decreto 12.797/2025', href: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm' }, { label: 'CLT', href: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm' }] },
    { title: 'INSS de quem tem carteira assinada, por faixas', text: 'No holerite, o INSS é a contribuição para a Previdência, e a alíquota é a porcentagem. Até R$ 1.621,00: 7,5%. De R$ 1.621,01 até R$ 2.902,84: 9%. De R$ 2.902,85 até R$ 4.354,27: 12%. De R$ 4.354,28 até R$ 8.475,55: 14%. Cada alíquota vale só para o pedaço do salário que cabe na faixa dela: para R$ 1.850,00, o exemplo do capítulo 9, 7,5% de R$ 1.621,00 mais 9% de R$ 229,00, ou R$ 142,19 (Portaria Interministerial MPS/MF nº 13/2026, Anexo II).', links: [{ label: 'Tabela do INSS', href: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal' }, { label: 'Portaria MPS/MF nº 13/2026 (PDF)', href: 'https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf' }] },
    { title: 'Imposto de renda retido na fonte', text: 'Tabela mensal da Receita Federal para 2026: até R$ 2.428,80, isento. De R$ 2.428,81 até R$ 2.826,65: 7,5%. De R$ 2.826,66 até R$ 3.751,05: 15%. De R$ 3.751,06 até R$ 4.664,68: 22,5%. Acima de R$ 4.664,68: 27,5%. A tabela traz também a dedução por dependente e o desconto simplificado.', links: [{ label: 'Receita Federal, tabelas de 2026', href: 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026' }] },
    { title: 'A redução do imposto, Lei 15.270/2025', text: 'Desde janeiro de 2026, além da tabela: para rendimentos tributáveis de até R$ 5.000,00 por mês, redução de até R$ 312,89, de modo que o imposto devido seja zero; de R$ 5.000,01 até R$ 7.350,00, a redução diminui até zerar. A faixa isenta da tabela continua sendo a de R$ 2.428,80; o que zera o imposto até R$ 5.000,00 é a redução.', links: [{ label: 'Lei 15.270/2025', href: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm' }] },
    { title: 'FGTS', text: 'Não é desconto: é um depósito da empresa numa conta no seu nome. São 8% da remuneração e, nos contratos de aprendizagem, 2% (Lei 8.036/1990, art. 15 e § 7º).', links: [{ label: 'Lei 8.036/1990', href: 'https://www.planalto.gov.br/ccivil_03/leis/l8036consol.htm' }] },
    { title: 'Vale-transporte', text: 'A empresa paga o que passar de 6% do seu salário básico (Lei 7.418/1985, art. 4º, parágrafo único); o regulamento é o Decreto 10.854/2021, art. 114. O decreto antigo, o 95.247/1987, aparece no planalto.gov.br como revogado. Se as passagens do mês custam menos que esses 6%, pergunte ao RH como fica o desconto.', links: [{ label: 'Lei 7.418/1985', href: 'https://www.planalto.gov.br/ccivil_03/leis/l7418.htm' }, { label: 'Decreto 10.854/2021', href: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/decreto/d10854.htm' }] },
]

// o-kit.md, "A régua do contrato" (moved out of chapter 9 on 04/10/2026).
export const CONTRACT_APPRENTICE = [
    { title: 'Idade', text: "De 14 a 23 anos (art. 428); sem limite para pessoa com deficiência (§ 5º)." },
    { title: 'Prazo', text: "Até 2 anos, sem esse limite para pessoa com deficiência (art. 428, § 3º)." },
    { title: 'Carteira, escola e curso', text: "Carteira anotada, escola se não concluiu o ensino médio e programa de aprendizagem (art. 428, § 1º)." },
    { title: 'Salário', text: "O salário mínimo hora, salvo condição mais favorável (art. 428, § 2º)." },
    { title: 'Jornada', text: "Até 6 horas por dia, \"sendo vedadas a prorrogação e a compensação de jornada\"; até 8 para quem completou o ensino fundamental, contando as horas do curso (art. 432 e § 1º)." },
]

export const CONTRACT_INTERNSHIP = [
    { title: 'Jornada', text: "Até 6 horas por dia e 30 por semana no ensino médio regular, no superior e na educação profissional de nível médio (art. 10, II); até 40 por semana nos cursos que alternam teoria e prática, nos períodos sem aula presencial, se o projeto do curso prevê (§ 1º); nos períodos de avaliação, se a escola adota provas, reduzida \"pelo menos à metade, segundo estipulado no termo de compromisso\" (§ 2º): veja o que o seu termo diz." },
    { title: 'Bolsa e transporte', text: "Obrigatórios no estágio não obrigatório (art. 12)." },
    { title: 'Recesso', text: "30 dias se o estágio dura 1 ano ou mais, de preferência nas férias escolares (art. 13); proporcional se dura menos (§ 2º); remunerado se há bolsa (§ 1º)." },
    { title: 'Seguro', text: "Contra acidentes pessoais, contratado pela empresa, ou pela escola no estágio obrigatório (art. 9º, IV e § 1º)." },
    { title: 'Duração', text: "Até 2 anos na mesma empresa, sem esse limite para pessoa com deficiência (art. 11)." },
]

// o-kit.md, "Como ler uma lei" (D13).
export const READ_A_LAW = [
    { title: '1. Abra a lei pelo endereço direto', text: 'No planalto.gov.br, o site oficial das leis. A CLT, o Código de Defesa do Consumidor e a lei do estágio estão nos endereços abaixo.', links: [{ label: 'CLT', href: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm' }, { label: 'Código de Defesa do Consumidor', href: 'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm' }, { label: 'Lei do estágio', href: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11788.htm' }] },
    { title: '2. Ache o artigo pela busca da página', text: 'A página de uma lei é longa, e a da CLT, enorme. No computador, use a busca do navegador; no celular, a opção "Localizar na página", no menu do navegador. Digite o número como ele aparece: "Art. 428".' },
    { title: '3. Leia as partes do artigo', text: 'O caput é o texto principal, logo depois do número. O sinal § quer dizer parágrafo: "§ 1º" é o parágrafo primeiro, e, quando há um só, ele se chama "parágrafo único". Os incisos são os itens em algarismos romanos, I, II, III; as alíneas, as letras a, b, c.' },
    { title: '4. Pule o riscado', text: 'O texto riscado não vale mais; vale o que vem sem risco, em geral logo abaixo, com a nota "(Redação dada pela Lei...)". Se a página diz "Revogado", a regra não vale mais daquele jeito.' },
    { title: '5. Valor do ano não se confere na lei', text: 'A Lei 8.212/1991, do INSS, ainda mostra no art. 20 uma tabela de 1995, sem risco. Os valores de 2026 estão mais acima, com a página oficial de cada um.', links: [{ label: 'Lei 8.212/1991', href: 'https://www.planalto.gov.br/ccivil_03/leis/l8212cons.htm' }] },
]

// o-kit.md, "Onde conferir o que a IA não sabe".
export const SOURCES = [
    { title: 'A lei, no texto oficial', text: 'O planalto.gov.br, pelo número. A CLT, a Consolidação das Leis do Trabalho, arts. 428 a 433 (aprendiz), 462 (desconto no salário) e 482 (justa causa); a Lei 11.788/2008, do estágio; o Código de Defesa do Consumidor, o CDC, a Lei 8.078/1990, arts. 18, 24, 26, 30 e 49, e o Decreto 7.962/2013, da compra pela internet; a LGPD, a Lei Geral de Proteção de Dados Pessoais, a Lei 13.709/2018.', links: [{ label: 'CLT', href: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm' }, { label: 'Lei do estágio', href: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11788.htm' }, { label: 'CDC', href: 'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm' }, { label: 'Decreto 7.962/2013', href: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm' }, { label: 'LGPD', href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm' }] },
    { title: 'Os valores do ano', text: 'O decreto do salário mínimo, no planalto.gov.br; a tabela do INSS, na página do INSS; a do imposto de renda, na da Receita Federal. Mudam todo ano.', links: [{ label: 'Salário mínimo 2026', href: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm' }, { label: 'INSS', href: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal' }, { label: 'Receita Federal', href: 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026' }] },
    { title: 'Golpes de vaga', text: 'A Febraban, a federação dos bancos, sobre o golpe da vaga falsa e o golpe da tarefa; a Cartilha de Segurança para Internet, do CERT.br, o centro brasileiro de segurança na internet, com o que fazer depois de um golpe; a cartilha de prevenção a golpes da Polícia Civil de Santa Catarina; e a delegacia de polícia da sua cidade, para o boletim de ocorrência.', links: [{ label: 'Febraban, vaga falsa', href: 'https://portal.febraban.org.br/noticia/4449/pt-br/' }, { label: 'Febraban, golpe da tarefa', href: 'https://portal.febraban.org.br/noticia/4051/pt-br/' }, { label: 'cartilha.cert.br', href: 'https://cartilha.cert.br/' }, { label: 'CERT.br, golpes: o que fazer (PDF)', href: 'https://cartilha.cert.br/fasciculos/golpes-o-que-fazer/fasciculo-golpes-o-que-fazer.pdf' }, { label: 'Polícia Civil de SC (PDF)', href: 'https://pc.sc.gov.br/wp-content/uploads/2024/04/Cartilha-Prevencao-Golpes-1.pdf' }, { label: 'Polícia Civil de SP (PDF)', href: 'https://www.policiacivil.sp.gov.br/portal/imagens/CRIMES%20CIBERN%C3%89TICOS%20-%20PERGUNTAS%20E%20RESPOSTAS%20V2.pdf' }, { label: 'Registrato, do Banco Central', href: 'https://www.bcb.gov.br/meubc/registrato' }] },
    { title: 'Vagas de graça, do governo', text: 'O Sine, o serviço público de vagas do Ministério do Trabalho: as vagas da sua cidade aparecem no aplicativo Carteira de Trabalho Digital, no portal "Emprega Brasil" e nos postos do Sine. É gratuito.', links: [{ label: 'Sine no gov.br', href: 'https://www.gov.br/pt-br/servicos/buscar-emprego-no-sistema-nacional-de-emprego-sine' }] },
    { title: 'Estágio e aprendizagem', text: 'Agentes de integração como o CIEE. Se alguém pedir dinheiro em nome de uma vaga de estágio ou de aprendizagem, desconfie na hora.', links: [{ label: 'CIEE', href: 'https://portal.ciee.org.br/' }] },
    { title: 'A triagem de currículos', text: 'A página da Gupy sobre a ordenação: a ordenação não elimina ninguém; o requisito obrigatório definido pela empresa, sim.', links: [{ label: 'Gupy, ordenação', href: 'https://www.gupy.io/inteligencia-artificial/ordenacao-de-pessoas-candidatas-em-vagas' }] },
    { title: 'O que é regra da casa', text: 'Com o seu supervisor, a sua encarregada, o gerente ou o RH, por escrito; em loja pequena, com o dono ou com quem cuida do pagamento. A sigla interna, a política da loja, quem assina a folha do caixa e o desconto do atraso não estão em nenhuma IA.', links: [] },
]

export const UPDATES = [
    { date: '04/10/2026', text: 'O pedido da vaga, testado de novo com as mesmas vagas; o checklist da vaga de verdade e o que fazer depois de um golpe, com o Registrato e o Sine; a régua do contrato de aprendiz e do termo de estágio; o pedido das mensagens na forma testada. Valores de 2026 conferidos de novo nas páginas oficiais.' },
    { date: '02/10/2026', text: 'O kit online acompanha o texto final do livro, com os pedidos, os modelos, os treinos e o caderno. Valores de 2026 conferidos nas páginas oficiais em 02/10/2026.' },
]

// ─── The kit as one object, for pages/BookKit.jsx ─────────────────────────
//
// The same shape as data/kit-ia-no-escritorio.js: the parts every kit has and
// `bands`, the sections only this book has, in order, between the templates
// and the exercises. Icons are named, and must be in ICONS of BookKit. The
// bands alternate gray and white, starting gray after the templates (white)
// and ending white before the exercises (gray).

const steps = (items, icons) => items.map((item, index) => ({ ...item, icon: icons[index] }))
const criteria = items => items.map(item => ({ criterion: item.title, value: item.text, ...(item.links ? { links: item.links } : {}) }))

export default {
    slug: 'ia-no-primeiro-trabalho',
    // The localStorage prefix of this kit: changing it later would lose what
    // readers typed.
    storage: 'kit-emp',
    testedOn: 'outubro de 2026',
    workAI: 'IA com o ok da empresa por escrito, na conta que ela indicar',
    // A stand-in for the catalogue entry, used only in development.
    preview: { title: 'IA no primeiro trabalho', volume: 4, kit: { label: 'Kit online' } },
    testedNote: 'Conversas com uma mesma IA, numa configuração neutra, em 02/10/2026; o pedido da vaga, em 04/10/2026. Os pedidos foram testados numa IA; em outra, a resposta muda, e a conferência é a mesma. No seu aplicativo, com a memória e as configurações dele, a resposta também pode sair diferente.',
    KIT,
    RULES,
    TASKS,
    TEMPLATES,
    EXERCISES,
    SOURCES,
    UPDATES,
    bands: [
        {
            type: 'callout',
            id: 'vaga-falsa',
            subtitle: 'Antes de se candidatar',
            title: 'Os seis sinais da vaga falsa',
            description: 'Procure no anúncio e na conversa, antes de mandar qualquer coisa. Uma dessas já é motivo para parar e conferir por fora.',
            cardLabel: 'Os sinais',
            items: FAKE_JOB.flags,
            footnote: { lead: 'Não é sinal de golpe:', text: '"não precisa estar estudando", para quem já terminou o ensino médio. A CLT, a Consolidação das Leis do Trabalho, só exige a escola do aprendiz que não concluiu o ensino médio (art. 428, § 1º). Fontes dos sinais: ' + FAKE_JOB.sources.join(', ') + '. Os endereços estão em "As fontes oficiais", no fim desta página.' },
            background: 'gray',
        },
        {
            type: 'steps',
            id: 'pede-dinheiro',
            subtitle: 'Se a vaga pede dinheiro ou documento',
            title: 'Pare e confira por fora',
            items: steps(FAKE_JOB.check, ['IconCashOff', 'IconSearch', 'IconBuildingStore', 'IconScale', 'IconFileText']),
            background: 'white',
        },
        {
            type: 'steps',
            id: 'ja-mandou',
            subtitle: 'Se já recebeu, pagou ou mandou',
            title: 'O caminho é o banco e o boletim de ocorrência',
            items: steps(FAKE_JOB.sent, ['IconMessageOff', 'IconBuildingBank', 'IconAlertTriangle', 'IconReceipt']),
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'dez',
            subtitle: 'Antes de colar',
            title: 'As dez coisas que nunca se colam',
            description: 'Elas não vão para uma IA aberta, a que você usa com uma conta sua; a IA do WhatsApp também é uma. Material do trabalho só vai para uma IA com o ok da empresa por escrito. E algumas, como a senha e a combinação do cofre, não vão para nenhuma IA.',
            items: TEN_THINGS.map((thing, index) => ({ criterion: `${index + 1}. ${thing.title}`, value: thing.text })),
            background: 'white',
        },
        {
            type: 'callout',
            id: 'pode-ir',
            subtitle: 'O que pode ir',
            title: 'Quase tudo o que o livro mostrou foi feito sem nenhuma das dez',
            cardLabel: 'Pode ir para a IA',
            items: CAN_GO.map(text => ({ lead: '', text })),
            footnote: { lead: 'Anexar é colar tudo.', text: 'Uma foto, um PDF ou um print levam o documento inteiro, com o que você não viu. Anexe só o que você colaria linha por linha. E não mande a um colega o link da conversa: quem tiver o link vê o que foi colado. Copie só a resposta.' },
            background: 'gray',
        },
        {
            type: 'steps',
            id: 'se-ja-colou',
            subtitle: 'Se já colou',
            title: 'Sem alarme, em quatro passos',
            items: steps(IF_PASTED, ['IconTrash', 'IconShieldCheck', 'IconMessageOff', 'IconCheck']),
            background: 'white',
        },
        {
            type: 'criteria',
            id: 'ia-aberta',
            subtitle: 'Conta pessoal ou conta da empresa',
            title: 'IA aberta e IA da empresa',
            description: 'A regra, igual no livro inteiro.',
            items: criteria(OPEN_OR_COMPANY),
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'treino',
            subtitle: 'As IAs de conversa e as configurações',
            title: 'O treino com as suas conversas, na conta pessoal',
            description: 'Os testes deste livro foram feitos com uma delas, o Claude Sonnet 4.6. Os pedidos foram testados numa IA; em outra, a resposta muda, e a conferência é a mesma. Numa conta pessoal, o que você escreve pode ser usado para treinar a IA. Onde fica a opção, pelo que cada empresa dizia em 24 de setembro de 2026, em ordem alfabética pela empresa; a ordem não é um ranking.',
            items: criteria(TRAINING),
            note: 'Algumas páginas estão em inglês; no aplicativo em português, os nomes aparecem traduzidos. Antes de mudar uma configuração, confira de novo na página de ajuda: os nomes e os caminhos mudam de um mês para outro. A memória, a conversa temporária e o histórico de cada uma estão no kit do volume 1, IA no dia a dia.',
            background: 'white',
        },
        {
            type: 'criteria',
            id: 'valores-2026',
            subtitle: 'O que muda todo ano',
            title: 'Os valores de 2026',
            description: 'Os que o livro manda conferir na fonte, lidos nas páginas oficiais em 02/10/2026 e conferidos de novo em 04/10/2026. Mudam todo ano: antes de usar, confira de novo.',
            items: criteria(VALUES_2026),
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'regua-aprendiz',
            subtitle: 'A régua do contrato',
            title: 'O contrato de aprendiz',
            description: 'O que a CLT diz, arts. 428 a 433. Não muda todo ano, mas a lei pode mudar: confira o artigo no planalto.gov.br antes de reclamar de uma cláusula.',
            items: criteria(CONTRACT_APPRENTICE),
            background: 'white',
        },
        {
            type: 'criteria',
            id: 'regua-estagio',
            subtitle: 'A régua do contrato',
            title: 'O termo de estágio',
            description: 'O que a Lei 11.788/2008 diz. O teste do livro achou a cláusula contra a lei nas três vezes; uma cláusula ambígua não foi testada.',
            items: criteria(CONTRACT_INTERNSHIP),
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'ler-lei',
            subtitle: 'Quando a IA, o anúncio ou o livro cita uma lei',
            title: 'Como ler uma lei',
            description: 'Não é preciso ler a lei toda: procure o artigo que a IA, o anúncio ou o capítulo citou.',
            items: criteria(READ_A_LAW),
            background: 'white',
        },
    ],
}
