/**
 * The online kit of "IA no escritório" (volume 3), as data. The page is
 * pages/BookKit.jsx, at /books/ia-no-escritorio/kit.
 *
 * MOVED FROM books/kit/ia-no-escritorio/index.html on 01/10/2026, word for
 * word: the content was approved there, and only the design changed (the
 * site's own components and greys). Every prompt is the tested form from the
 * book (research/testes/rodar-tarefas.sh via chapters/o-kit.md), with the
 * material in {fields}; `add` is a chapter's addition that was NOT tested.
 *
 * Reviewed on 04/10/2026 against the 1.0.0 book (chapters/o-kit.md and each
 * chapter): prompts word for word, results and links; the screen text fixed
 * where it misread the chapter or read unclearly.
 */

const T = '\t'

export const TASKS = [
    { id: "responder", chap: "Capítulo 2", name: "Responder a clientes e pacientes",
      tpl: "Trabalho na recepção de {onde}. Rascunhe a resposta para esta {quem} seguindo só esta política, sem prometer nada que não esteja nela.\n\n{politica}\n\n{resumo}",
      fields: [
        { k: "onde", label: "Onde você trabalha", ph: "onde" },
        { k: "quem", label: "Quem escreveu", ph: "paciente" },
        { k: "politica", label: "A política, em cinco ou seis linhas", ph: "cole a política", area: true, hint: "Prazo de remarcação, cobrança, reembolso, quem decide o quê. Modelo em Modelos." },
        { k: "resumo", label: "O resumo da mensagem", ph: "cole o resumo da mensagem, sem nome nem dado de saúde", area: true, hint: "A hora da consulta, a hora da mensagem e o que a pessoa pede. Sem nome, telefone nem motivo." }
      ],
      checks: ["Cada promessa do rascunho contra a política", "Procure prazo: \"ainda hoje\", \"em breve\"", "Procure valor: \"reembolso\", \"sem custo\", \"preservado\"", "Procure consolo que vira compromisso: \"não se preocupe\", \"fique tranquila\"", "Nenhum dado de saúde devolvido na resposta", "O tom: tire o que soa duro e a política não manda dizer"],
      result: "Sem a política, 3 de 3 respostas prometeram algo fora dela; com a política colada, 0 de 3. Com o resumo no lugar da mensagem (30/09/2026), 0 de 3, e uma escreveu \"retornamos em breve\", prazo que a política não dá.",
      privacy: "Pergunta de saúde (\"posso tomar o remédio antes do exame?\") não vai para a IA: a resposta é \"vou passar ao médico\"." },
    { id: "agenda", chap: "Capítulo 3", name: "Agenda e marcação",
      tpl: "Monte a grade de consultas da semana, com o dia da semana, a data e o horário de cada paciente. Aponte o que não couber.\n\n{regras}",
      fields: [
        { k: "regras", label: "As regras e os pedidos", ph: "cole os horários de cada profissional, os feriados e os pedidos, com um número ou uma inicial no lugar do nome e sem o motivo da consulta", area: true, hint: "Dias e horários de cada profissional, duração da consulta, o que fecha, os feriados da sua cidade. O que não estiver no pedido, a IA supõe." }
      ],
      checks: ["Cada data e dia da semana no calendário", "Os feriados, os nacionais e os da sua cidade", "Os encaixes: dois no mesmo horário, consulta que termina depois do expediente, profissional em dia que não atende", "A lista do que não coube: ela tirou alguém que pediu hora certa?", "Numa agenda de diretoria, o deslocamento entre compromissos e o fuso horário", "Cada horário só vale depois que o paciente confirma e você lança no sistema"],
      result: "0 erros de data em 4 rodadas, com feriado, conflito e pedido fora do expediente achados. Em 2 das 4, a IA mudou um encaixe sem que o pedido mandasse: numa, deu a quem pediu \"o mais cedo possível\" o horário que outra paciente tinha pedido, e tirou essa paciente da grade.",
      privacy: "A lista que liga cada número ao paciente fica com você, fora da conversa. Há um modelo dela em Modelos." },
    { id: "ata", chap: "Capítulo 4", name: "Atas e resumos de reunião",
      tpl: "Faça a ata desta reunião, com as decisões e os responsáveis.\n\n{transcricao}",
      add: "Para cada ponto, diga se foi decidido, adiado ou ficou em discussão. Registre quem discordou e de quê. Não escreva decisão que não esteja na transcrição.",
      fields: [{ k: "transcricao", label: "A transcrição ou as anotações", ph: "cole a transcrição ou as anotações", area: true, hint: "Reunião reservada (demissão, saúde de alguém, um aluno em particular) não se cola: pergunte antes, por escrito." }],
      checks: ["Cada \"decisão\": ache na transcrição quem decidiu e com que palavras", "Cada fala e cada tarefa no nome certo", "As discordâncias estão registradas", "Cada data com o dia da semana, no calendário", "Presentes, pauta e, se houver, quórum", "As palavras que fecham: \"decidiu-se\", \"ficou definido\", \"a urgência foi reconhecida\"", "Circule a minuta aos participantes antes de fechar"],
      result: "Em 24/09/2026, o decidido e o adiado saíram certos nas 3 atas, mas houve decisão inventada em 2 de 3, discordância apagada em 3 de 3 e data errada em 1. Refeito em 30/09: decisão inventada em 1 de 3, discordância apagada em 2 de 3, data errada em 2 de 3.",
      privacy: "A folha de anotação da reunião, a régua com que se confere a ata, está em Modelos." },
    { id: "oficio", chap: "Capítulo 5", name: "Ofícios, cartas e comunicados",
      tpl: "Sou {cargo} de {onde}. Redija um ofício de {assina} para {recebe} pedindo {pedido}. {orgao}",
      add: "Onde faltar um dado, escreva [preencher] e não invente.",
      fields: [
        { k: "cargo", label: "O seu cargo", ph: "cargo" },
        { k: "onde", label: "Onde você trabalha", ph: "onde" },
        { k: "assina", label: "Quem assina", ph: "quem assina", hint: "O cargo: \"a diretora da escola\". No pedido pronto, troque \"de a\" por \"da\"." },
        { k: "recebe", label: "O cargo de quem recebe", ph: "o cargo de quem recebe" },
        { k: "pedido", label: "O que se pede, com os fatos, todos e só eles", ph: "o quê", area: true, hint: "Quantos, desde quando, o que está quebrado, se já houve pedido antes. O que você não disser, ela pode completar." },
        { k: "orgao", label: "O nome do órgão", ph: "O nome do órgão." }
      ],
      checks: ["O número segue a sequência da sua pasta", "A cidade no lugar de \"Local\", e a data do envio", "O tratamento pela regra de quem recebe (no governo federal, só \"senhor\")", "Sem \"Ilustríssimo\" nem \"Digníssimo\"", "O fecho: \"Respeitosamente\" para quem está acima de quem assina; \"Atenciosamente\" nos demais casos", "Nome e cargo de quem assina, não de quem redigiu", "Cada frase: alguém me contou isso?"],
      result: "O padrão ofício saiu certo nas 2 respostas. O fecho saiu \"Atenciosamente\" nas 2, onde o manual pede \"Respeitosamente\"; o tratamento mudou de uma para a outra; as 2 acrescentaram fatos que ninguém deu.",
      privacy: "O ofício reaproveitado é onde mais sobra dado de outra pessoa. Antes de colar um modelo antigo, apague tudo o que é de alguém." },
    { id: "planilha", chap: "Capítulo 6", name: "Planilhas e controles",
      tpl: "Tenho uma planilha de {oque}: na coluna A {a}, na B {b}, na C {c}. {vazias} Quero na coluna D uma fórmula que {resultado}. Me dê a fórmula para a linha 2.",
      fields: [
        { k: "oque", label: "Planilha de quê", ph: "o quê" },
        { k: "a", label: "Coluna A", ph: "..." },
        { k: "b", label: "Coluna B", ph: "...", hint: "Se é data, diga \"é uma data mesmo, não texto\", e confira se é." },
        { k: "c", label: "Coluna C", ph: "..." },
        { k: "vazias", label: "O que acontece com as células vazias", ph: "O que acontece com as células vazias." },
        { k: "resultado", label: "O resultado, com o que fazer nas linhas-limite", ph: "o resultado, com o que fazer nas linhas-limite", area: true, hint: "Vence hoje? Vence daqui a exatamente sete dias? Sem data? Diga cada caso." }
      ],
      checks: ["Cinco linhas de teste, uma para cada linha-limite, antes de copiar para a coluna inteira", "Se a planilha recusar: troque ponto e vírgula por vírgula; se ainda recusar, use a versão em inglês (IF, TODAY)", "Diga à IA qual programa você usa", "Se uma linha falhar, diga qual e o que devia aparecer", "Depois do conserto, teste as cinco de novo", "Apague as linhas de teste antes de mandar a planilha"],
      result: "A fórmula saiu certa nas 5 linhas-limite, conferida por leitura, nas 2 rodadas. A IA disse qual escolha fez (o sétimo dia entra); nem sempre se pode contar com isso.",
      privacy: "Para pedir uma fórmula, a IA precisa das colunas, não das pessoas. As cinco linhas de teste prontas estão em Modelos." },
    { id: "arquivos", chap: "Capítulo 7", name: "Organizar arquivos",
      tpl: "Estes são os nomes dos arquivos da pasta {pasta}. Proponha um padrão de nomes e de pastas e me dê a lista de cada arquivo com o nome novo e a pasta.\n\n{lista}",
      add: "Não acrescente data nem número de versão que não estejam no nome; onde faltar, escreva SEM-DATA.",
      fields: [
        { k: "pasta", label: "De onde é a pasta", ph: "de onde" },
        { k: "lista", label: "A lista de nomes", ph: "cole a lista de nomes, sem nome de gente", area: true, hint: "Copie os nomes como texto, num bloco de notas, e troque \"atestado professora ana.pdf\" por \"atestado 1.pdf\". Nunca cole os arquivos: vão inteiros." }
      ],
      checks: ["Quantos arquivos entraram e quantos saíram: têm de ser iguais", "Cada data e cada versão do nome novo: estava no nome velho?", "Abra os que ninguém sabe o que são", "Renomeie você", "Prazo de guarda: com o contador, o jurídico e a tabela do setor, nunca com a IA"],
      result: "Nenhum dos 30 arquivos sumiu e o padrão proposto é bom. Mas 22 dos 30 ganharam ano ou mês que não estavam no nome, e as versões dos contratos foram numeradas pela ordem da lista. Uma rodada.",
      privacy: "O pedido testado também perguntava os prazos de guarda; essa parte ficou de fora de propósito." },
    { id: "boletos", chap: "Capítulo 8", name: "Contas, notas e boletos",
      tpl: "Confira os boletos contra a planilha de contas a pagar e me diga se posso pagar todos.\n\n{planilha}\n\n{boletos}",
      fields: [
        { k: "planilha", label: "Da planilha, cada conta", ph: "cole, de cada conta: fornecedor, CNPJ, valor e vencimento", area: true },
        { k: "boletos", label: "De cada boleto", ph: "cole, de cada boleto: os mesmos quatro campos", area: true, hint: "Copie e cole em vez de digitar: digitar é onde o erro entra. Sem código de barras, conta ou acesso ao banco." }
      ],
      checks: ["Cada divergência com os seus olhos, algarismo por algarismo", "Não se guie pela explicação da IA", "Valor, CNPJ ou nome diferente: ligue você, por voz, para o número do cadastro", "Nunca confirme por e-mail nem pelos contatos do boleto", "Na hora de pagar, o nome e o CNPJ de quem recebe no aplicativo do banco", "Boleto de MEI ou de pessoa: troque o nome e o CPF antes de colar"],
      result: "As 2 armadilhas (valor trocado e CNPJ de outro beneficiário) achadas em 3 de 3 respostas, nenhuma diferença inofensiva apontada como problema. Em 1 de 3, a explicação do CNPJ estava errada.",
      privacy: "A IA confere o que foi digitado, não o boleto. Veja também Golpes." },
    { id: "relatorio", chap: "Capítulo 9", name: "Relatórios para a chefia",
      tpl: "Faça um relatório de uma página para {quem} com estes números do mês, com as principais conclusões.\n\n{tabela}",
      add: "Marque com [interpretação] toda frase que não saia diretamente dos números.",
      fields: [
        { k: "quem", label: "Quem vai ler", ph: "quem vai ler" },
        { k: "tabela", label: "A tabela de totais", ph: "cole a tabela de totais", area: true, hint: "Só os totais. Anexar a planilha leva as outras abas e as colunas que você não quis mostrar." }
      ],
      checks: ["Cada número com o seu endereço na tabela", "Porcentagens e variações refeitas na calculadora", "Cada conclusão com a pergunta \"a tabela diz isso?\"", "Se não diz: corte, troque por um número ou transforme em pergunta", "O cabeçalho e o rodapé: período, data, quem fez, fonte"],
      result: "Todos os números certos nas 2 respostas. Conclusões além dos números nas 2 (\"sem deterioração da qualidade\", \"patamar de excelência\"). Período inventado em 1.",
      privacy: "Totais bastam, e não expõem ninguém." },
    { id: "compras", chap: "Capítulo 10", name: "Compras e cotações",
      tpl: "Qual orçamento eu escolho?\n\n{orcamentos}\n{limite}",
      fields: [
        { k: "orcamentos", label: "Cada orçamento", ph: "cole cada orçamento: preço da unidade, quantidade, frete, prazo de entrega e validade", area: true, hint: "Diga também impostos, condição de pagamento e garantia, quando importarem. Sem o contato do vendedor." },
        { k: "limite", label: "A data-limite", ph: "a data-limite", hint: "Se usar \"daqui a\", escreva também a data de hoje." }
      ],
      checks: ["O total de cada loja na calculadora: preço × quantidade + frete", "Cada data de entrega no calendário", "Pergunte à loja, por escrito, o que a IA supôs: dias corridos ou úteis, contados de quando, impostos", "A validade de cada proposta", "Preço de mercado sai de orçamento ou de página que você abriu, nunca da lembrança da IA", "A escolha é de quem assina a compra"],
      result: "Contas e datas de entrega certas; a loja mais barata na unidade era a mais cara no total e chegaria tarde. Ao pedir \"pesquise o preço de mercado\", sem internet, a IA avisou que não podia e deu faixas de preço sem fonte. Uma rodada de cada.",
      privacy: "O pedido \"pesquise o preço de mercado\" não está aqui de propósito." },
    { id: "viagem", chap: "Capítulo 11", name: "Viagens: o roteiro",
      tpl: "Sou {cargo} de {onde}. Monte o roteiro de uma viagem de {dias} de {quem} a {destino}, {quando}, com {compromissos}: voos, hotel, transporte e horários.",
      fields: [
        { k: "cargo", label: "O seu cargo", ph: "cargo" },
        { k: "onde", label: "Onde você trabalha", ph: "onde" },
        { k: "dias", label: "Quantos dias", ph: "quantos dias" },
        { k: "quem", label: "Quem viaja", ph: "quem", hint: "O cargo basta, sem o nome: \"o diretor\". No pedido pronto, troque \"de o\" por \"do\"." },
        { k: "destino", label: "Para onde", ph: "onde" },
        { k: "quando", label: "Em que dias", ph: "em que dias", hint: "Com \"que vem\", escreva a data de hoje." },
        { k: "compromissos", label: "Os compromissos e os horários", ph: "os compromissos e os horários", hint: "\"Uma reunião externa\" no lugar do nome de quem ele vai encontrar." }
      ],
      checks: ["Marque o que é plano e o que é fato, com duas cores", "Cada número de voo, horário, preço, hotel e endereço, na fonte", "Trate como em branco todo fato, com aviso ou sem", "A agenda de ponta a ponta: onde a pessoa está, a cada hora?", "As datas no calendário", "A política de viagens da empresa, se houver", "Ao lado de cada fato confirmado, de onde ele veio"],
      result: "Datas certas. Cerca de 15 fatos sem fonte no roteiro, 8 deles com aviso (os números e horários de voo) e 7 sem nenhum; 2 descuidos de agenda. Uma rodada.",
      privacy: "Documento, data de nascimento, cartão corporativo e código da reserva não entram na conversa." },
    { id: "evento", chap: "Capítulo 11", name: "Eventos: o checklist",
      tpl: "Monte o checklist da organização de {evento} para {pessoas} pessoas daqui a {prazo}, com o que fazer em cada semana.",
      fields: [
        { k: "evento", label: "O evento", ph: "o evento" },
        { k: "pessoas", label: "Quantas pessoas", ph: "quantas" },
        { k: "prazo", label: "Daqui a quanto tempo", ph: "quanto tempo", hint: "Escreva também a data de hoje, para as semanas saírem certas." }
      ],
      checks: ["A data do evento e as semanas no calendário", "Risque o que não serve à sua empresa", "Acrescente o que só você sabe, como quem aprova a despesa e em quanto tempo", "Um nome ao lado de cada tarefa"],
      result: "Nenhum fato de fora afirmado, com a data e as semanas certas. Uma rodada.",
      privacy: "O mesmo pedido serve para a reunião de pais, a festa junina ou a formatura." }
  ];

export const TEMPLATES = [
    { id: "linhas-limite", kind: "sheet", title: "As cinco linhas-limite de um controle de vencimentos", chap: "Capítulo 6",
      desc: "Cole em A1 de uma planilha nova. A coluna B se calcula sozinha a partir de hoje. Cole na coluna D a fórmula que a IA deu, e compare com a coluna E.",
      rows: [["Descrição", "Vencimento", "Valor", "Situação", "Deve aparecer"], ["sem data", "", "100", "", "nada"], ["venceu ontem", "=HOJE()-1", "100", "", "VENCIDA"], ["vence hoje", "=HOJE()", "100", "", "VENCE LOGO"], ["vence em 7 dias", "=HOJE()+7", "100", "", "VENCE LOGO"], ["vence em 8 dias", "=HOJE()+8", "100", "", "nada"]],
      after: "Se a coluna B mostrar números em vez de datas, formate-a como data. Apague estas linhas antes de mandar a planilha a alguém." },
    { id: "orcamentos", kind: "sheet", title: "Comparação de orçamentos", chap: "Capítulo 10",
      desc: "Cole em A1. O total se calcula sozinho. As três últimas colunas são as perguntas para a loja, por escrito.",
      rows: [["Loja", "Preço da unidade", "Quantidade", "Frete", "Total", "Prazo de entrega", "Corridos ou úteis? Contados de quando?", "Validade", "Impostos inclusos?"], ["Loja A", "", "", "", "=B2*C2+D2", "", "", "", ""], ["Loja B", "", "", "", "=B3*C3+D3", "", "", "", ""], ["Loja C", "", "", "", "=B4*C4+D4", "", "", "", ""]],
      after: "Refaça na calculadora o total que a IA der e compare com a coluna E." },
    { id: "boletos", kind: "sheet", title: "Conferência do contas a pagar", chap: "Capítulo 8",
      desc: "Cole em A1. Uma linha por conta: os quatro campos da planilha, os quatro do boleto, e as duas conferências que são suas.",
      rows: [["Conta", "Fornecedor (planilha)", "CNPJ (planilha)", "Valor (planilha)", "Vencimento (planilha)", "Beneficiário (boleto)", "CNPJ (boleto)", "Valor (boleto)", "Vencimento (boleto)", "Divergência? Liguei para o número do cadastro", "Conferido no app do banco"], ["1", "", "", "", "", "", "", "", "", "", ""], ["2", "", "", "", "", "", "", "", "", "", ""]],
      after: "Na IA vão só as colunas B a I. As duas últimas são suas, e nenhuma IA as preenche." },
    { id: "correspondencia", kind: "sheet", title: "A lista que liga o número ao paciente", chap: "Capítulo 3",
      desc: "Para montar a grade com números no lugar dos nomes. Esta lista fica com você e nunca vai para a conversa.",
      rows: [["Número", "Paciente", "Profissional", "Pedido de horário", "Confirmou?", "Lançado no sistema?"], ["1", "", "", "", "", ""], ["2", "", "", "", "", ""], ["3", "", "", "", "", ""]],
      after: "Na IA vão só o número, o profissional e o pedido de horário." },
    { id: "folha-reuniao", kind: "sheet", title: "A folha de anotação da reunião", chap: "Capítulo 4",
      desc: "Preencha durante a reunião, uma linha por ponto. É a régua com que você confere a ata.",
      rows: [["Ponto", "Destino: decidido, adiado ou em discussão", "Quem decidiu, com que palavras", "Quem discordou, e de quê", "Responsável", "Prazo"], ["1", "", "", "", "", ""], ["2", "", "", "", "", ""], ["3", "", "", "", "", ""]],
      after: "Na dúvida entre a ata e a transcrição, vale a sua anotação, e a gravação." },
    { id: "fatos-viagem", kind: "sheet", title: "A fonte de cada fato do roteiro", chap: "Capítulo 11",
      desc: "Cada fato do roteiro começa em branco e só entra quando tem fonte.",
      rows: [["Fato", "O que a IA escreveu", "O que é de verdade", "Onde confirmei", "Quando"], ["Voo de ida (número e horário)", "", "", "", ""], ["Voo de volta (número e horário)", "", "", "", ""], ["Hotel e endereço", "", "", "", ""], ["Trajeto até o compromisso (tempo e preço)", "", "", "", ""], ["Entrada no prédio do compromisso", "", "", "", ""]],
      after: "\"Voo: reserva enviada pela companhia\"; \"hotel: confirmação por e-mail\". Se perguntarem, a resposta está na página." },
    { id: "evento-semanas", kind: "sheet", title: "O checklist do evento, por semana", chap: "Capítulo 11",
      desc: "Cole em A1 e passe para cá o checklist que a IA montar, com um nome ao lado de cada tarefa.",
      rows: [["Semana", "Tarefa", "Responsável", "Quem aprova a despesa", "Feito"], ["1", "", "", "", ""], ["2", "", "", "", ""], ["3", "", "", "", ""]] },
    { id: "politica", kind: "text", title: "A política em cinco linhas", chap: "Capítulo 2",
      desc: "Para colar no pedido de resposta a cliente ou paciente. A política é de quem responde pelo dinheiro: só vale depois do ok de quem decide.",
      text: "Política de [onde] (atendimento):\n1) Remarcação [ou troca] sem custo com até [prazo] de antecedência.\n2) Faltas ou remarcações com menos de [prazo]: [o que acontece].\n3) Reembolso: [quem decide e como se pede, por escrito].\n4) A recepção não promete [horário, prazo, valor] antes de [consultar o quê].\n5) Nunca pedir nem repetir por mensagem [dado de saúde ou outro dado da pessoa].\n[Numa clínica: a recepção não orienta sobre saúde.]" },
    { id: "aprovacao", kind: "text", title: "A mensagem a quem aprova a política", chap: "Capítulo 2",
      desc: "Num lugar pequeno, onde ninguém escreveu nada: escreva o que já se faz, leve para corrigir e aprovar, e pergunte da IA na mesma mensagem.",
      text: "[Tratamento], escrevi em cinco linhas o que fazemos hoje com [falta, remarcação e reembolso]. [O senhor ou a senhora] pode corrigir e aprovar? E posso usar uma IA para rascunhar as respostas aos [pacientes ou clientes], sem nome e sem [dado de saúde ou outro dado pessoal]? Se puder, em qual conta?",
      after: "Guarde a resposta por escrito. Sem regra aprovada, não se usa." },
    { id: "perguntas-ti", kind: "text", title: "As perguntas à TI ou ao jurídico", chap: "Conta pessoal ou conta da empresa",
      desc: "Antes de usar a IA contratada pela empresa. Pergunte por escrito.",
      text: "Antes de usar a IA no trabalho, preciso confirmar três coisas:\n1. Qual IA a empresa contratou, e com qual conta eu entro?\n2. Que material pode ir para ela: dado de cliente, de paciente, de aluno, de colega?\n3. As conversas ficam guardadas, e quem, na empresa, pode ler?",
      after: "Terceirizado num órgão público: mande aos dois, à empresa que o contratou e ao órgão. Os dados são do órgão." },
    { id: "padrao-nomes", kind: "text", title: "Um padrão de nomes de arquivo", chap: "Capítulo 7",
      desc: "O padrão que a IA propôs no teste, que o livro achou bom, com a regra do livro para o que falta no nome.",
      text: "TIPO_descricao_AAAA-MM-DD_vN.ext\n\n- TIPO: CTR (contrato), ATA, OFI (ofício), REL (relatório), ORC (orçamento)...\n- descricao: curta, sem espaço e sem acento, com hífen.\n- AAAA-MM-DD: ano, mês e dia, nessa ordem, para a pasta ficar em ordem de data.\n- vN: a versão, só se o nome antigo disser qual é.\n- Sem data no nome antigo: SEM-DATA, até alguém abrir o arquivo e conferir.\n- Pasta 00-A-Classificar: os arquivos que ninguém sabe o que são (\"scan001\", \"novo documento\").",
      after: "Nenhuma data e nenhuma versão entram no nome novo sem estar no velho, ou sem você abrir o arquivo." },
    { id: "oficio-conf", kind: "check", title: "A forma do ofício", chap: "Capítulo 5",
      desc: "Contra o Manual de Redação da Presidência da República (3ª ed., 2018) ou a norma da sua casa.",
      table: [["Parte", "O que conferir"], ["Número, local e data", "O número segue a sequência da sua pasta; a cidade no lugar de \"Local\"; a data é a do envio"], ["Endereçamento e tratamento", "O tratamento pela regra de quem recebe (no governo federal, só \"senhor\"); na empresa, pelas últimas cartas da diretoria; sem \"Ilustríssimo\" nem \"Digníssimo\""], ["Fecho", "\"Respeitosamente\" para quem está acima de quem assina; \"Atenciosamente\" nos demais casos"], ["Assinatura", "Nome e cargo de quem assina, não de quem redigiu"]] },
    { id: "relatorio-conf", kind: "check", title: "O relatório antes de ir para a chefia", chap: "Capítulo 9",
      desc: "As três saídas para uma frase que a tabela não sustenta.",
      table: [["Conferência", "Como"], ["Cada número", "Ache a linha da tabela de onde ele saiu; refaça porcentagens e variações"], ["Cada conclusão", "Pergunte: a tabela diz isso? Se não: corte, troque por um número, ou transforme em pergunta à chefia"], ["Recomendação", "Pode ficar, se você concorda, como sugestão sua; decidir é de quem lê"], ["Cabeçalho e rodapé", "Período, data, quem fez, fonte dos dados"]] },
    { id: "ata-conf", kind: "check", title: "A ata, ponto por ponto", chap: "Capítulo 4",
      desc: "As cinco perguntas, contra a sua folha de anotação.",
      table: [["Pergunta", "Como"], ["Foi decidido?", "Se a ata diz \"decisão\", ache na transcrição quem decidiu e com que palavras"], ["Quem disse?", "Cada fala e cada tarefa no nome certo"], ["Alguém discordou?", "Se sim, a discordância está registrada"], ["As datas batem?", "Cada data com o dia da semana, no calendário"], ["Presentes e pauta batem?", "Quem estava, quem faltou, a ordem dos assuntos e, se houver, o quórum"]],
      after: "Depois, circule a minuta aos participantes, com prazo curto para correções, antes de arquivar ou colher assinatura." }
  ];

const ATA = "Faça a ata desta reunião, com as decisões e os responsáveis. Transcrição da reunião da coordenação, quinta, 17/09 (gravada com aviso a todos):\nRenata: bom, primeiro ponto, a festa da primavera. Tá decidido que vai ser dia 3 de outubro, no pátio.\nMarcos: fechado. Eu cuido do som.\nRenata: segundo, o uniforme novo. A gente ia decidir hoje, mas o orçamento da malharia não chegou.\nSílvia: então deixa pra próxima reunião.\nRenata: ok, fica pra próxima.\nMarcos: terceiro, a reforma do banheiro dos professores. Eu acho que dá pra fazer nas férias.\nSílvia: eu não concordo, o banheiro tá sem porta, não dá pra esperar até dezembro.\nRenata: vamos pedir três orçamentos essa semana e aí a gente vê. A Sílvia pede os orçamentos.\nSílvia: tá, eu peço.\nRenata: último, o horário de atendimento aos pais passa a ser das 7h30 às 8h, a partir de segunda. Todo mundo de acordo?\nMarcos: de acordo.\nSílvia: de acordo.";

export const EXERCISES = [
    { id: "e1", chap: "Capítulo 2", title: "A promessa fora da política", text: "Invente uma mensagem de cliente chateado, sem dado de ninguém, e uma política de quatro linhas para o caso. Peça a resposta duas vezes, em conversas novas: uma só com a mensagem, outra com a política e a frase \"sem prometer nada que não esteja nela\".", counts: ["Promessas fora da política, sem ela", "Com ela", "Leis citadas (confira na fonte)"] },
    { id: "e2", chap: "Capítulo 3", title: "As três armadilhas da agenda", text: "Invente uma semana: dois profissionais, os horários de cada um e oito pedidos, com um pedido num feriado, dois no mesmo horário e um fora do expediente. Peça a grade com o dia da semana, a data e o que não couber.", counts: ["Armadilhas achadas (de 3)", "Erros de data", "Quem pediu hora certa e saiu da grade"] },
    { id: "e3", chap: "Capítulo 4", title: "A ata que fecha o que ficou aberto", text: "Copie o pedido com a reunião fictícia e mande a uma IA, como está.", material: ATA, counts: ["Decisões que ninguém tomou", "Pontos em que sumiu quem discordou", "Datas que não batem"], after: "No teste do livro: decisão inventada em 2 de 3 atas em 24/09 e em 1 de 3 em 30/09; discordância apagada em 3 de 3 e em 2 de 3." },
    { id: "e4", chap: "Capítulo 5", title: "O ofício com fatos a mais", text: "Invente um pedido formal (o conserto do portão, a troca de um ar-condicionado). Diga quem manda, para quem vai e o que pede, sem dizer a causa nem o estado da coisa. Peça o ofício.", counts: ["Fatos acrescentados", "Fecho certo pela hierarquia? (1 sim, 0 não)", "Data com a cidade? (1 sim, 0 não)"] },
    { id: "e5", chap: "Capítulo 6", title: "As cinco linhas-limite", text: "Cole o modelo das cinco linhas-limite numa planilha nova, peça a fórmula com o pedido da planilha e cole em D2 até D6.", counts: ["Linhas certas (de 5)"], jump: "linhas-limite" },
    { id: "e6", chap: "Capítulo 7", title: "Os dez nomes de arquivo", text: "Copie os dez nomes inventados e peça: \"Proponha um padrão de nomes e de pastas e me dê a lista de cada arquivo com o nome novo e a pasta.\"", material: "scan003.pdf, ata reuniao.docx, Ata 02.10.docx, oficio 14.docx, oficio14 assinado.pdf, contrato limpeza.docx, contrato limpeza NOVO.docx, cardapio semana 3.pdf, relatorio.docx, novo documento (2).docx", counts: ["Arquivos na lista nova (de 10)", "Datas ou palavras que não estavam no nome", "Versões numeradas sem o nome dizer"] },
    { id: "e7", chap: "Capítulo 8", title: "Os dois boletos trocados", text: "Escreva três contas inventadas e copie as três como boletos. Num, troque dois algarismos do valor de lugar, como R$ 249,90 para R$ 294,90; noutro, troque o começo do CNPJ e deixe o fim igual. Peça: \"Confira os boletos contra a planilha de contas a pagar e me diga se posso pagar todos.\"", counts: ["Diferenças achadas (de 2)", "Explicações erradas", "Diferenças apontadas que não existem"] },
    { id: "e8", chap: "Capítulo 9", title: "A conclusão que a tabela não diz", text: "Invente uma tabela de seis números (pedidos de material de três setores em agosto e setembro). Peça: \"Faça um relatório de meia página para a chefia com estes números, com as principais conclusões.\"", counts: ["Números que conferem", "Números que não conferem", "Frases de causa ou de \"o que fazer\" sem apoio", "Período ou data que você não deu"] },
    { id: "e9", chap: "Capítulo 10", title: "O orçamento mais barato que sai mais caro", text: "Copie o pedido, troque [dia, mês e ano] pela data de hoje e mande a uma IA.", material: "Qual orçamento eu escolho? Três orçamentos para 30 carteiras escolares iguais: Loja A: R$ 289,00 cada, frete R$ 950,00, entrega em 45 dias, orçamento válido por 5 dias. Loja B: R$ 312,00 cada, frete grátis, entrega em 40 dias, válido por 15 dias. Loja C: R$ 305,00 cada, frete R$ 600,00, entrega em 20 dias, válido por 30 dias. Hoje é [dia, mês e ano]. A escola precisa das carteiras daqui a cinco semanas.", counts: ["Totais certos (de 3)", "Datas de entrega certas (de 3)", "Disse que supôs dias corridos? (1 sim, 0 não)"] },
    { id: "e10", chap: "Capítulo 11", title: "Plano e fato no roteiro", text: "Peça o roteiro de uma viagem inventada de um dia, entre duas cidades que você conhece, com uma reunião às 14h. Marque, com duas cores, o que é plano e o que é fato.", counts: ["Fatos afirmados", "Com aviso", "Confirmáveis em cinco minutos", "Horários que não fazem sentido"] }
  ];

// ─── The rest of the kit, from the same page ──────────────────────────────

export const KIT = {
    slug: 'ia-no-escritorio',
    checkedOn: 'Configurações das IAs conferidas nas páginas oficiais em 24/09/2026; planos para empresas, em 30/09/2026. Quando algo mudar, muda aqui, com a data.',
    lead: 'Os pedidos do livro para preencher e copiar, os checklists de conferência, os modelos de planilha e de texto, e o que muda mais rápido do que um livro. É curto porque o do volume 1, o IA no dia a dia, já tem o resto, conferido nas páginas oficiais de cada empresa em 24 de setembro de 2026.',
    promises: ['Os pedidos testados no livro', 'Modelos sem dado de ninguém', 'O que você digita fica no seu navegador'],
}

export const RULES = [
    {
        lead: 'Material do trabalho só vai na IA contratada pela empresa.',
        text: 'E só se a regra da empresa deixar. Na sua conta pessoal, nunca, nem no celular, nem "só desta vez". Os treinos deste kit usam material inventado e podem ser feitos numa IA aberta.',
    },
    {
        lead: 'Troque os dados antes de colar.',
        text: 'Se você pede para a IA apagar um nome, ele já foi. Anexar é colar tudo: um PDF ou uma foto levam o documento inteiro.',
    },
    {
        lead: 'Confira antes de usar.',
        text: 'Cada pedido traz o que conferir e o que aconteceu no teste. Uma vez certa não quer dizer sempre certa: a mesma IA responde diferente a cada vez.',
    },
]

export const TEN_THINGS = [
    { title: 'O dado de saúde do paciente', text: 'A LGPD trata o dado de saúde como sensível, e a resposta ao paciente não precisa dele. Pergunta de saúde vai para o médico.' },
    { title: 'CPF, RG e o número de qualquer documento de uma pessoa', text: 'Identificam a pessoa, e nenhuma resposta, planilha ou ofício fica melhor com eles.' },
    { title: 'A ficha do aluno', text: 'Matrícula, histórico, laudo e a situação da família são dados de crianças e adolescentes.' },
    { title: 'A planilha de pessoal', text: 'Nome, salário, conta, férias, faltas e atestados são dados de colegas, e quem responde por eles é a empresa.' },
    { title: 'Senha, código de verificação e acesso a sistema ou banco', text: 'Quem tem o código entra no seu lugar, e nenhum pedido precisa dele.' },
    { title: 'Conta, agência e cartão da empresa', text: 'Para conferir um boleto bastam quem recebe, o CNPJ, o valor e o vencimento.' },
    { title: 'Os documentos do executivo', text: 'O roteiro de viagem se monta sem identidade, passaporte, data de nascimento ou código da reserva.' },
    { title: 'O nome, o telefone e a mensagem inteira de quem escreveu', text: '"Uma paciente" basta. Com cliente de verdade, vai o resumo do pedido.' },
    { title: 'A gravação ou a transcrição de uma reunião reservada', text: 'Demissão, processo, conflito ou saúde de alguém falam de quem não está na conversa.' },
    { title: 'O que a empresa trata como sigilo', text: 'Contrato com cláusula de sigilo, proposta, custo e margem são da empresa, e quem decide é ela.' },
]

export const CAN_GO = [
    'A política da clínica, sem nome de paciente.',
    'As colunas da planilha, sem as linhas.',
    'A lista de nomes de arquivo, lida antes para tirar o nome de gente.',
    'Os quatro campos de um boleto de empresa.',
    'A tabela de totais do mês.',
    'Os orçamentos, sem o contato do vendedor.',
    'O modelo em branco, para você preencher depois.',
]

export const IF_PASTED = [
    { title: 'Apague a conversa', description: 'Apagar não desfaz o envio; diminui o que fica na sua conta.' },
    { title: 'Confira a opção de treino', description: 'A da IA que você usou, na tabela das IAs, mais abaixo.' },
    { title: 'Avise quem responde pela área', description: 'Por escrito.' },
    { title: 'Da próxima vez, troque antes', description: 'Os dados saem antes de colar, não depois.' },
]

export const FRAUD = {
    flags: [
        { lead: 'O "chefe" pede um pagamento urgente.', text: 'Por mensagem ou por áudio, mesmo com a voz dele: golpistas já imitam voz com IA.' },
        { lead: 'O fornecedor "trocou de conta bancária".', text: 'E manda os dados novos, às vezes do endereço de sempre: a caixa pode ter sido invadida.' },
        { lead: 'Um pagamento fora do fluxo de sempre.', text: 'Com pressa e pedido de segredo.' },
    ],
    defense: [
        { title: 'Ligue você, por voz', description: 'Para o número que você já tinha: o do cadastro, do contrato ou da nota anterior. Nunca o que veio no pedido ou no boleto, nem resposta pelo mesmo e-mail.' },
        { title: 'Siga a regra de aprovação', description: 'A da empresa, mesmo quando o pedido diz que não dá tempo.' },
        { title: 'Confira no aplicativo do banco', description: 'Na hora de pagar: o nome e o CNPJ de quem recebe, o valor e o vencimento. Outro nome ali, não pague antes de ligar.' },
    ],
    paid: [
        { title: 'Avise o banco na hora', description: 'O seu, pelos canais oficiais, e o banco que emitiu o boleto.' },
        { title: 'Guarde tudo', description: 'O boleto, as mensagens, os e-mails e o comprovante.' },
        { title: 'Registre o boletim de ocorrência', description: 'Na Polícia Civil ou na delegacia virtual do seu estado, e leve o número ao banco. O MED, o mecanismo de devolução de que fala o volume 1, é do Pix, e boleto não é Pix.' },
    ],
    sources: [
        { label: 'CERT.br', href: 'https://cartilha.cert.br/fasciculos/golpes/fasciculo-golpes.pdf' },
        { label: 'FBI (IC3)', href: 'https://www.ic3.gov/CrimeInfo/BEC' },
        { label: 'Febraban', href: 'https://portal.febraban.org.br/noticia/4279/pt-br/' },
        { label: 'Ministério da Justiça', href: 'https://www.gov.br/mj/pt-br/acesso-a-informacao/acoes-e-programas/sofri-um-golpe-e-agora/paguei-boletos-ou-ofertas-que-se-mostraram-falsos' },
    ],
}

// Checked on the official pages on 24/09/2026 (o-kit.md of the book).
export const AI_TRAINING = [
    { name: 'Claude', open: { label: 'claude.ai', href: 'https://claude.ai/' }, path: 'Settings › Privacy › Help improve our AI models', source: { label: 'Anthropic', href: 'https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings' } },
    { name: 'Gemini', open: { label: 'gemini.google.com', href: 'https://gemini.google.com/' }, path: 'Configurações e ajuda › Atividade › Desativar. Para maiores de 18 anos, vem ligada.', source: { label: 'Google', href: 'https://support.google.com/gemini/answer/13278892?hl=pt-BR' } },
    { name: 'Meta AI', open: { label: 'Dentro do WhatsApp' }, path: 'O que você manda para ela, a Meta recebe. A própria Meta recomenda mandar só o que você não se importa que ela lembre. Mensagem de paciente ou de cliente não vai para ela.', source: { label: 'WhatsApp', href: 'https://www.whatsapp.com/privacyquestions' } },
    { name: 'Copilot', open: { label: 'copilot.microsoft.com', href: 'https://copilot.microsoft.com/' }, path: 'Na versão nova do aplicativo, a Microsoft diz que as conversas não treinam os modelos de base, e não há opção para desligar.', source: { label: 'Microsoft', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls' } },
    { name: 'ChatGPT', open: { label: 'chatgpt.com', href: 'https://chatgpt.com/' }, path: 'Settings › Data Controls › desligar Improve the model for everyone', source: { label: 'OpenAI', href: 'https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt' } },
]

// Checked on the official pages on 30/09/2026.
export const AI_COMPANY = [
    { name: 'Anthropic', text: 'Por padrão, não usa o que se escreve nos produtos comerciais, como o Claude for Work, para treinar; a exceção é quando alguém manda uma avaliação, como o polegar para cima ou para baixo, ou permite.', href: 'https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training' },
    { name: 'Google', text: 'No Gemini com a conta da empresa, numa edição qualificada do Workspace, conversas e arquivos não passam por revisores humanos nem treinam modelos sem permissão.', href: 'https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub' },
    { name: 'Microsoft', text: 'No Microsoft Copilot Chat (antes Microsoft 365 Copilot Chat), entrando com a conta de trabalho, os pedidos e as respostas não treinam os modelos de base, e ficam guardados para auditoria. A proteção aparece como um escudo verde no alto da tela, ao lado de New Chat. Com a conta pessoal da Microsoft, é o Copilot de uso pessoal.', href: 'https://learn.microsoft.com/en-us/copilot/faq' },
    { name: 'OpenAI', text: 'Por padrão, não usa os dados do ChatGPT Business, Enterprise e Edu para treinar, a menos que a empresa tenha escolhido compartilhar.', href: 'https://openai.com/enterprise-privacy/' },
]

export const SOURCES = [
    { title: 'Ofícios e comunicações oficiais', text: 'O Manual de Redação da Presidência da República, 3ª edição, 2018. Para um órgão do estado ou do município, a regra da casa vem antes.', links: [{ label: 'Manual de Redação (PDF)', href: 'https://www4.planalto.gov.br/centrodeestudos/assuntos/manual-de-redacao-da-presidencia-da-republica/manual-de-redacao.pdf' }] },
    { title: 'O tratamento no governo federal', text: 'Decreto 9.758/2019: com agente público federal, o único tratamento é "senhor".', links: [{ label: 'Decreto 9.758/2019', href: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/D9758.htm' }] },
    { title: 'O seu cargo', text: 'A Classificação Brasileira de Ocupações, do Ministério do Trabalho. A busca pede uma verificação de segurança.', links: [{ label: 'CBO, busca por código', href: 'https://cbo.mte.gov.br/cbosite/pages/pesquisas/BuscaPorCodigo.jsf' }] },
    { title: 'Golpes, inclusive o do boleto falso', text: 'Os golpes mais comuns, pela Febraban, e a Cartilha de Segurança para Internet, do CERT.br.', links: [{ label: 'Febraban', href: 'https://portal.febraban.org.br/noticia/4279/pt-br/' }, { label: 'cartilha.cert.br', href: 'https://cartilha.cert.br/' }] },
    { title: 'Dados pessoais', text: 'A LGPD, no texto oficial, e a Agência Nacional de Proteção de Dados (até 2026, Autoridade Nacional).', links: [{ label: 'LGPD', href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm' }, { label: 'ANPD', href: 'https://www.gov.br/anpd/pt-br' }] },
    { title: 'Prazo de guarda de documentos', text: 'Com o contador, com o jurídico e na tabela oficial de temporalidade do seu setor. O kit não indica uma tabela, porque cada setor tem a sua. Não é pergunta para uma IA de conversa.', links: [] },
]

export const UPDATES = [
    { date: '01/10/2026', text: 'O kit online entra no ar, com os pedidos, os modelos, os treinos e o caderno. Configurações conferidas em 24/09/2026 e planos para empresas em 30/09/2026.' },
]

// ─── The kit as one object, for pages/BookKit.jsx ─────────────────────────
//
// BookKit renders every book's kit from an object like this one: the parts
// every kit has (rules, prompts, templates, exercises, notebook, sources) and
// `bands`, the sections only this book has, in order, between the templates
// and the exercises. A band is a CriteriaList, a Callout or a Steps of the
// components kit, with its props; `links` on an item becomes its note.

const steps = (items, icons) => items.map((item, index) => ({ ...item, icon: icons[index] }))

export default {
    slug: 'ia-no-escritorio',
    // The localStorage prefix of the first version of this kit: changing it
    // would lose what readers already typed.
    storage: 'kit-esc',
    testedOn: '24 de setembro de 2026',
    workAI: 'IA contratada pela empresa',
    testedNote: 'Conversas com uma mesma IA, numa configuração neutra, em 24/09/2026; alguns pedidos foram refeitos em 30/09/2026. No seu aplicativo, com a memória e as configurações dele, a resposta pode sair diferente.',
    KIT,
    RULES,
    TASKS,
    TEMPLATES,
    EXERCISES,
    SOURCES,
    UPDATES,
    bands: [
        {
            type: 'criteria',
            id: 'dez',
            subtitle: 'Antes de colar',
            title: 'As dez coisas que nunca se colam',
            description: 'Elas não vão para uma IA aberta, a que você usa com uma conta sua. Na IA contratada pela empresa, só vão se a regra da empresa disser, por escrito. E algumas, como a senha, não vão para nenhuma.',
            items: TEN_THINGS.map((thing, index) => ({ criterion: `${index + 1}. ${thing.title}`, value: thing.text })),
            background: 'gray',
        },
        {
            type: 'callout',
            id: 'pode-ir',
            subtitle: 'O que pode ir',
            title: 'Quase tudo o que o livro mostrou foi feito sem nenhuma das dez',
            cardLabel: 'Pode ir para a IA',
            items: CAN_GO.map(text => ({ lead: '', text })),
            footnote: { lead: 'Anexar é colar tudo.', text: 'Anexe só o que você colaria linha por linha. E não mande a uma colega o link da conversa: quem tiver o link vê o que foi colado. Copie só a resposta.' },
            background: 'white',
        },
        {
            type: 'steps',
            id: 'se-ja-colou',
            subtitle: 'Se já colou',
            title: 'Sem alarme, em quatro passos',
            items: steps(IF_PASTED, ['IconTrash', 'IconShieldCheck', 'IconFileText', 'IconCheck']),
            background: 'gray',
        },
        {
            type: 'callout',
            id: 'golpes',
            subtitle: 'Contas a pagar',
            title: 'Três pedidos que pedem que você pare',
            description: 'A IA confere o que foi digitado, não o boleto, e não tem como saber se ele é verdadeiro.',
            cardLabel: 'Os três sinais',
            items: FRAUD.flags,
            footnote: { lead: 'Fontes:', text: FRAUD.sources.map(source => source.label).join(', ') + '.' },
            background: 'white',
        },
        {
            type: 'steps',
            id: 'defesa',
            subtitle: 'A defesa é a mesma nos três',
            title: 'Pare, ligue você, confira no banco',
            items: steps(FRAUD.defense, ['IconPhoneCall', 'IconAlertTriangle', 'IconBuildingBank']),
            background: 'gray',
        },
        {
            type: 'steps',
            id: 'se-ja-pagou',
            subtitle: 'Se já pagou um boleto falso',
            title: 'O caminho é o banco e o boletim de ocorrência',
            items: steps(FRAUD.paid, ['IconBuildingBank', 'IconReceipt', 'IconMessageOff']),
            background: 'white',
        },
        {
            type: 'criteria',
            id: 'ias',
            subtitle: 'O que muda rápido',
            title: 'O treino com as suas conversas, na conta pessoal',
            description: 'Os testes deste livro foram feitos com uma delas, e os pedidos servem em qualquer uma. Conferido nas páginas oficiais em 24/09/2026; as páginas estão em inglês, e no aplicativo em português os nomes aparecem traduzidos. A ordem é alfabética pela empresa, e não é um ranking. Antes de mudar uma configuração, confira na página de ajuda: os nomes e os caminhos mudam de um mês para outro.',
            items: AI_TRAINING.map(ai => ({ criterion: ai.name, value: ai.path, links: [ai.open, { ...ai.source, prefix: 'página oficial: ' }] })),
            note: 'A memória, a conversa temporária e o histórico de cada uma estão no kit do volume 1, IA no dia a dia.',
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'empresa',
            subtitle: 'Conta pessoal ou conta da empresa',
            title: 'O que os planos para empresas diziam em 30/09/2026',
            description: 'IA aberta é a que você usa com uma conta sua. IA contratada pela empresa é a que tem um contrato que diz o que pode ser feito com o material. "Sem permissão" e "por padrão" querem dizer que a permissão pode ser dada: quem dá é a empresa, e é a ela que você pergunta. E, na conta da empresa, a conversa pode ficar guardada para a empresa.',
            items: AI_COMPANY.map(company => ({ criterion: company.name, value: company.text, links: [{ label: 'Fonte', href: company.href }] })),
            note: 'A LGPD continua valendo, e a lista das dez coisas também. As perguntas para a TI ou o jurídico estão nos modelos.',
            background: 'white',
        },
    ],
}
