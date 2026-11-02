// Written by scripts/build-mcp.js from https://mcp.myagents.click/catalog.json. Do not edit.
export default {
    "categories": [
        {
            "id": "infrastructure",
            "label": "Infrastructure"
        },
        {
            "id": "operations",
            "label": "Operations"
        },
        {
            "id": "customers",
            "label": "Customers"
        },
        {
            "id": "marketing",
            "label": "Marketing"
        },
        {
            "id": "agents-products",
            "label": "Agents"
        },
        {
            "id": "ads",
            "label": "Anúncios"
        }
    ],
    "items": [
        {
            "id": "hoster",
            "title": "Hoster",
            "category": "infrastructure",
            "line": "Infrastructure",
            "domain": "myinfrastructure.click",
            "serverName": "click.myinfrastructure/hoster",
            "url": "https://hoster.worker.myinfrastructure.click/mcp",
            "homepage": "https://hoster.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/hoster.svg?v=6905fdd6",
            "signIn": "Conta do Infrastructure",
            "description": "Publicar sites, domínios, versões e voltar uma versão",
            "isRecommended": true,
            "details": {
                "version": "1.0.0",
                "headline": "Os seus sites, publicados por um agente.",
                "lede": "Projetos, deploys, domínios, cache e versões do Hoster, direto na conversa com o seu assistente de IA. Voltar uma versão é uma frase.",
                "summary": "Conector MCP do Hoster (Infrastructure): publicar sites, domínios, versões e voltar uma versão, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Quais projetos tiveram deploy esta semana?",
                    "Ligue o domínio loja.exemplo.com ao projeto da loja.",
                    "O último deploy quebrou: volte para a versão anterior."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "hoster_list_projects",
                        "title": "Projetos",
                        "text": "Os sites e apps publicados, com domínio e última versão."
                    },
                    {
                        "name": "hoster_deploy_status",
                        "title": "Deploy",
                        "text": "O estado de um deploy em andamento ou terminado."
                    },
                    {
                        "name": "hoster_list_deployments",
                        "title": "Versões",
                        "text": "O histórico de versões de um projeto."
                    },
                    {
                        "name": "hoster_set_domain",
                        "title": "Domínio",
                        "text": "Liga um domínio próprio, com HTTPS."
                    },
                    {
                        "name": "hoster_purge_cache",
                        "title": "Cache",
                        "text": "Limpa o cache depois de uma mudança."
                    },
                    {
                        "name": "hoster_rollback",
                        "title": "Voltar versão",
                        "text": "Põe no ar uma versão anterior. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Infrastructure. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "functions",
            "title": "Functions",
            "category": "infrastructure",
            "line": "Infrastructure",
            "domain": "myinfrastructure.click",
            "serverName": "click.myinfrastructure/functions",
            "url": "https://functions.manager.myinfrastructure.click/mcp",
            "homepage": "https://functions.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/functions.svg?v=6905fdd6",
            "signIn": "Conta do Infrastructure",
            "description": "Publicar e rodar funções, logs, variáveis e agendamentos",
            "host": "manager",
            "details": {
                "version": "1.0.0",
                "headline": "As suas funções, operadas por um agente.",
                "lede": "Publicar, rodar e acompanhar funções do Functions: logs, métricas, variáveis e agendamentos, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Functions (Infrastructure): publicar e rodar funções, logs, variáveis e agendamentos, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "A função de cobrança falhou hoje? Mostre os logs.",
                    "Agende o relatório para rodar toda segunda às 7h.",
                    "Volte a função de webhook para a versão anterior."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "functions_list",
                        "title": "Funções",
                        "text": "As funções da conta, com versão e estado."
                    },
                    {
                        "name": "functions_get_logs",
                        "title": "Logs",
                        "text": "As últimas execuções e os erros de uma função."
                    },
                    {
                        "name": "functions_get_metrics",
                        "title": "Métricas",
                        "text": "Execuções, duração e falhas no período."
                    },
                    {
                        "name": "functions_invoke",
                        "title": "Rodar",
                        "text": "Executa a função agora, com a entrada dada."
                    },
                    {
                        "name": "functions_create_schedule",
                        "title": "Agendar",
                        "text": "Roda a função num horário fixo."
                    },
                    {
                        "name": "functions_publish",
                        "title": "Publicar",
                        "text": "Publica uma versão nova. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Infrastructure. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "monitors",
            "title": "Monitors",
            "category": "infrastructure",
            "line": "Infrastructure",
            "domain": "myinfrastructure.click",
            "serverName": "click.myinfrastructure/monitors",
            "url": "https://monitors.manager.myinfrastructure.click/mcp",
            "homepage": "https://monitors.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/monitors.svg?v=6905fdd6",
            "signIn": "Conta do Infrastructure",
            "description": "Monitores, incidentes, jornadas e páginas de status",
            "host": "manager",
            "details": {
                "version": "1.0.0",
                "headline": "Os seus monitores, vigiados por um agente.",
                "lede": "Monitores, incidentes, jornadas e páginas de status do Monitors, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Monitors (Infrastructure): monitores, incidentes, jornadas e páginas de status, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Algum serviço caiu nas últimas 24 horas?",
                    "Crie um monitor para a API de pagamentos.",
                    "Gere o relatório de disponibilidade do mês."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "monitors_list",
                        "title": "Monitores",
                        "text": "Os monitores da conta e o estado de cada um."
                    },
                    {
                        "name": "monitors_list_incidents",
                        "title": "Incidentes",
                        "text": "O que caiu, quando e por quanto tempo."
                    },
                    {
                        "name": "monitors_get_series",
                        "title": "Histórico",
                        "text": "Tempo de resposta e disponibilidade ao longo do tempo."
                    },
                    {
                        "name": "monitors_get_report",
                        "title": "Relatório",
                        "text": "O relatório de desempenho de um monitor web."
                    },
                    {
                        "name": "monitors_check_now",
                        "title": "Checar agora",
                        "text": "Roda a checagem sem esperar o próximo ciclo."
                    },
                    {
                        "name": "monitors_create",
                        "title": "Novo monitor",
                        "text": "Vigia um endereço ou uma jornada. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Infrastructure. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "storage",
            "title": "Storage",
            "category": "infrastructure",
            "line": "Infrastructure",
            "domain": "myinfrastructure.click",
            "serverName": "click.myinfrastructure/storage",
            "url": "https://storage.manager.myinfrastructure.click/mcp",
            "homepage": "https://storage.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/storage.svg?v=6905fdd6",
            "signIn": "Conta do Infrastructure",
            "description": "Coleções, busca vetorial, SQL e arquivos",
            "host": "manager",
            "details": {
                "version": "1.0.0",
                "headline": "Os seus dados, consultados por um agente.",
                "lede": "Coleções, busca vetorial, SQL e arquivos do Storage, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Storage (Infrastructure): coleções, busca vetorial, sql e arquivos, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Quantos documentos tem a coleção de pedidos?",
                    "Ache os textos parecidos com esta reclamação.",
                    "Guarde este arquivo na pasta de contratos."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "list_collections",
                        "title": "Coleções",
                        "text": "As coleções da conta e o tamanho de cada uma."
                    },
                    {
                        "name": "query_collection",
                        "title": "Consultar",
                        "text": "Busca documentos por filtro."
                    },
                    {
                        "name": "vector_search",
                        "title": "Busca por sentido",
                        "text": "Os documentos mais parecidos com um texto."
                    },
                    {
                        "name": "run_sql",
                        "title": "SQL",
                        "text": "Uma consulta SQL de leitura."
                    },
                    {
                        "name": "list_blobs",
                        "title": "Arquivos",
                        "text": "Os arquivos guardados."
                    },
                    {
                        "name": "upload_blob",
                        "title": "Guardar arquivo",
                        "text": "Envia um arquivo. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Infrastructure. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "auth",
            "title": "Auth",
            "category": "infrastructure",
            "line": "Infrastructure",
            "domain": "myinfrastructure.click",
            "serverName": "click.myinfrastructure/auth",
            "url": "https://auth.worker.myinfrastructure.click/mcp",
            "homepage": "https://auth.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/auth.svg?v=6905fdd6",
            "signIn": "Conta do Infrastructure",
            "description": "Usuários, sessões, logins sociais e webhooks da sua aplicação",
            "addressPrefix": "https://auth.worker.myinfrastructure.click/mcp/",
            "addressHint": "Cole o endereço MCP do seu projeto: no painel do Auth, em Acesso → MCP.",
            "details": {
                "version": "1.0.0",
                "headline": "O login da sua aplicação, administrado por um agente.",
                "lede": "Usuários, sessões, logins sociais e webhooks do Auth da sua aplicação, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Auth (Infrastructure): usuários, sessões, logins sociais e webhooks da sua aplicação, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Quantas pessoas entraram esta semana?",
                    "Encerre as sessões deste usuário.",
                    "Ligue o login com o Google."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "auth_get_statistics",
                        "title": "Números",
                        "text": "Cadastros, logins e sessões ativas."
                    },
                    {
                        "name": "auth_list_users",
                        "title": "Usuários",
                        "text": "As pessoas cadastradas, com busca."
                    },
                    {
                        "name": "auth_list_user_sessions",
                        "title": "Sessões",
                        "text": "As sessões abertas de uma pessoa."
                    },
                    {
                        "name": "auth_revoke_user_sessions",
                        "title": "Encerrar sessões",
                        "text": "Desconecta uma pessoa de tudo. Pede aprovação."
                    },
                    {
                        "name": "auth_configure_social_connection",
                        "title": "Login social",
                        "text": "Liga o login com Google, Apple e outros. Pede aprovação."
                    },
                    {
                        "name": "auth_create_webhook",
                        "title": "Webhooks",
                        "text": "Avisa o seu sistema a cada cadastro ou login."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Infrastructure. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "messages",
            "title": "Messages",
            "category": "infrastructure",
            "line": "Infrastructure",
            "domain": "myinfrastructure.click",
            "serverName": "click.myinfrastructure/messages",
            "url": "https://messages.worker.myinfrastructure.click/mcp",
            "homepage": "https://messages.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/messages.svg?v=6905fdd6",
            "signIn": "Conta do Infrastructure",
            "description": "E-mails transacionais: enviar, métricas, domínios e modelos",
            "addressPrefix": "https://messages.worker.myinfrastructure.click/mcp/",
            "addressHint": "Cole o endereço MCP do seu projeto: no painel do Messages, em Integração → MCP.",
            "details": {
                "version": "1.0.0",
                "headline": "Os seus e-mails transacionais, operados por um agente.",
                "lede": "Envios, métricas, domínios e modelos do Messages, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Messages (Infrastructure): e-mails transacionais: enviar, métricas, domínios e modelos, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Quantos e-mails voltaram esta semana, e por quê?",
                    "Verifique o domínio de envio novo.",
                    "Mande o e-mail de boas-vindas para este cliente."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "messages_list_emails",
                        "title": "Envios",
                        "text": "Os e-mails enviados e o estado de cada um."
                    },
                    {
                        "name": "messages_get_metrics",
                        "title": "Métricas",
                        "text": "Entregas, aberturas, devoluções e reclamações."
                    },
                    {
                        "name": "messages_list_domains",
                        "title": "Domínios",
                        "text": "Os domínios de envio e a verificação deles."
                    },
                    {
                        "name": "messages_list_suppressions",
                        "title": "Bloqueios",
                        "text": "Os endereços que não recebem mais."
                    },
                    {
                        "name": "messages_create_template",
                        "title": "Modelos",
                        "text": "Cria um modelo de e-mail."
                    },
                    {
                        "name": "messages_send_email",
                        "title": "Enviar",
                        "text": "Envia um e-mail. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Infrastructure. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "payments",
            "title": "Payments",
            "category": "infrastructure",
            "line": "Infrastructure",
            "domain": "myinfrastructure.click",
            "serverName": "click.myinfrastructure/payments",
            "url": "https://payments.worker.myinfrastructure.click/mcp",
            "homepage": "https://payments.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/payments.svg?v=6905fdd6",
            "signIn": "Conta do Infrastructure",
            "description": "Planos, assinaturas, links de pagamento e métricas",
            "reauthorizeLabel": "Mudar os projetos",
            "details": {
                "version": "1.0.0",
                "headline": "As suas cobranças, acompanhadas por um agente.",
                "lede": "Planos, assinaturas, links de pagamento e métricas do Payments, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Payments (Infrastructure): planos, assinaturas, links de pagamento e métricas, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Quanto entrou este mês, e quantas assinaturas novas?",
                    "Crie um link de pagamento de R$ 497 para a mentoria.",
                    "Quais assinaturas venceram sem pagar?"
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "payments_get_project",
                        "title": "Onde estou",
                        "text": "O projeto, os gateways e se está em teste ou ao vivo."
                    },
                    {
                        "name": "payments_get_metrics",
                        "title": "Métricas",
                        "text": "Receita, assinaturas ativas, novas e canceladas."
                    },
                    {
                        "name": "payments_list_subscriptions",
                        "title": "Assinaturas",
                        "text": "As assinaturas e o estado de cada uma."
                    },
                    {
                        "name": "payments_list_plans",
                        "title": "Planos",
                        "text": "Os planos e os preços."
                    },
                    {
                        "name": "payments_create_checkout_link",
                        "title": "Link de pagamento",
                        "text": "Um link pronto para mandar ao cliente. Pede aprovação."
                    },
                    {
                        "name": "payments_update_subscription",
                        "title": "Mudar assinatura",
                        "text": "Troca o plano ou cancela. Pede aprovação."
                    },
                    {
                        "name": "payments_create_webhook",
                        "title": "Webhooks",
                        "text": "Avisa o seu sistema a cada pagamento."
                    }
                ],
                "data": [
                    {
                        "title": "Você escolhe os projetos",
                        "text": "Você entra com a conta do Infrastructure e, na tela de autorização, marca os projetos que este assistente pode operar. Com mais de um, cada chamada diz de qual se trata."
                    },
                    {
                        "title": "Ler é livre, cobrar pede aprovação",
                        "text": "Criar um link, mudar uma assinatura ou cobrar se declaram como ações, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "tasks",
            "title": "Tasks",
            "category": "operations",
            "line": "Operations",
            "domain": "myoperations.click",
            "serverName": "click.myoperations/tasks",
            "url": "https://tasks.worker.myoperations.click/mcp",
            "homepage": "https://tasks.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/tasks.svg?v=6905fdd6",
            "signIn": "Conta do Operations",
            "description": "Quadros, pedidos, regras e métricas do trabalho",
            "isRecommended": true,
            "details": {
                "version": "1.0.0",
                "headline": "O seu trabalho, acompanhado por um agente.",
                "lede": "Quadros, pedidos, regras e métricas do Tasks, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Tasks (Operations): quadros, pedidos, regras e métricas do trabalho, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "O que está atrasado no quadro do time?",
                    "Abra um pedido para revisar o contrato até sexta.",
                    "Como ficou a métrica de entregas este mês?"
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "tasks_list_boards",
                        "title": "Quadros",
                        "text": "Os quadros e o que está em cada coluna."
                    },
                    {
                        "name": "tasks_read_board",
                        "title": "Um quadro",
                        "text": "O trabalho em andamento, parado e atrasado."
                    },
                    {
                        "name": "tasks_list_requests",
                        "title": "Pedidos",
                        "text": "Os pedidos abertos e quem cuida de cada um."
                    },
                    {
                        "name": "tasks_create_request",
                        "title": "Novo pedido",
                        "text": "Abre um pedido com prazo e responsável."
                    },
                    {
                        "name": "tasks_list_metrics",
                        "title": "Métricas",
                        "text": "Os números que o time acompanha."
                    },
                    {
                        "name": "tasks_run_rule",
                        "title": "Regras",
                        "text": "Roda uma automação do quadro. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Operations. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "videos",
            "title": "Videos",
            "category": "operations",
            "line": "Operations",
            "domain": "myoperations.click",
            "serverName": "click.myoperations/videos",
            "url": "https://videos.worker.myoperations.click/mcp",
            "homepage": "https://videos.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/videos.svg?v=6905fdd6",
            "signIn": "Conta do Operations",
            "description": "Vídeos, retenção, comentários e envios",
            "details": {
                "version": "1.0.0",
                "headline": "Os seus vídeos, acompanhados por um agente.",
                "lede": "Vídeos, retenção, comentários e envios do Videos, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Videos (Operations): vídeos, retenção, comentários e envios, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Em que ponto as pessoas param de assistir a aula 3?",
                    "Quais comentários ainda não têm resposta?",
                    "Quanto do plano já usei este mês?"
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "videos_list",
                        "title": "Vídeos",
                        "text": "Os vídeos da conta, com duração e visualizações."
                    },
                    {
                        "name": "videos_get_retention",
                        "title": "Retenção",
                        "text": "Até onde as pessoas assistem cada vídeo."
                    },
                    {
                        "name": "videos_get_transcript",
                        "title": "Transcrição",
                        "text": "O texto falado no vídeo."
                    },
                    {
                        "name": "videos_list_comments",
                        "title": "Comentários",
                        "text": "O que as pessoas comentaram."
                    },
                    {
                        "name": "videos_reply_comment",
                        "title": "Responder",
                        "text": "Responde um comentário. Pede aprovação."
                    },
                    {
                        "name": "videos_usage",
                        "title": "Uso",
                        "text": "Armazenamento e minutos usados no plano."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Operations. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "analytics",
            "title": "Analytics",
            "category": "operations",
            "line": "Operations",
            "domain": "myoperations.click",
            "serverName": "click.myoperations/analytics",
            "url": "https://analytics.worker.myoperations.click/mcp",
            "homepage": "https://analytics.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/analytics.svg?v=6905fdd6",
            "signIn": "Conta do Operations",
            "description": "Visitas, páginas, origens e metas dos seus sites, sem cookies",
            "details": {
                "version": "1.0.0",
                "headline": "As visitas do seu site, lidas por um agente.",
                "lede": "Visitas, páginas, origens, público e metas do Analytics, sem cookies, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Analytics (Operations): visitas, páginas, origens e metas dos seus sites, sem cookies, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Quantas visitas o site teve esta semana, e de onde?",
                    "Quais páginas mais levaram à meta de inscrição?",
                    "O rastreador está instalado e funcionando?"
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "analytics_list_sites",
                        "title": "Sites",
                        "text": "Os sites medidos pela conta."
                    },
                    {
                        "name": "analytics_overview",
                        "title": "Resumo",
                        "text": "Visitas, visitantes e tempo no período."
                    },
                    {
                        "name": "analytics_pages",
                        "title": "Páginas",
                        "text": "As páginas mais vistas."
                    },
                    {
                        "name": "analytics_sources",
                        "title": "Origens",
                        "text": "De onde vêm as visitas."
                    },
                    {
                        "name": "analytics_goals",
                        "title": "Metas",
                        "text": "As conversões de cada meta."
                    },
                    {
                        "name": "analytics_site_health",
                        "title": "Saúde",
                        "text": "Se o rastreador está instalado e recebendo dados."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Operations. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "profile",
            "title": "Profile",
            "category": "operations",
            "line": "Operations",
            "domain": "myoperations.click",
            "serverName": "click.myoperations/profile",
            "url": "https://profile.worker.myoperations.click/mcp",
            "homepage": "https://profile.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/profile.svg?v=6905fdd6",
            "signIn": "Conta do Operations",
            "description": "Quem a empresa é e o que pode afirmar: resumo, seções, checagem de texto e propostas",
            "isRecommended": true,
            "reauthorizeLabel": "Mudar as empresas",
            "details": {
                "version": "1.0.0",
                "headline": "Quem a empresa é, lido por todo agente antes de agir.",
                "lede": "O Profile guarda quem a empresa é e o que ela pode afirmar: ofertas, público, voz, o que nunca se diz, regras e quem aprova. O assistente lê o resumo antes de escrever em nome dela, confere o texto antes de sair e propõe o que faltar; nada muda sem alguém aprovar.",
                "summary": "Conector MCP do Profile (Operations): quem a empresa é e o que pode afirmar: resumo, seções, checagem de texto e propostas, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Quem é a empresa para quem você trabalha?",
                    "Confira este post antes de publicar.",
                    "O cliente disse que o preço mudou: registre a proposta."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "profile_companies",
                        "title": "Empresas",
                        "text": "As empresas que a conexão alcança, com o papel da pessoa em cada uma."
                    },
                    {
                        "name": "profile_brief",
                        "title": "Resumo",
                        "text": "Quem fala, a promessa, as ofertas no ar, para quem, a voz, o nunca dizer e quem aprova, em até 700 palavras."
                    },
                    {
                        "name": "profile_read",
                        "title": "Ler uma seção",
                        "text": "Uma das treze seções inteira, ou um item dela."
                    },
                    {
                        "name": "profile_check",
                        "title": "Conferir um texto",
                        "text": "O que reprova num texto antes de ele sair: frase proibida, item interno vazado, oferta que não existe, preço errado."
                    },
                    {
                        "name": "profile_propose",
                        "title": "Propor uma mudança",
                        "text": "Cria, muda ou tira um item, como proposta na fila. Nada muda até alguém aprovar."
                    }
                ],
                "data": [
                    {
                        "title": "Você escolhe as empresas",
                        "text": "Você entra com o login do Operations e, na tela de autorização, marca as empresas que este assistente pode ler. Com mais de uma, cada chamada diz de qual se trata."
                    },
                    {
                        "title": "Interno nunca sai",
                        "text": "Cada item é público ou interno. O interno orienta o agente e a checagem reprova o texto que o deixa vazar."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "people",
            "title": "People",
            "category": "customers",
            "line": "Customers",
            "domain": "mycustomers.click",
            "serverName": "click.mycustomers/people",
            "url": "https://people.worker.mycustomers.click/mcp",
            "homepage": "https://people.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/people.svg?v=6905fdd6",
            "signIn": "Conta do Customers",
            "description": "Pessoas, histórico e anotações dos seus clientes",
            "isRecommended": true,
            "details": {
                "version": "1.0.0",
                "headline": "Os seus clientes, conhecidos por um agente.",
                "lede": "Pessoas, histórico e anotações do People, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do People (Customers): pessoas, histórico e anotações dos seus clientes, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "O que aconteceu com este cliente nos últimos 30 dias?",
                    "Anote que ele pediu proposta para março.",
                    "Quem não fala com a gente há mais de 60 dias?"
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "people_list_people",
                        "title": "Pessoas",
                        "text": "Os clientes e contatos, com busca."
                    },
                    {
                        "name": "people_get_person",
                        "title": "Uma pessoa",
                        "text": "Tudo o que se sabe de alguém."
                    },
                    {
                        "name": "people_get_timeline",
                        "title": "Histórico",
                        "text": "Cada interação, em ordem."
                    },
                    {
                        "name": "people_add_note",
                        "title": "Anotar",
                        "text": "Guarda uma anotação no histórico."
                    },
                    {
                        "name": "people_propose_action",
                        "title": "Próximo passo",
                        "text": "Sugere a ação seguinte para você aprovar."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Customers. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "feeds",
            "title": "Feeds",
            "category": "marketing",
            "line": "Marketing",
            "domain": "mymarketing.click",
            "serverName": "click.mymarketing/feeds",
            "url": "https://feeds.worker.mymarketing.click/mcp",
            "homepage": "https://feeds.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/feeds.svg?v=6905fdd6",
            "signIn": "Conta do Marketing",
            "description": "Peças, referências, agenda e publicação nas redes",
            "isRecommended": true,
            "details": {
                "version": "1.0.0",
                "headline": "As suas redes, planejadas com um agente.",
                "lede": "Peças, referências, agenda e publicação do Feeds, direto na conversa com o seu assistente de IA, na voz da sua marca.",
                "summary": "Conector MCP do Feeds (Marketing): peças, referências, agenda e publicação nas redes, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Planeje a semana de posts a partir das referências novas.",
                    "Escreva a peça sobre o lançamento e gere a capa.",
                    "Quais peças tiveram mais resultado este mês?"
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "feeds_plan_week",
                        "title": "Planejar a semana",
                        "text": "Sugere as peças da semana a partir da estratégia."
                    },
                    {
                        "name": "feeds_write_piece",
                        "title": "Escrever",
                        "text": "Escreve uma peça na voz da marca."
                    },
                    {
                        "name": "feeds_generate_visual",
                        "title": "Visual",
                        "text": "Gera a imagem ou a capa da peça."
                    },
                    {
                        "name": "feeds_results",
                        "title": "Resultados",
                        "text": "O desempenho das peças publicadas."
                    },
                    {
                        "name": "feeds_submit_for_approval",
                        "title": "Aprovação",
                        "text": "Manda a peça para você aprovar."
                    },
                    {
                        "name": "feeds_schedule_piece",
                        "title": "Agendar",
                        "text": "Agenda a publicação. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Marketing. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "blogs",
            "title": "Blogs",
            "category": "marketing",
            "line": "Marketing",
            "domain": "mymarketing.click",
            "serverName": "click.mymarketing/blogs",
            "url": "https://blogs.worker.mymarketing.click/mcp",
            "homepage": "https://blogs.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/blogs.svg?v=6905fdd6",
            "signIn": "Conta do Marketing",
            "description": "Posts, rascunhos, agendamento e comentários",
            "reauthorizeLabel": "Mudar os blogs",
            "details": {
                "version": "1.0.0",
                "headline": "O seu blog, escrito com um agente.",
                "lede": "Posts, rascunhos, agendamento e comentários do Blogs, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Blogs (Marketing): posts, rascunhos, agendamento e comentários, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Sugira três posts a partir do que mais buscam no site.",
                    "Escreva o rascunho sobre preço por assinatura.",
                    "Agende o post de terça para as 9h."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "blogs_list_posts",
                        "title": "Posts",
                        "text": "Os posts publicados e os rascunhos."
                    },
                    {
                        "name": "blogs_search",
                        "title": "Busca",
                        "text": "Acha posts por assunto."
                    },
                    {
                        "name": "blogs_suggest",
                        "title": "Ideias",
                        "text": "Sugere pautas para o blog."
                    },
                    {
                        "name": "blogs_create_draft",
                        "title": "Rascunho",
                        "text": "Escreve um rascunho novo."
                    },
                    {
                        "name": "blogs_request_review",
                        "title": "Revisão",
                        "text": "Manda o rascunho para você revisar."
                    },
                    {
                        "name": "blogs_schedule_post",
                        "title": "Agendar",
                        "text": "Agenda a publicação. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Marketing. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "pages",
            "title": "Pages",
            "category": "marketing",
            "line": "Marketing",
            "domain": "mymarketing.click",
            "serverName": "click.mymarketing/pages",
            "url": "https://pages.worker.mymarketing.click/mcp",
            "homepage": "https://pages.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/pages.svg?v=6905fdd6",
            "signIn": "Conta do Marketing",
            "description": "Páginas, rascunhos, publicação e redirecionamentos",
            "details": {
                "version": "1.0.0",
                "headline": "As suas páginas, editadas por um agente.",
                "lede": "Páginas, rascunhos, publicação e redirecionamentos do Pages, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Pages (Marketing): páginas, rascunhos, publicação e redirecionamentos, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Crie uma página de inscrição para o evento de novembro.",
                    "Algum link quebrado nas páginas publicadas?",
                    "Redirecione /promo para a página nova."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "pages_list",
                        "title": "Páginas",
                        "text": "As páginas e o estado de cada uma."
                    },
                    {
                        "name": "pages_results",
                        "title": "Resultados",
                        "text": "Visitas e conversões de cada página."
                    },
                    {
                        "name": "pages_draft_create",
                        "title": "Rascunho",
                        "text": "Monta uma página nova a partir de um pedido."
                    },
                    {
                        "name": "pages_links_check",
                        "title": "Links",
                        "text": "Confere os links quebrados."
                    },
                    {
                        "name": "pages_redirect_set",
                        "title": "Redirecionar",
                        "text": "Leva um endereço antigo para um novo."
                    },
                    {
                        "name": "pages_publish",
                        "title": "Publicar",
                        "text": "Põe a página no ar. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Marketing. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "newsletter",
            "title": "Newsletter",
            "category": "marketing",
            "line": "Marketing",
            "domain": "mymarketing.click",
            "serverName": "click.mymarketing/newsletter",
            "url": "https://newsletter.worker.mymarketing.click/mcp",
            "homepage": "https://newsletter.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/newsletter.svg?v=6905fdd6",
            "signIn": "Conta do Marketing",
            "description": "Listas, edições, rascunhos e envio de teste",
            "reauthorizeLabel": "Mudar as listas",
            "details": {
                "version": "1.0.0",
                "headline": "A sua newsletter, preparada por um agente.",
                "lede": "Listas, edições, rascunhos e envio de teste da Newsletter, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Newsletter (Marketing): listas, edições, rascunhos e envio de teste, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Quantos inscritos entraram este mês?",
                    "Monte a edição da semana com os três posts novos.",
                    "Mande um teste para o meu e-mail."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "newsletter_list_lists",
                        "title": "Listas",
                        "text": "As listas e quantas pessoas cada uma tem."
                    },
                    {
                        "name": "newsletter_list_issues",
                        "title": "Edições",
                        "text": "As edições enviadas e os rascunhos."
                    },
                    {
                        "name": "newsletter_get_stats",
                        "title": "Resultados",
                        "text": "Aberturas e cliques de cada edição."
                    },
                    {
                        "name": "newsletter_create_draft",
                        "title": "Rascunho",
                        "text": "Escreve a edição nova."
                    },
                    {
                        "name": "newsletter_send_test",
                        "title": "Teste",
                        "text": "Envia a edição para um e-mail de teste."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Marketing. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "forms",
            "title": "Forms",
            "category": "marketing",
            "line": "Marketing",
            "domain": "mymarketing.click",
            "serverName": "click.mymarketing/forms",
            "url": "https://forms.worker.mymarketing.click/mcp",
            "homepage": "https://forms.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/forms.svg?v=6905fdd6",
            "signIn": "Conta do Marketing",
            "description": "Formulários e respostas",
            "details": {
                "version": "1.0.0",
                "headline": "Os seus formulários, lidos por um agente.",
                "lede": "Formulários e respostas do Forms, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Forms (Marketing): formulários e respostas, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Resuma as respostas do formulário de inscrição.",
                    "Crie um formulário de feedback com cinco perguntas.",
                    "Quantas pessoas responderam esta semana?"
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "forms_list",
                        "title": "Formulários",
                        "text": "Os formulários e quantas respostas têm."
                    },
                    {
                        "name": "forms_list_responses",
                        "title": "Respostas",
                        "text": "As respostas de um formulário."
                    },
                    {
                        "name": "forms_get_schema",
                        "title": "Perguntas",
                        "text": "As perguntas e os tipos de resposta."
                    },
                    {
                        "name": "forms_create",
                        "title": "Novo formulário",
                        "text": "Monta um formulário a partir de um pedido."
                    },
                    {
                        "name": "forms_publish",
                        "title": "Publicar",
                        "text": "Põe o formulário no ar. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Marketing. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "links",
            "title": "Links",
            "category": "marketing",
            "line": "Marketing",
            "domain": "mymarketing.click",
            "serverName": "click.mymarketing/links",
            "url": "https://links.worker.mymarketing.click/mcp",
            "homepage": "https://links.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/links.svg?v=6905fdd6",
            "signIn": "Conta do Marketing",
            "description": "Links curtos, cliques e campanhas",
            "details": {
                "version": "1.0.0",
                "headline": "Os seus links, medidos por um agente.",
                "lede": "Links curtos, cliques e campanhas do Links, direto na conversa com o seu assistente de IA.",
                "summary": "Conector MCP do Links (Marketing): links curtos, cliques e campanhas, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Qual link da campanha de outubro teve mais cliques?",
                    "Crie um link curto para a página de preços.",
                    "Troque o destino do link da bio."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "links_list",
                        "title": "Links",
                        "text": "Os links curtos e o destino de cada um."
                    },
                    {
                        "name": "links_stats",
                        "title": "Cliques",
                        "text": "Cliques por dia, origem e país."
                    },
                    {
                        "name": "links_campaign_report",
                        "title": "Campanhas",
                        "text": "O resultado de uma campanha inteira."
                    },
                    {
                        "name": "links_create",
                        "title": "Novo link",
                        "text": "Cria um link curto."
                    },
                    {
                        "name": "links_update_destination",
                        "title": "Novo destino",
                        "text": "Troca para onde o link leva. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Marketing. Cada produto pede a própria autorização, e o token de um não abre o outro."
                    },
                    {
                        "title": "Ler é livre, mudar pede aprovação",
                        "text": "As ferramentas que criam, publicam, enviam ou apagam algo se declaram assim, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "designs",
            "title": "Designs",
            "category": "marketing",
            "line": "Marketing",
            "domain": "mymarketing.click",
            "serverName": "click.mymarketing/designs",
            "url": "https://designs.worker.mymarketing.click/mcp",
            "homepage": "https://designs.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/designs.svg?v=6905fdd6",
            "signIn": "Conta do Marketing",
            "description": "Designs de imagem e vídeo: modelos, edição, marca, IA e exportação",
            "details": {
                "version": "1.0.0",
                "headline": "Os seus designs e vídeos, feitos por um agente.",
                "lede": "Posts, stories, folhetos e vídeos do Designs: modelos, edição de cada elemento, marca, IA e o arquivo pronto, direto na conversa com o seu assistente de IA. Toda mudança deixa uma versão para voltar.",
                "summary": "Conector MCP do Designs (Marketing): designs de imagem e vídeo: modelos, edição, marca, ia e exportação, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Crie um post de promoção de bolo de pote com a minha marca e baixe em PNG.",
                    "Transforme este folheto num Reels com música calma e legendas.",
                    "Troque a foto do post por uma de café do banco e o título por \"Só hoje\"."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "designs_find",
                        "title": "Buscar",
                        "text": "Modelos, fotos e vídeos do banco, músicas, arquivos e marcas."
                    },
                    {
                        "name": "designs_create",
                        "title": "Criar",
                        "text": "Do zero, de um modelo, de um arquivo, cópia, ou um design virado vídeo."
                    },
                    {
                        "name": "designs_edit",
                        "title": "Editar",
                        "text": "Textos, fotos, cores, elementos, páginas, animações e a linha do tempo do vídeo."
                    },
                    {
                        "name": "designs_ai",
                        "title": "IA",
                        "text": "Preencher com um texto, legenda, fundo novo, remover fundo e legendas do vídeo."
                    },
                    {
                        "name": "designs_brand",
                        "title": "Marca",
                        "text": "Aplica a marca da conta ao design."
                    },
                    {
                        "name": "designs_export",
                        "title": "Baixar",
                        "text": "PNG, JPG, PDF, PDF para gráfica, GIF, carrossel ou MP4."
                    },
                    {
                        "name": "designs_versions",
                        "title": "Versões",
                        "text": "Volta o design a uma versão anterior."
                    }
                ],
                "data": [
                    {
                        "title": "Um login, autorização por produto",
                        "text": "Você entra com a conta do Marketing. O Designs pede a própria autorização, e o token dele não abre outro produto."
                    },
                    {
                        "title": "Nada se perde",
                        "text": "Cada edição do agente deixa uma versão para voltar, e excluir um design ou mexer nas chaves fica só com você, no painel."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "brain",
            "title": "Brain",
            "category": "agents-products",
            "line": "Brain",
            "domain": "myagents.click",
            "serverName": "click.myagents/brain",
            "url": "https://brain.worker.myagents.click/mcp",
            "reauthorizeLabel": "Mudar os espaços",
            "homepage": "https://brain.mcp.myagents.click",
            "icon": "https://mcp.myagents.click/icons/brain.svg?v=6905fdd6",
            "signIn": "Conta do Agents",
            "description": "A memória do seu assistente: guarda decisões e preferências, acha de novo e você revisa num painel",
            "isRecommended": true,
            "details": {
                "version": "1.0.0",
                "headline": "A memória do seu assistente, num espaço seu.",
                "lede": "O Brain guarda o que foi decidido, o que você prefere e onde o trabalho parou, e o assistente acha de novo na próxima conversa. Um endereço por espaço, com login; você vê e corrige tudo num painel.",
                "summary": "Conector MCP do Brain (Agents): a memória do seu assistente: guarda decisões e preferências, acha de novo e você revisa num painel, direto no seu assistente de IA.",
                "signIn": {
                    "kind": "line",
                    "label": "Conta da linha",
                    "text": null
                },
                "canWrite": true,
                "asks": [
                    "Guarde que usamos MySQL nos pedidos, porque o cliente já opera MySQL.",
                    "Qual banco decidimos usar nos pedidos?",
                    "Registre onde paramos: falta só testar o estorno."
                ],
                "sample": null,
                "tools": [
                    {
                        "name": "search",
                        "title": "Procurar",
                        "text": "Acha por sentido e por palavra exata o que ainda vale; sem pergunta, lista os caminhos em uso."
                    },
                    {
                        "name": "resume",
                        "title": "Retomar",
                        "text": "Lê o ponto onde uma tarefa parou."
                    },
                    {
                        "name": "save",
                        "title": "Guardar",
                        "text": "Guarda uma decisão, preferência, observação ou referência, com a fonte e o porquê."
                    },
                    {
                        "name": "revise",
                        "title": "Atualizar",
                        "text": "Troca uma memória por uma versão nova; a anterior fica como histórico."
                    },
                    {
                        "name": "forget",
                        "title": "Esquecer",
                        "text": "Faz uma memória parar de valer, sem apagá-la de vez."
                    },
                    {
                        "name": "checkpoint",
                        "title": "Onde parou",
                        "text": "Registra o objetivo, o que foi feito, o que bloqueia e o próximo passo."
                    }
                ],
                "data": [
                    {
                        "title": "Você escolhe os espaços",
                        "text": "Você entra com o login do Agents e, na tela de autorização, marca os espaços que este assistente pode usar. O token vale só para eles."
                    },
                    {
                        "title": "Nada some de vez",
                        "text": "O que mudou vira histórico, e apagar de vez só no painel, digitando o nome do espaço."
                    }
                ],
                "limits": null
            }
        },
        {
            "id": "search-console",
            "title": "Google Search Console",
            "category": "data",
            "line": "Agents",
            "domain": "search.google.com",
            "serverName": "click.myagents/search-console",
            "url": "https://search-console.mcp.myagents.click/mcp",
            "homepage": "https://search-console.mcp.myagents.click",
            "signIn": "Google",
            "description": "Cliques, impressões e posição do seu site na Busca do Google",
            "isRecommended": true,
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.2.0",
                "headline": "O seu Search Console, lido por um agente.",
                "lede": "Cliques, impressões, posição e indexação do seu site, direto na conversa com o seu assistente de IA. Você entra com o Google, e o acesso é só de leitura.",
                "summary": "Conector MCP do Agents para o Google Search Console: o seu assistente de IA lê cliques, impressões, posição e indexação do seu site, com login do Google e só leitura.",
                "signIn": {
                    "kind": "google",
                    "label": "Login do Google",
                    "text": "Escolha a conta que tem acesso às suas propriedades e autorize a leitura do Search Console."
                },
                "canWrite": false,
                "asks": [
                    "Quais consultas mais subiram nos últimos 28 dias?"
                ],
                "sample": {
                    "ask": "Quais consultas mais subiram nos últimos 28 dias?",
                    "tool": "compare_periods",
                    "columns": [
                        "Consulta",
                        "Cliques",
                        "Variação",
                        "Posição"
                    ],
                    "rows": [
                        [
                            "agenda de reuniões",
                            "412",
                            "+138",
                            "3,2"
                        ],
                        [
                            "modelo de proposta",
                            "287",
                            "+96",
                            "4,8"
                        ],
                        [
                            "como medir churn",
                            "164",
                            "+51",
                            "6,1"
                        ],
                        [
                            "planilha de metas",
                            "98",
                            "+33",
                            "8,4"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm da sua conta, com o atraso normal de dois a três dias do Search Console."
                },
                "tools": [
                    {
                        "name": "list_sites",
                        "title": "Propriedades",
                        "text": "Os sites da conta e o nível de permissão de cada um."
                    },
                    {
                        "name": "search_performance",
                        "title": "Desempenho",
                        "text": "Cliques, impressões, CTR e posição por consulta, página, país, aparelho ou data."
                    },
                    {
                        "name": "compare_periods",
                        "title": "Comparação",
                        "text": "O período atual contra o anterior, com a variação de cada métrica."
                    },
                    {
                        "name": "list_sitemaps",
                        "title": "Sitemaps",
                        "text": "Os sitemaps enviados, quantas URLs têm, erros e avisos."
                    },
                    {
                        "name": "inspect_url",
                        "title": "Inspeção de URL",
                        "text": "Indexação, último rastreio, canônica e problemas de uma página."
                    }
                ],
                "data": [
                    {
                        "title": "Nada muda no seu Search Console",
                        "text": "O escopo é webmasters.readonly: ver, nunca alterar. Também o seu e-mail, para saber quem conectou."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão do Google para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 60,
                    "perDay": 2000,
                    "kinds": {
                        "inspection": {
                            "perDay": 500,
                            "label": "inspeções de URL"
                        }
                    }
                }
            }
        },
        {
            "id": "bing-webmaster",
            "title": "Bing Webmaster",
            "category": "data",
            "line": "Agents",
            "domain": "bing.com",
            "serverName": "click.myagents/bing-webmaster",
            "url": "https://bing-webmaster.mcp.myagents.click/mcp",
            "homepage": "https://bing-webmaster.mcp.myagents.click",
            "signIn": "Chave do Bing",
            "description": "Tráfego, consultas, links, rastreio, pesquisa de palavras-chave e envio de URLs no Bing",
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.2.0",
                "headline": "O seu site no Bing, lido por um agente.",
                "lede": "Cliques, impressões, consultas, rastreio, links e sitemaps do Bing, que também alimenta o Copilot e o DuckDuckGo. A pesquisa de palavras-chave, com a procura de temas que o site ainda não responde. E o envio de páginas novas para indexar, com a sua aprovação.",
                "summary": "Conector MCP do Agents para o Bing Webmaster Tools: o seu assistente de IA lê tráfego, consultas, rastreio, links e sitemaps do seu site no Bing, pesquisa a procura de qualquer termo e envia URLs e sitemaps para indexar.",
                "signIn": {
                    "kind": "key",
                    "label": "Chave do serviço",
                    "text": "Cole a chave de API do Bing Webmaster (Configurações → Acesso à API). Ela fica guardada cifrada."
                },
                "canWrite": true,
                "asks": [
                    "Quais páginas mais aparecem no Bing este mês?"
                ],
                "sample": {
                    "ask": "Quais páginas mais aparecem no Bing este mês?",
                    "tool": "page_stats",
                    "columns": [
                        "Página",
                        "Impressões",
                        "Cliques",
                        "Posição"
                    ],
                    "rows": [
                        [
                            "/blog/agenda-de-reunioes",
                            "1.204",
                            "86",
                            "4,1"
                        ],
                        [
                            "/precos",
                            "642",
                            "51",
                            "2,7"
                        ],
                        [
                            "/blog/modelo-de-proposta",
                            "388",
                            "19",
                            "6,3"
                        ],
                        [
                            "/",
                            "271",
                            "44",
                            "1,8"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm da sua conta no Bing Webmaster Tools."
                },
                "tools": [
                    {
                        "name": "list_sites",
                        "title": "Sites",
                        "text": "Os sites da conta e se cada um está verificado."
                    },
                    {
                        "name": "traffic_stats",
                        "title": "Tráfego",
                        "text": "Cliques e impressões por dia, com os totais do período."
                    },
                    {
                        "name": "query_stats",
                        "title": "Consultas",
                        "text": "As buscas que mostram o site, com cliques, impressões e posição."
                    },
                    {
                        "name": "page_stats",
                        "title": "Páginas",
                        "text": "As páginas que mais aparecem e as que mais recebem cliques."
                    },
                    {
                        "name": "crawl_stats",
                        "title": "Rastreio",
                        "text": "Páginas rastreadas, no índice, erros, bloqueios e problemas de rastreio."
                    },
                    {
                        "name": "list_sitemaps",
                        "title": "Sitemaps",
                        "text": "Os sitemaps enviados, quando foram lidos e o estado de cada um."
                    },
                    {
                        "name": "url_info",
                        "title": "Uma URL",
                        "text": "O que o Bing sabe de uma página: indexação, último rastreio e links."
                    },
                    {
                        "name": "keyword_volume",
                        "title": "Volume de um termo",
                        "text": "Quantas vezes um termo apareceu nas buscas do Bing, com ou sem o seu site."
                    },
                    {
                        "name": "keyword_trend",
                        "title": "Histórico de um termo",
                        "text": "A procura de um termo semana a semana: sobe, cai ou é sazonal."
                    },
                    {
                        "name": "related_keywords",
                        "title": "Termos relacionados",
                        "text": "Os termos vizinhos de um termo, com a procura de cada um."
                    },
                    {
                        "name": "query_pages",
                        "title": "Páginas de uma busca",
                        "text": "As páginas do site que aparecem para uma busca."
                    },
                    {
                        "name": "page_queries",
                        "title": "Buscas de uma página",
                        "text": "As buscas que mostram uma página do site."
                    },
                    {
                        "name": "inbound_links",
                        "title": "Links de fora",
                        "text": "As páginas que recebem links de outros sites, e de onde vêm."
                    },
                    {
                        "name": "submit_sitemap",
                        "title": "Enviar sitemap",
                        "text": "Envia um sitemap ao Bing. Pede aprovação."
                    },
                    {
                        "name": "submit_urls",
                        "title": "Enviar para indexar",
                        "text": "Envia páginas novas ou alteradas ao Bing, dentro da cota diária. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Só o necessário",
                        "text": "A chave de API do Bing Webmaster, cifrada, enquanto a conexão existir. Ela dá acesso aos sites da sua conta, e só a eles."
                    },
                    {
                        "title": "Envio só com aprovação",
                        "text": "Ler é livre. Enviar URLs para indexar se declara como ação, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": {
                    "perMinute": 30,
                    "perDay": 1000,
                    "kinds": {
                        "submission": {
                            "perDay": 100,
                            "label": "envios de URL"
                        }
                    }
                }
            }
        },
        {
            "id": "google-analytics",
            "title": "Google Analytics",
            "category": "data",
            "line": "Agents",
            "domain": "analytics.google.com",
            "serverName": "click.myagents/google-analytics",
            "url": "https://google-analytics.mcp.myagents.click/mcp",
            "homepage": "https://google-analytics.mcp.myagents.click",
            "signIn": "Google",
            "description": "Usuários, sessões, páginas e origens do tráfego do seu site",
            "isRecommended": true,
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "O seu Google Analytics, lido por um agente.",
                "lede": "Usuários, sessões, páginas, origens do tráfego e eventos-chave do seu site, direto na conversa com o seu assistente de IA. Você entra com o Google, e o acesso é só de leitura.",
                "summary": "Conector MCP do Agents para o Google Analytics 4: o seu assistente de IA lê usuários, sessões, páginas, origens do tráfego e conversões do seu site, com login do Google e só leitura.",
                "signIn": {
                    "kind": "google",
                    "label": "Login do Google",
                    "text": "Escolha a conta que tem acesso às suas propriedades do GA4 e autorize a leitura."
                },
                "canWrite": false,
                "asks": [
                    "De onde veio o tráfego nos últimos 28 dias?"
                ],
                "sample": {
                    "ask": "De onde veio o tráfego nos últimos 28 dias?",
                    "tool": "traffic_sources",
                    "columns": [
                        "Canal",
                        "Sessões",
                        "Variação",
                        "Eventos-chave"
                    ],
                    "rows": [
                        [
                            "Organic Search",
                            "8.412",
                            "+1.204",
                            "312"
                        ],
                        [
                            "Direct",
                            "3.977",
                            "+218",
                            "141"
                        ],
                        [
                            "Organic Social",
                            "2.105",
                            "+640",
                            "58"
                        ],
                        [
                            "Referral",
                            "904",
                            "+77",
                            "29"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm das suas propriedades do Google Analytics 4."
                },
                "tools": [
                    {
                        "name": "list_properties",
                        "title": "Propriedades",
                        "text": "As contas e propriedades do GA4 a que a sua conta tem acesso."
                    },
                    {
                        "name": "run_report",
                        "title": "Relatório livre",
                        "text": "Qualquer combinação de dimensões e métricas, com período, filtro e ordem."
                    },
                    {
                        "name": "compare_periods",
                        "title": "Comparação",
                        "text": "O período atual contra o anterior, com a variação de cada métrica."
                    },
                    {
                        "name": "top_pages",
                        "title": "Páginas",
                        "text": "As páginas mais vistas, com usuários, tempo de engajamento e eventos-chave."
                    },
                    {
                        "name": "traffic_sources",
                        "title": "Origens do tráfego",
                        "text": "Canais e origem/mídia, com sessões, engajamento e eventos-chave."
                    },
                    {
                        "name": "realtime",
                        "title": "Agora",
                        "text": "Quantas pessoas estão no site nos últimos 30 minutos, e onde."
                    },
                    {
                        "name": "list_metrics",
                        "title": "Dimensões e métricas",
                        "text": "Os nomes válidos na propriedade, incluindo os personalizados."
                    }
                ],
                "data": [
                    {
                        "title": "Nada muda no seu Analytics",
                        "text": "O escopo é analytics.readonly: ver relatórios e configurações, nunca alterar. Também o seu e-mail, para saber quem conectou."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão do Google para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 60,
                    "perDay": 2000
                }
            }
        },
        {
            "id": "youtube",
            "title": "YouTube",
            "category": "data",
            "line": "Agents",
            "domain": "youtube.com",
            "serverName": "click.myagents/youtube",
            "url": "https://youtube.mcp.myagents.click/mcp",
            "homepage": "https://youtube.mcp.myagents.click",
            "signIn": "Google",
            "description": "Desempenho do canal, vídeos e comentários",
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "O seu canal do YouTube, lido por um agente.",
                "lede": "Visualizações, tempo assistido, inscritos, os vídeos que crescem e o que as pessoas comentam, direto na conversa com o seu assistente de IA. Você entra com o Google e escolhe o canal.",
                "summary": "Conector MCP do Agents para o YouTube: o seu assistente de IA lê o desempenho do seu canal, dos seus vídeos e os comentários, com login do Google e só leitura.",
                "signIn": {
                    "kind": "google",
                    "label": "Login do Google",
                    "text": "Escolha a conta e o canal no Google e autorize a leitura do YouTube e do YouTube Analytics."
                },
                "canWrite": false,
                "asks": [
                    "Quais vídeos mais cresceram nos últimos 28 dias?"
                ],
                "sample": {
                    "ask": "Quais vídeos mais cresceram nos últimos 28 dias?",
                    "tool": "top_videos",
                    "columns": [
                        "Vídeo",
                        "Views",
                        "Inscritos",
                        "Retenção"
                    ],
                    "rows": [
                        [
                            "Como organizar a semana",
                            "18.240",
                            "+412",
                            "47%"
                        ],
                        [
                            "5 erros de quem começa",
                            "9.877",
                            "+188",
                            "52%"
                        ],
                        [
                            "Rotina de estudo real",
                            "6.105",
                            "+97",
                            "41%"
                        ],
                        [
                            "Respondendo vocês",
                            "2.930",
                            "+31",
                            "38%"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm do canal escolhido no login, com o atraso normal do YouTube Analytics."
                },
                "tools": [
                    {
                        "name": "list_channels",
                        "title": "Canal",
                        "text": "O canal conectado: inscritos, visualizações e quantos vídeos tem."
                    },
                    {
                        "name": "list_videos",
                        "title": "Vídeos",
                        "text": "Os vídeos mais recentes, com visualizações, curtidas, comentários e duração."
                    },
                    {
                        "name": "video_details",
                        "title": "Um vídeo",
                        "text": "Título, descrição, tags, números e estado de um vídeo."
                    },
                    {
                        "name": "channel_analytics",
                        "title": "Desempenho",
                        "text": "Visualizações, tempo assistido, retenção e inscritos por dia, país ou origem."
                    },
                    {
                        "name": "top_videos",
                        "title": "O que cresceu",
                        "text": "Os vídeos com mais visualizações e inscritos no período."
                    },
                    {
                        "name": "list_comments",
                        "title": "Comentários",
                        "text": "Os comentários mais recentes do canal ou de um vídeo, com as respostas."
                    },
                    {
                        "name": "search_videos",
                        "title": "Busca no canal",
                        "text": "Acha vídeos do seu canal por um assunto."
                    }
                ],
                "data": [
                    {
                        "title": "Nada muda no seu canal",
                        "text": "Os escopos são youtube.readonly e yt-analytics.readonly: ver, nunca publicar, editar ou responder. Também o seu e-mail, para saber quem conectou."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão do Google para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 30,
                    "perDay": 300,
                    "kinds": {
                        "search": {
                            "perDay": 10,
                            "label": "buscas"
                        }
                    }
                }
            }
        },
        {
            "id": "google-calendar",
            "title": "Google Agenda",
            "category": "productivity",
            "line": "Agents",
            "domain": "calendar.google.com",
            "serverName": "click.myagents/google-calendar",
            "url": "https://google-calendar.mcp.myagents.click/mcp",
            "homepage": "https://google-calendar.mcp.myagents.click",
            "signIn": "Google",
            "description": "Agenda, horários livres e marcação de compromissos",
            "isRecommended": true,
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "A sua agenda, nas mãos de um agente.",
                "lede": "O que você tem hoje e na semana, os horários livres para uma reunião e a marcação do compromisso, direto na conversa com o seu assistente de IA. Marcar e mudar sempre com a sua aprovação.",
                "summary": "Conector MCP do Agents para o Google Agenda: o seu assistente de IA lê a sua agenda, acha horários livres e marca, muda ou cancela compromissos com a sua aprovação.",
                "signIn": {
                    "kind": "google",
                    "label": "Login do Google",
                    "text": "Escolha a conta no Google e autorize a agenda: ler, achar horários livres e mexer em eventos."
                },
                "canWrite": true,
                "asks": [
                    "Onde cabe uma reunião de uma hora esta semana?"
                ],
                "sample": {
                    "ask": "Onde cabe uma reunião de uma hora esta semana?",
                    "tool": "find_free_time",
                    "columns": [
                        "Dia",
                        "Início",
                        "Fim",
                        "Livre"
                    ],
                    "rows": [
                        [
                            "terça, 22/10",
                            "10:00",
                            "12:00",
                            "2h"
                        ],
                        [
                            "quarta, 23/10",
                            "14:30",
                            "16:00",
                            "1h30"
                        ],
                        [
                            "quinta, 24/10",
                            "09:00",
                            "11:30",
                            "2h30"
                        ],
                        [
                            "sexta, 25/10",
                            "15:00",
                            "18:00",
                            "3h"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm das agendas da sua conta, no horário comercial de Brasília."
                },
                "tools": [
                    {
                        "name": "list_calendars",
                        "title": "Agendas",
                        "text": "As agendas da conta e o fuso de cada uma."
                    },
                    {
                        "name": "list_events",
                        "title": "Compromissos",
                        "text": "Os eventos de um período, com busca por texto."
                    },
                    {
                        "name": "get_event",
                        "title": "Um evento",
                        "text": "Horário, local, link da reunião, convidados e respostas."
                    },
                    {
                        "name": "find_free_time",
                        "title": "Horários livres",
                        "text": "Os intervalos livres em uma ou mais agendas, no horário comercial."
                    },
                    {
                        "name": "create_event",
                        "title": "Marcar",
                        "text": "Cria o evento, com convidados e link do Meet se quiser. Pede aprovação."
                    },
                    {
                        "name": "update_event",
                        "title": "Mudar",
                        "text": "Muda horário, título, local ou convidados. Pede aprovação."
                    },
                    {
                        "name": "delete_event",
                        "title": "Cancelar",
                        "text": "Apaga o evento, avisando os convidados se você quiser. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Só eventos e disponibilidade",
                        "text": "Os escopos são calendar.events, calendar.calendarlist.readonly e calendar.freebusy: os eventos, a lista de agendas e a disponibilidade. Nada das configurações da conta."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão do Google para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 60,
                    "perDay": 2000
                }
            }
        },
        {
            "id": "google-drive",
            "title": "Google Drive",
            "category": "productivity",
            "line": "Agents",
            "domain": "drive.google.com",
            "serverName": "click.myagents/google-drive",
            "url": "https://google-drive.mcp.myagents.click/mcp",
            "homepage": "https://google-drive.mcp.myagents.click",
            "signIn": "Google",
            "description": "Planilhas e documentos criados e atualizados pelo assistente",
            "isRecommended": true,
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "Relatórios no seu Drive, escritos por um agente.",
                "lede": "Planilhas e documentos do Google criados e atualizados pelo seu assistente de IA, no seu Drive, prontos para compartilhar. Ele só enxerga o que ele mesmo criou.",
                "summary": "Conector MCP do Agents para o Google Drive: o seu assistente de IA cria planilhas e documentos no seu Drive, escreve neles e lê o que criou, sem acesso ao resto dos seus arquivos.",
                "signIn": {
                    "kind": "google",
                    "label": "Login do Google",
                    "text": "Escolha a conta no Google e autorize o acesso aos arquivos que o conector criar. O resto do seu Drive fica de fora."
                },
                "canWrite": true,
                "asks": [
                    "Crie a planilha do relatório semanal e compartilhe com o time."
                ],
                "sample": {
                    "ask": "Crie a planilha do relatório semanal e compartilhe com o time.",
                    "tool": "create_spreadsheet",
                    "columns": [
                        "Semana",
                        "Sessões",
                        "Leads",
                        "Vendas"
                    ],
                    "rows": [
                        [
                            "30/09 a 06/10",
                            "3.412",
                            "88",
                            "12"
                        ],
                        [
                            "07/10 a 13/10",
                            "3.977",
                            "102",
                            "15"
                        ],
                        [
                            "14/10 a 20/10",
                            "4.205",
                            "117",
                            "19"
                        ],
                        [
                            "Variação",
                            "+6%",
                            "+15%",
                            "+27%"
                        ]
                    ],
                    "foot": "Dados ilustrativos. A planilha fica no seu Drive, com o link na resposta."
                },
                "tools": [
                    {
                        "name": "create_spreadsheet",
                        "title": "Nova planilha",
                        "text": "Cria uma planilha, já com as linhas que você der."
                    },
                    {
                        "name": "append_rows",
                        "title": "Acrescentar linhas",
                        "text": "Põe linhas no fim de uma aba, sem mexer no resto."
                    },
                    {
                        "name": "read_sheet",
                        "title": "Ler planilha",
                        "text": "Lê uma aba ou um intervalo de uma planilha criada aqui."
                    },
                    {
                        "name": "create_document",
                        "title": "Novo documento",
                        "text": "Cria um documento com títulos e parágrafos."
                    },
                    {
                        "name": "read_document",
                        "title": "Ler documento",
                        "text": "O texto de um documento criado aqui."
                    },
                    {
                        "name": "share_file",
                        "title": "Compartilhar",
                        "text": "Dá acesso a alguém por e-mail. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "O resto do seu Drive fica de fora",
                        "text": "O escopo é drive.file: o conector vê e edita só os arquivos que ele mesmo criou. Os seus outros arquivos não aparecem para ele."
                    },
                    {
                        "title": "O conteúdo fica no seu Drive",
                        "text": "Planilhas e documentos ficam na sua conta, sob o seu controle. Nada é copiado, vendido ou usado para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 60,
                    "perDay": 2000
                }
            }
        },
        {
            "id": "google-business-profile",
            "title": "Perfil da Empresa no Google",
            "category": "communication",
            "line": "Agents",
            "domain": "business.google.com",
            "serverName": "click.myagents/google-business-profile",
            "url": "https://google-business-profile.mcp.myagents.click/mcp",
            "homepage": "https://google-business-profile.mcp.myagents.click",
            "signIn": "Google",
            "description": "Avaliações, respostas e desempenho do seu negócio no Google e no Maps",
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "O seu negócio no Google, cuidado por um agente.",
                "lede": "Avaliações, respostas, buscas, ligações e rotas do seu Perfil da Empresa no Google e no Maps, direto na conversa com o seu assistente de IA. Responder sempre com a sua aprovação.",
                "summary": "Conector MCP do Agents para o Perfil da Empresa no Google: o seu assistente de IA lê as avaliações e o desempenho do seu negócio no Google e no Maps, e responde avaliações com a sua aprovação.",
                "signIn": {
                    "kind": "google",
                    "label": "Login do Google",
                    "text": "Escolha a conta que administra o perfil do negócio e autorize o acesso."
                },
                "canWrite": true,
                "asks": [
                    "Quais avaliações ainda não têm resposta?"
                ],
                "sample": {
                    "ask": "Quais avaliações ainda não têm resposta?",
                    "tool": "list_reviews",
                    "columns": [
                        "Cliente",
                        "Nota",
                        "Data",
                        "Resposta"
                    ],
                    "rows": [
                        [
                            "Mariana S.",
                            "5",
                            "19/10",
                            "não"
                        ],
                        [
                            "João P.",
                            "4",
                            "17/10",
                            "não"
                        ],
                        [
                            "Ana C.",
                            "2",
                            "15/10",
                            "não"
                        ],
                        [
                            "Pedro L.",
                            "5",
                            "12/10",
                            "sim"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm dos perfis que a sua conta administra."
                },
                "tools": [
                    {
                        "name": "list_locations",
                        "title": "Perfis",
                        "text": "Os negócios que a sua conta administra, com endereço, telefone e site."
                    },
                    {
                        "name": "list_reviews",
                        "title": "Avaliações",
                        "text": "As avaliações mais recentes, com nota, texto e se já têm resposta."
                    },
                    {
                        "name": "reply_review",
                        "title": "Responder",
                        "text": "Publica a resposta a uma avaliação. Pede aprovação."
                    },
                    {
                        "name": "delete_reply",
                        "title": "Apagar resposta",
                        "text": "Tira uma resposta publicada. Pede aprovação."
                    },
                    {
                        "name": "performance",
                        "title": "Desempenho",
                        "text": "Visualizações, buscas, ligações, rotas e cliques no site, por dia."
                    },
                    {
                        "name": "search_keywords",
                        "title": "Como acham você",
                        "text": "As buscas que mostraram o perfil no mês."
                    }
                ],
                "data": [
                    {
                        "title": "Só os perfis que você administra",
                        "text": "O escopo é business.manage: os perfis de empresa a que a sua conta tem acesso. O conector usa só avaliações, respostas e desempenho."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão do Google para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 30,
                    "perDay": 1000
                }
            }
        },
        {
            "id": "app-store-connect",
            "title": "App Store Connect",
            "category": "code",
            "line": "Agents",
            "domain": "appstoreconnect.apple.com",
            "serverName": "click.myagents/app-store-connect",
            "url": "https://app-store-connect.mcp.myagents.click/mcp",
            "homepage": "https://app-store-connect.mcp.myagents.click",
            "signIn": "Chave da Apple",
            "description": "Revisão, versões, builds e avaliações dos seus apps",
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "Os seus apps na App Store, acompanhados por um agente.",
                "lede": "O estado da revisão da Apple, as versões, os builds do TestFlight e o que as pessoas escrevem nas avaliações, direto na conversa com o seu assistente de IA. Responder sempre com a sua aprovação.",
                "summary": "Conector MCP do Agents para o App Store Connect: o seu assistente de IA acompanha a revisão da Apple, as versões, os builds e as avaliações dos seus apps, e responde avaliações com a sua aprovação.",
                "signIn": {
                    "kind": "key",
                    "label": "Chave do serviço",
                    "text": "Cole o Issuer ID, o Key ID e a chave .p8 de uma chave de API do App Store Connect. Ela fica guardada cifrada."
                },
                "canWrite": true,
                "asks": [
                    "Como está a revisão da versão nova?"
                ],
                "sample": {
                    "ask": "Como está a revisão da versão nova?",
                    "tool": "app_versions",
                    "columns": [
                        "Versão",
                        "Plataforma",
                        "Estado",
                        "Desde"
                    ],
                    "rows": [
                        [
                            "1.2.0",
                            "iOS",
                            "Em revisão",
                            "20/10"
                        ],
                        [
                            "1.1.3",
                            "iOS",
                            "Pronto para venda",
                            "02/10"
                        ],
                        [
                            "1.1.2",
                            "iOS",
                            "Substituída",
                            "18/09"
                        ],
                        [
                            "1.0.0",
                            "macOS",
                            "Pronto para venda",
                            "30/08"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm da equipe da chave de API."
                },
                "tools": [
                    {
                        "name": "list_apps",
                        "title": "Apps",
                        "text": "Os apps da equipe, com bundle id e plataformas."
                    },
                    {
                        "name": "app_versions",
                        "title": "Versões",
                        "text": "As versões de cada plataforma e o estado na revisão da Apple."
                    },
                    {
                        "name": "list_builds",
                        "title": "Builds",
                        "text": "Os builds enviados, o processamento e se expiraram no TestFlight."
                    },
                    {
                        "name": "list_reviews",
                        "title": "Avaliações",
                        "text": "As avaliações mais recentes, com nota, país e se já têm resposta."
                    },
                    {
                        "name": "reply_review",
                        "title": "Responder",
                        "text": "Publica a resposta a uma avaliação. Pede aprovação."
                    },
                    {
                        "name": "review_submissions",
                        "title": "Envios para revisão",
                        "text": "O que foi mandado para a Apple revisar e o resultado."
                    }
                ],
                "data": [
                    {
                        "title": "O que a chave alcança",
                        "text": "O conector usa a chave de API que você cria no App Store Connect. Prefira uma chave com o papel App Manager ou Customer Support: ela basta para versões, builds e avaliações."
                    },
                    {
                        "title": "Responder só com aprovação",
                        "text": "Ler é livre. Responder uma avaliação se declara como ação, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": {
                    "perMinute": 30,
                    "perDay": 2000
                }
            }
        },
        {
            "id": "google-play",
            "title": "Google Play Console",
            "category": "code",
            "line": "Agents",
            "domain": "play.google.com",
            "serverName": "click.myagents/google-play",
            "url": "https://google-play.mcp.myagents.click/mcp",
            "homepage": "https://google-play.mcp.myagents.click",
            "signIn": "Conta de serviço",
            "description": "Lançamentos, avaliações e estabilidade dos seus apps Android",
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "Os seus apps no Google Play, acompanhados por um agente.",
                "lede": "Lançamentos por faixa, avaliações e a taxa de falhas e travamentos dos seus apps Android, direto na conversa com o seu assistente de IA. Responder sempre com a sua aprovação.",
                "summary": "Conector MCP do Agents para o Google Play Console: o seu assistente de IA acompanha os lançamentos, as avaliações e a estabilidade dos seus apps Android, e responde avaliações com a sua aprovação.",
                "signIn": {
                    "kind": "key",
                    "label": "Chave do serviço",
                    "text": "Cole o JSON de uma conta de serviço convidada no Play Console. Ele fica guardado cifrado."
                },
                "canWrite": true,
                "asks": [
                    "O que está publicado em cada faixa?"
                ],
                "sample": {
                    "ask": "O que está publicado em cada faixa?",
                    "tool": "release_status",
                    "columns": [
                        "Faixa",
                        "Versão",
                        "Estado",
                        "Alcance"
                    ],
                    "rows": [
                        [
                            "Produção",
                            "1.4.2 (42)",
                            "Concluído",
                            "100%"
                        ],
                        [
                            "Produção",
                            "1.5.0 (45)",
                            "Em andamento",
                            "20%"
                        ],
                        [
                            "Beta",
                            "1.5.1 (46)",
                            "Concluído",
                            "100%"
                        ],
                        [
                            "Teste interno",
                            "1.6.0 (48)",
                            "Concluído",
                            "100%"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm dos apps a que a conta de serviço tem acesso."
                },
                "tools": [
                    {
                        "name": "list_apps",
                        "title": "Apps",
                        "text": "Os apps Android a que a conta de serviço tem acesso."
                    },
                    {
                        "name": "release_status",
                        "title": "Lançamentos",
                        "text": "O que está em produção, beta, alfa e teste interno, com o alcance de cada um."
                    },
                    {
                        "name": "list_reviews",
                        "title": "Avaliações",
                        "text": "As avaliações com texto da última semana, com nota, aparelho e versão."
                    },
                    {
                        "name": "reply_review",
                        "title": "Responder",
                        "text": "Publica a resposta a uma avaliação. Pede aprovação."
                    },
                    {
                        "name": "vitals",
                        "title": "Estabilidade",
                        "text": "Taxa de falhas e de travamentos por dia, do Android vitals."
                    }
                ],
                "data": [
                    {
                        "title": "O que a conta alcança",
                        "text": "O conector usa a conta de serviço que você convida no Play Console. Dê a ela só as permissões de ver apps, ver dados de qualidade e responder avaliações."
                    },
                    {
                        "title": "Responder só com aprovação",
                        "text": "Ler é livre. Responder uma avaliação se declara como ação, e o seu assistente pede a sua aprovação antes. O conector não publica versões."
                    }
                ],
                "limits": {
                    "perMinute": 30,
                    "perDay": 1500
                }
            }
        },
        {
            "id": "pagespeed",
            "title": "PageSpeed Insights",
            "category": "data",
            "line": "Agents",
            "domain": "pagespeed.web.dev",
            "serverName": "click.myagents/pagespeed",
            "url": "https://pagespeed.mcp.myagents.click/mcp",
            "homepage": "https://pagespeed.mcp.myagents.click",
            "signIn": "Sem login",
            "description": "Notas do Lighthouse, Core Web Vitals e o que corrigir em qualquer página",
            "isRecommended": true,
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "A velocidade do seu site, medida por um agente.",
                "lede": "As notas do Lighthouse, as Core Web Vitals de quem visita de verdade e a lista do que corrigir, com a economia de cada item. Para qualquer página pública, sem conta e sem chave.",
                "summary": "Conector MCP do Agents para o PageSpeed Insights e o Chrome UX Report: o seu assistente de IA mede a velocidade de qualquer página, com as notas do Lighthouse, as Core Web Vitals de usuários reais e o que corrigir primeiro.",
                "signIn": {
                    "kind": "open",
                    "label": "Sem login",
                    "text": "Não há conta para entrar: o PageSpeed é público. A página de conexão só pede a sua autorização."
                },
                "canWrite": false,
                "asks": [
                    "O que mais atrasa a minha página inicial no celular?"
                ],
                "sample": {
                    "ask": "O que mais atrasa a minha página inicial no celular?",
                    "tool": "analyze_page",
                    "columns": [
                        "Sugestão",
                        "Economia",
                        "Métrica"
                    ],
                    "rows": [
                        [
                            "Melhorar a entrega das imagens",
                            "650 KiB",
                            "LCP −2,5 s"
                        ],
                        [
                            "Reduzir o JavaScript não usado",
                            "94 KiB",
                            "LCP −0,5 s"
                        ],
                        [
                            "Reduzir o CSS não usado",
                            "29 KiB",
                            "FCP −0,3 s"
                        ],
                        [
                            "Solicitações que bloqueiam a renderização",
                            "180 ms",
                            "FCP −0,2 s"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm de uma medição do Lighthouse feita na hora, nos computadores do Google."
                },
                "tools": [
                    {
                        "name": "analyze_page",
                        "title": "Medir uma página",
                        "text": "As notas de desempenho, acessibilidade, boas práticas e SEO, as métricas e as sugestões com a economia de cada uma."
                    },
                    {
                        "name": "analyze_pages",
                        "title": "Medir várias",
                        "text": "Até cinco páginas de uma vez, lado a lado, para achar a mais lenta."
                    },
                    {
                        "name": "field_data",
                        "title": "Usuários reais",
                        "text": "LCP, INP, CLS, FCP e TTFB medidos pelo Chrome de quem visitou nos últimos 28 dias."
                    },
                    {
                        "name": "field_history",
                        "title": "Evolução",
                        "text": "As Core Web Vitals semana a semana, nos últimos seis meses."
                    }
                ],
                "data": [
                    {
                        "title": "Só páginas públicas",
                        "text": "O Google mede o que qualquer pessoa vê na internet. Não há login, chave nem acesso a nada seu."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão do Google para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 20,
                    "perDay": 400,
                    "kinds": {
                        "analysis": {
                            "perDay": 100,
                            "label": "medições do Lighthouse"
                        }
                    }
                }
            }
        },
        {
            "id": "indexnow",
            "title": "IndexNow",
            "category": "data",
            "line": "Agents",
            "domain": "indexnow.org",
            "serverName": "click.myagents/indexnow",
            "url": "https://indexnow.mcp.myagents.click/mcp",
            "homepage": "https://indexnow.mcp.myagents.click",
            "signIn": "Chave do IndexNow",
            "description": "Avisa o Bing, o Yandex e outros buscadores das páginas novas ou alteradas",
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "Publicou? Os buscadores ficam sabendo na hora.",
                "lede": "Um aviso só chega ao Bing, ao Yandex, ao Naver, ao Seznam e ao Yep. O agente lê o seu sitemap, separa o que mudou desde a última publicação e envia, com a sua aprovação.",
                "summary": "Conector MCP do Agents para o IndexNow: o seu assistente de IA avisa o Bing, o Yandex e os outros buscadores do protocolo, num pedido só, que as páginas do seu site são novas ou mudaram.",
                "signIn": {
                    "kind": "key",
                    "label": "Chave do serviço",
                    "text": "Cole a sua chave do IndexNow. Ela também fica no seu site, num arquivo de texto, que é como os buscadores conferem que o site é seu."
                },
                "canWrite": true,
                "asks": [
                    "Avise os buscadores do que mudou no meu site desde segunda."
                ],
                "sample": {
                    "ask": "Avise os buscadores do que mudou no meu site desde segunda.",
                    "tool": "submit_sitemap",
                    "columns": [
                        "Site",
                        "Páginas",
                        "Resposta"
                    ],
                    "rows": [
                        [
                            "www.exemplo.com",
                            "14",
                            "200, recebido"
                        ],
                        [
                            "blog.exemplo.com",
                            "6",
                            "202, chave em conferência"
                        ]
                    ],
                    "foot": "Dados ilustrativos. As páginas vêm do lastmod do seu sitemap, e a resposta vem do próprio IndexNow."
                },
                "tools": [
                    {
                        "name": "check_key",
                        "title": "Conferir a chave",
                        "text": "Se o arquivo da chave está no site, onde os buscadores procuram."
                    },
                    {
                        "name": "sitemap_urls",
                        "title": "Ler um sitemap",
                        "text": "Quantas páginas o sitemap tem e quais mudaram a partir de uma data."
                    },
                    {
                        "name": "submit_urls",
                        "title": "Avisar os buscadores",
                        "text": "Envia páginas novas, alteradas ou apagadas a todos os buscadores do IndexNow. Pede aprovação."
                    },
                    {
                        "name": "submit_sitemap",
                        "title": "Enviar um sitemap",
                        "text": "Envia o sitemap inteiro, ou só o que mudou desde uma data. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Só o necessário",
                        "text": "A chave do IndexNow, cifrada, enquanto a conexão existir. Ela só serve para avisar os buscadores; não lê nada da sua conta em lugar nenhum."
                    },
                    {
                        "title": "Envio só com aprovação",
                        "text": "Ler o sitemap e conferir a chave é livre. Avisar os buscadores se declara como ação, e o seu assistente pede a sua aprovação antes."
                    }
                ],
                "limits": {
                    "perMinute": 20,
                    "perDay": 500,
                    "kinds": {
                        "submission": {
                            "perDay": 50,
                            "label": "envios ao IndexNow"
                        }
                    }
                }
            }
        },
        {
            "id": "google-ads",
            "title": "Google Ads",
            "category": "ads",
            "line": "Agents",
            "domain": "ads.google.com",
            "serverName": "click.myagents/google-ads",
            "url": "https://google-ads.mcp.myagents.click/mcp",
            "homepage": "https://google-ads.mcp.myagents.click",
            "signIn": "Google",
            "description": "Gasto, campanhas, palavras-chave e termos de pesquisa; pausar e ajustar com aprovação",
            "isRecommended": true,
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "O seu Google Ads, lido por um agente.",
                "lede": "Gasto, cliques, conversões, campanhas, palavras-chave e termos de pesquisa, direto na conversa com o seu assistente de IA. Relatórios são só leitura; pausar, mudar orçamento ou negativar uma palavra pede a sua aprovação, e nada novo gasta sem você dizer.",
                "summary": "Conector MCP do Agents para o Google Ads: o seu assistente de IA lê gasto, cliques, conversões, campanhas, palavras-chave e termos de pesquisa, e pausa ou ajusta campanhas só com a sua aprovação.",
                "signIn": {
                    "kind": "google",
                    "label": "Login do Google",
                    "text": "Escolha a conta Google que acessa as suas contas de anúncios e autorize o Google Ads."
                },
                "canWrite": true,
                "asks": [
                    "Quais campanhas gastaram mais nos últimos 7 dias e o que converteram?"
                ],
                "sample": {
                    "ask": "Quais campanhas gastaram mais nos últimos 7 dias e o que converteram?",
                    "tool": "campaign_performance",
                    "columns": [
                        "Campanha",
                        "Gasto",
                        "Cliques",
                        "Conversões"
                    ],
                    "rows": [
                        [
                            "Pesquisa · Marca",
                            "R$ 1.284,20",
                            "2.310",
                            "96"
                        ],
                        [
                            "Pesquisa · Agenda",
                            "R$ 862,50",
                            "1.104",
                            "41"
                        ],
                        [
                            "Performance Max",
                            "R$ 640,00",
                            "2.980",
                            "28"
                        ],
                        [
                            "Display · Remarketing",
                            "R$ 212,90",
                            "1.512",
                            "9"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm das suas contas no Google Ads, com o atraso normal de algumas horas."
                },
                "tools": [
                    {
                        "name": "list_accounts",
                        "title": "Contas",
                        "text": "As contas de anúncios que a sua conta Google alcança, com moeda, fuso e se é conta de gerente."
                    },
                    {
                        "name": "account_performance",
                        "title": "Desempenho da conta",
                        "text": "Gasto, impressões, cliques, CTR, CPC médio e conversões por dia, com os totais do período."
                    },
                    {
                        "name": "campaign_performance",
                        "title": "Campanhas",
                        "text": "Cada campanha com estado, tipo, orçamento diário, gasto, cliques e conversões no período."
                    },
                    {
                        "name": "search_terms",
                        "title": "Termos de pesquisa",
                        "text": "O que as pessoas digitaram para ver o anúncio, com gasto, cliques e conversões: o que negativar."
                    },
                    {
                        "name": "keywords",
                        "title": "Palavras-chave",
                        "text": "As palavras-chave de cada campanha, com tipo de correspondência, índice de qualidade e resultados."
                    },
                    {
                        "name": "change_history",
                        "title": "Histórico de alterações",
                        "text": "Quem mudou o quê nos últimos dias, campo a campo."
                    },
                    {
                        "name": "gaql_query",
                        "title": "Consulta GAQL",
                        "text": "Qualquer consulta de leitura na linguagem do Google Ads, para o que as outras ferramentas não cobrem."
                    },
                    {
                        "name": "set_campaign_status",
                        "title": "Pausar ou ativar",
                        "text": "Pausa ou reativa uma campanha. Pede aprovação."
                    },
                    {
                        "name": "set_campaign_budget",
                        "title": "Orçamento",
                        "text": "Muda o orçamento diário de uma campanha. Pede aprovação."
                    },
                    {
                        "name": "add_negative_keywords",
                        "title": "Negativar",
                        "text": "Adiciona palavras-chave negativas a uma campanha. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Nada gasta sem você",
                        "text": "Ler é livre. Pausar, mudar orçamento e negativar palavras se declaram como ações, e o seu assistente pede a sua aprovação antes de cada uma. O conector não cria campanhas."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão do Google para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 60,
                    "perDay": 1500,
                    "kinds": {
                        "mutation": {
                            "perDay": 100,
                            "label": "alterações"
                        }
                    }
                }
            }
        },
        {
            "id": "meta-ads",
            "title": "Meta Ads",
            "category": "ads",
            "line": "Agents",
            "domain": "facebook.com",
            "serverName": "click.myagents/meta-ads",
            "url": "https://meta-ads.mcp.myagents.click/mcp",
            "homepage": "https://meta-ads.mcp.myagents.click",
            "signIn": "Meta",
            "description": "Gasto, campanhas, conjuntos e anúncios do Facebook e do Instagram; pausar e ajustar com aprovação",
            "isRecommended": true,
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "O seu Meta Ads, lido por um agente.",
                "lede": "Gasto, alcance, cliques, conversões, campanhas, conjuntos de anúncios e anúncios do Facebook e do Instagram, direto na conversa com o seu assistente de IA. Relatórios são só leitura; pausar ou mudar orçamento pede a sua aprovação, e nada novo gasta sem você dizer.",
                "summary": "Conector MCP do Agents para o Meta Ads: o seu assistente de IA lê gasto, alcance, cliques, conversões, campanhas, conjuntos e anúncios do Facebook e do Instagram, e pausa ou ajusta campanhas só com a sua aprovação.",
                "signIn": {
                    "kind": "oauth",
                    "label": "Login da Meta",
                    "text": "Entre com a conta do Facebook que administra as suas contas de anúncios e autorize o acesso ao Meta Ads."
                },
                "canWrite": true,
                "asks": [
                    "Quais campanhas gastaram mais nos últimos 7 dias e quantos leads trouxeram?"
                ],
                "sample": {
                    "ask": "Quais campanhas gastaram mais nos últimos 7 dias e quantos leads trouxeram?",
                    "tool": "campaign_performance",
                    "columns": [
                        "Campanha",
                        "Gasto",
                        "Cliques",
                        "Leads"
                    ],
                    "rows": [
                        [
                            "Leads · Mentoria",
                            "R$ 1.120,40",
                            "1.840",
                            "73"
                        ],
                        [
                            "Remarketing · Site",
                            "R$ 486,00",
                            "1.102",
                            "31"
                        ],
                        [
                            "Alcance · Lançamento",
                            "R$ 372,10",
                            "2.215",
                            "12"
                        ],
                        [
                            "Engajamento · Reels",
                            "R$ 158,70",
                            "960",
                            "4"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm das suas contas no Meta Ads, com o atraso normal de algumas horas."
                },
                "tools": [
                    {
                        "name": "list_accounts",
                        "title": "Contas",
                        "text": "As contas de anúncios que o seu login alcança, com moeda, fuso, estado e gasto acumulado."
                    },
                    {
                        "name": "account_performance",
                        "title": "Desempenho da conta",
                        "text": "Gasto, impressões, alcance, cliques, CTR, CPC, CPM e conversões por dia, com os totais do período."
                    },
                    {
                        "name": "campaign_performance",
                        "title": "Campanhas",
                        "text": "Cada campanha com objetivo, estado, orçamento, gasto, cliques e conversões no período."
                    },
                    {
                        "name": "adset_performance",
                        "title": "Conjuntos de anúncios",
                        "text": "Os conjuntos de uma conta ou de uma campanha, com gasto, alcance e resultados."
                    },
                    {
                        "name": "ad_performance",
                        "title": "Anúncios",
                        "text": "Cada anúncio com gasto, impressões, cliques e conversões: o criativo que rende e o que não."
                    },
                    {
                        "name": "audience_breakdown",
                        "title": "Públicos",
                        "text": "O desempenho por idade e gênero, por plataforma (Facebook, Instagram) ou por país."
                    },
                    {
                        "name": "set_campaign_status",
                        "title": "Pausar ou ativar campanha",
                        "text": "Pausa ou reativa uma campanha. Pede aprovação."
                    },
                    {
                        "name": "set_adset_status",
                        "title": "Pausar ou ativar conjunto",
                        "text": "Pausa ou reativa um conjunto de anúncios. Pede aprovação."
                    },
                    {
                        "name": "set_campaign_budget",
                        "title": "Orçamento",
                        "text": "Muda o orçamento diário de uma campanha. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Nada gasta sem você",
                        "text": "Ler é livre. Pausar, ativar e mudar orçamento se declaram como ações, e o seu assistente pede a sua aprovação antes de cada uma. O conector não cria campanhas nem anúncios."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão da Meta para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 60,
                    "perDay": 1500,
                    "kinds": {
                        "mutation": {
                            "perDay": 100,
                            "label": "alterações"
                        }
                    }
                }
            }
        },
        {
            "id": "microsoft-ads",
            "title": "Microsoft Ads",
            "category": "ads",
            "line": "Agents",
            "domain": "ads.microsoft.com",
            "serverName": "click.myagents/microsoft-ads",
            "url": "https://microsoft-ads.mcp.myagents.click/mcp",
            "homepage": "https://microsoft-ads.mcp.myagents.click",
            "signIn": "Microsoft",
            "description": "Gasto, campanhas, palavras-chave e termos de pesquisa no Bing; pausar e ajustar com aprovação",
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "O seu Microsoft Ads, lido por um agente.",
                "lede": "Gasto, cliques, conversões, campanhas, palavras-chave e termos de pesquisa do Bing, do Copilot e dos parceiros da Microsoft, direto na conversa com o seu assistente de IA. Relatórios são só leitura; pausar, mudar orçamento ou negativar uma palavra pede a sua aprovação, e nada novo gasta sem você dizer.",
                "summary": "Conector MCP do Agents para o Microsoft Advertising (Bing Ads): o seu assistente de IA lê gasto, cliques, conversões, campanhas, palavras-chave e termos de pesquisa, e pausa ou ajusta campanhas só com a sua aprovação.",
                "signIn": {
                    "kind": "oauth",
                    "label": "Login da Microsoft",
                    "text": "Escolha a conta Microsoft que acessa as suas contas de anúncios e autorize o Microsoft Advertising."
                },
                "canWrite": true,
                "asks": [
                    "Quais campanhas gastaram mais nos últimos 7 dias e o que converteram?"
                ],
                "sample": {
                    "ask": "Quais campanhas gastaram mais nos últimos 7 dias e o que converteram?",
                    "tool": "campaign_performance",
                    "columns": [
                        "Campanha",
                        "Gasto",
                        "Cliques",
                        "Conversões"
                    ],
                    "rows": [
                        [
                            "Pesquisa · Marca",
                            "R$ 412,80",
                            "960",
                            "38"
                        ],
                        [
                            "Pesquisa · Agenda",
                            "R$ 286,40",
                            "541",
                            "17"
                        ],
                        [
                            "Audience · Remarketing",
                            "R$ 98,10",
                            "812",
                            "6"
                        ],
                        [
                            "Shopping",
                            "R$ 64,30",
                            "203",
                            "4"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm das suas contas no Microsoft Advertising, com o atraso normal de algumas horas."
                },
                "tools": [
                    {
                        "name": "list_accounts",
                        "title": "Contas",
                        "text": "As contas de anúncios que a sua conta Microsoft alcança, com número, moeda, fuso e estado."
                    },
                    {
                        "name": "campaigns",
                        "title": "Campanhas",
                        "text": "Cada campanha da conta com estado, tipo e orçamento diário."
                    },
                    {
                        "name": "account_performance",
                        "title": "Desempenho da conta",
                        "text": "Gasto, impressões, cliques, CTR, CPC médio e conversões por dia, com os totais do período."
                    },
                    {
                        "name": "campaign_performance",
                        "title": "Desempenho por campanha",
                        "text": "Cada campanha com gasto, impressões, cliques, CTR, CPC médio, conversões e receita no período."
                    },
                    {
                        "name": "search_terms",
                        "title": "Termos de pesquisa",
                        "text": "O que as pessoas digitaram para ver o anúncio, com gasto, cliques e conversões: o que negativar."
                    },
                    {
                        "name": "keywords",
                        "title": "Palavras-chave",
                        "text": "As palavras-chave de cada campanha, com tipo de correspondência, índice de qualidade e resultados."
                    },
                    {
                        "name": "set_campaign_status",
                        "title": "Pausar ou ativar",
                        "text": "Pausa ou reativa uma campanha. Pede aprovação."
                    },
                    {
                        "name": "set_campaign_budget",
                        "title": "Orçamento",
                        "text": "Muda o orçamento diário de uma campanha. Pede aprovação."
                    },
                    {
                        "name": "add_negative_keywords",
                        "title": "Negativar",
                        "text": "Adiciona palavras-chave negativas a uma campanha. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Nada gasta sem você",
                        "text": "Ler é livre. Pausar, mudar orçamento e negativar palavras se declaram como ações, e o seu assistente pede a sua aprovação antes de cada uma. O conector não cria campanhas."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão da Microsoft para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 30,
                    "perDay": 800,
                    "kinds": {
                        "mutation": {
                            "perDay": 100,
                            "label": "alterações"
                        },
                        "report": {
                            "perDay": 300,
                            "label": "relatórios"
                        }
                    }
                }
            }
        },
        {
            "id": "tiktok-ads",
            "title": "TikTok Ads",
            "category": "ads",
            "line": "Agents",
            "domain": "ads.tiktok.com",
            "serverName": "click.myagents/tiktok-ads",
            "url": "https://tiktok-ads.mcp.myagents.click/mcp",
            "homepage": "https://tiktok-ads.mcp.myagents.click",
            "signIn": "TikTok",
            "description": "Gasto, campanhas, grupos e anúncios do TikTok; pausar e ajustar com aprovação",
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.1.0",
                "headline": "O seu TikTok Ads, lido por um agente.",
                "lede": "Gasto, alcance, cliques, conversões, campanhas, grupos de anúncios e público, direto na conversa com o seu assistente de IA. Relatórios são só leitura; pausar ou mudar um orçamento pede a sua aprovação, e nada novo gasta sem você dizer.",
                "summary": "Conector MCP do Agents para o TikTok Ads: o seu assistente de IA lê gasto, impressões, cliques, conversões, campanhas, grupos de anúncios e público, e pausa ou ajusta campanhas só com a sua aprovação.",
                "signIn": {
                    "kind": "oauth",
                    "label": "Login do TikTok",
                    "text": "Entre com a conta do TikTok for Business que acessa as suas contas de anúncios e autorize o acesso."
                },
                "canWrite": true,
                "asks": [
                    "Quais campanhas gastaram mais nos últimos 7 dias e o que converteram?"
                ],
                "sample": {
                    "ask": "Quais campanhas gastaram mais nos últimos 7 dias e o que converteram?",
                    "tool": "campaign_performance",
                    "columns": [
                        "Campanha",
                        "Gasto",
                        "Cliques",
                        "Conversões"
                    ],
                    "rows": [
                        [
                            "Lançamento · Vídeo 1",
                            "R$ 964,10",
                            "4.120",
                            "58"
                        ],
                        [
                            "Remarketing · Carrinho",
                            "R$ 512,00",
                            "1.870",
                            "44"
                        ],
                        [
                            "Spark Ads · Criador",
                            "R$ 380,40",
                            "2.205",
                            "21"
                        ],
                        [
                            "Tráfego · Blog",
                            "R$ 140,70",
                            "1.012",
                            "6"
                        ]
                    ],
                    "foot": "Dados ilustrativos. Os seus vêm das suas contas no TikTok Ads, com o atraso normal de algumas horas."
                },
                "tools": [
                    {
                        "name": "list_accounts",
                        "title": "Contas",
                        "text": "As contas de anúncios que a sua conta alcança, com moeda, fuso, estado e saldo."
                    },
                    {
                        "name": "account_performance",
                        "title": "Desempenho da conta",
                        "text": "Gasto, impressões, cliques, CTR, CPC, CPM, alcance e conversões por dia, com os totais do período."
                    },
                    {
                        "name": "campaign_performance",
                        "title": "Campanhas",
                        "text": "Cada campanha com estado, objetivo, orçamento, gasto, cliques e conversões no período."
                    },
                    {
                        "name": "adgroup_performance",
                        "title": "Grupos de anúncios",
                        "text": "Os grupos de anúncios, de toda a conta ou de uma campanha, com os mesmos números."
                    },
                    {
                        "name": "ad_performance",
                        "title": "Anúncios",
                        "text": "Cada anúncio com gasto, cliques e conversões: qual criativo rende."
                    },
                    {
                        "name": "audience_breakdown",
                        "title": "Público",
                        "text": "Os resultados por idade, gênero ou país."
                    },
                    {
                        "name": "set_campaign_status",
                        "title": "Pausar ou ativar",
                        "text": "Pausa ou reativa uma campanha. Pede aprovação."
                    },
                    {
                        "name": "set_adgroup_status",
                        "title": "Pausar ou ativar grupo",
                        "text": "Pausa ou reativa um grupo de anúncios. Pede aprovação."
                    },
                    {
                        "name": "set_campaign_budget",
                        "title": "Orçamento",
                        "text": "Muda o orçamento de uma campanha. Pede aprovação."
                    }
                ],
                "data": [
                    {
                        "title": "Nada gasta sem você",
                        "text": "Ler é livre. Pausar, ativar e mudar orçamento se declaram como ações, e o seu assistente pede a sua aprovação antes de cada uma. O conector não cria campanhas."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão do TikTok para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 60,
                    "perDay": 1500,
                    "kinds": {
                        "mutation": {
                            "perDay": 100,
                            "label": "alterações"
                        }
                    }
                }
            }
        },
        {
            "id": "brazil-lookup",
            "title": "CNPJ e CEP",
            "category": "data",
            "line": "Agents",
            "domain": "gov.br",
            "serverName": "click.myagents/brazil-lookup",
            "url": "https://brazil-lookup.mcp.myagents.click/mcp",
            "homepage": "https://brazil-lookup.mcp.myagents.click",
            "signIn": "Sem login",
            "description": "Empresa pelo CNPJ, CEP, feriados, DDD, bancos, NCM, Selic, CDI e IPCA, e conferência de CPF e CNPJ",
            "isRecommended": true,
            "icon": "https://mcp.myagents.click/icons/bolt.svg?v=6905fdd6",
            "details": {
                "version": "0.2.0",
                "headline": "O cadastro de qualquer empresa, na conversa.",
                "lede": "Razão social, situação na Receita, atividade, endereço e sócios pelo CNPJ, inclusive o CNPJ com letras. O endereço pelo CEP, os feriados do ano, as cidades de um DDD, o banco de um código, a NCM de um produto e a Selic de hoje. Dados públicos, sem conta e sem chave.",
                "summary": "Conector MCP do Agents para os cadastros públicos do Brasil: o seu assistente de IA consulta uma empresa pelo CNPJ, um endereço pelo CEP, os feriados nacionais, o DDD, os bancos, a tabela NCM e a Selic, o CDI e o IPCA, e confere CPF e CNPJ.",
                "signIn": {
                    "kind": "open",
                    "label": "Sem login",
                    "text": "Não há conta para entrar: os dados são públicos. A página de conexão só pede a sua autorização."
                },
                "canWrite": false,
                "asks": [
                    "Essa empresa está ativa? 19.131.243/0001-97"
                ],
                "sample": {
                    "ask": "Essa empresa está ativa? 19.131.243/0001-97",
                    "tool": "lookup_company",
                    "columns": [
                        "Campo",
                        "Cadastro"
                    ],
                    "rows": [
                        [
                            "Razão social",
                            "Open Knowledge Brasil"
                        ],
                        [
                            "Situação",
                            "Ativa, desde 03/10/2013"
                        ],
                        [
                            "Atividade",
                            "94.30-8-00 Defesa de direitos sociais"
                        ],
                        [
                            "Cidade",
                            "São Paulo, SP"
                        ]
                    ],
                    "foot": "Exemplo com um cadastro público real. Os dados abertos da Receita costumam ter algumas semanas de atraso."
                },
                "tools": [
                    {
                        "name": "lookup_company",
                        "title": "Empresa pelo CNPJ",
                        "text": "Razão social, situação, abertura, porte, Simples e MEI, atividades, endereço, contato e sócios."
                    },
                    {
                        "name": "lookup_postal_code",
                        "title": "Endereço pelo CEP",
                        "text": "Rua, bairro, cidade, estado e o código IBGE."
                    },
                    {
                        "name": "list_holidays",
                        "title": "Feriados nacionais",
                        "text": "Os feriados do ano, inclusive os móveis, com o dia da semana."
                    },
                    {
                        "name": "validate_document",
                        "title": "Conferir CPF ou CNPJ",
                        "text": "Se o número pode existir, pelos dígitos verificadores, sem consultar ninguém."
                    },
                    {
                        "name": "lookup_area_code",
                        "title": "Estado e cidades do DDD",
                        "text": "O estado e as cidades atendidas por um código de área."
                    },
                    {
                        "name": "lookup_bank",
                        "title": "Banco pelo código",
                        "text": "O banco pelo código de compensação (COMPE) ou pelo ISPB do Pix, e a lista inteira com list_banks."
                    },
                    {
                        "name": "search_ncm",
                        "title": "Tabela NCM",
                        "text": "A classificação fiscal da mercadoria por palavra ou pelo código, com a vigência; um código exato com lookup_ncm."
                    },
                    {
                        "name": "get_rates",
                        "title": "Selic, CDI e IPCA",
                        "text": "As taxas mais recentes, com a data, das séries abertas do Banco Central."
                    }
                ],
                "data": [
                    {
                        "title": "Só dados públicos",
                        "text": "Os dados abertos da Receita Federal, as bases de CEP, as tabelas do Banco Central e a NCM. Não há login, chave nem acesso a nada seu, e o CPF nunca é consultado: só conferido."
                    },
                    {
                        "title": "Os dados só passam",
                        "text": "Vão da fonte pública para o seu assistente. Não são guardados, vendidos nem usados para treinar modelos."
                    }
                ],
                "limits": {
                    "perMinute": 30,
                    "perDay": 1000
                }
            }
        }
    ]
}
