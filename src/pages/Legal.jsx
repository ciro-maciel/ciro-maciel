import { useParams, Navigate } from 'react-router-dom'
import { LegalSecurity } from '@ciromaciel/components-kit'
import { LegalDocument } from '../components/LegalDocument'
import { PRIVACY, TERMS } from '../data/legal'

import { useSeoMeta } from '../hooks/useSeoMeta'
import { SITE } from '../data/site'

/**
 * Termos, privacidade e segurança — de quem assina o site.
 *
 * DUAS IDENTIDADES, COMO NO INFRASTRUCTURE. `companyName` é a voz — aqui, a
 * PESSOA, porque é ela que este site apresenta. `legalEntity` é a pessoa
 * jurídica, e o kit (>= 1.1.0) a usa só nas cláusulas que precisam de um
 * sujeito que exista em cartório: a parte do contrato, o titular da
 * propriedade, o foro, o controlador perante a LGPD.
 *
 * Por que a separação importa AQUI, num site que não vende nada: quem responde
 * pela LGPD e assina contrato é a pessoa jurídica, não o nome de quem escreve.
 * Até 20/09/2026 havia só `companyName`, e o texto do kit trazia o artigo
 * preso ("contrato vinculativo entre você e A ..."), o que aplicado a um nome
 * de pessoa rendia "a Ciro Cesar Maciel" — concordância errada em cláusula
 * de contrato. O kit corrigiu o artigo junto com a prop nova.
 *
 * `productName` é o domínio, não o nome de um produto. Este site não vende
 * nada: o que a política cobre é a visita a ciromaciel.click, e nomear o
 * domínio é o que descreve isso com honestidade. Era assim que a página de
 * privacidade já fazia antes de virar uma rota das três.
 *
 * A ESTRUTURA É A DO myinfrastructure.click (`/legal/:type`), de propósito: os
 * dois sites são mantidos pela mesma pessoa e com o mesmo kit, e uma URL que
 * muda de forma entre eles é uma decisão a ser lembrada duas vezes.
 */
// Privacy and terms are the site's own (src/data/legal.js, since 29/09/2026):
// the kit's texts promised things this site does not do. Security is still
// the kit's.
const DOCUMENTS = {
    terms: () => <LegalDocument document={TERMS} />,
    privacy: () => <LegalDocument document={PRIVACY} />,
    security: LegalSecurity,
}

const SEO = {
    terms: {
        title: 'Termos de uso',
        description: 'As condições para usar este site, as ferramentas gratuitas, o MCP e os plugins para assistentes de IA.',
    },
    privacy: {
        title: 'Política de Privacidade',
        description: 'O que o site, as ferramentas e os assistentes de IA fazem com os seus dados, e por quanto tempo, conforme a LGPD.',
    },
    security: {
        title: 'Segurança',
        description: 'Como este site é operado e o que fazer ao encontrar uma vulnerabilidade.',
    },
}

export function Legal() {
    const { type } = useParams()
    const Document = DOCUMENTS[type]

    /* O HOOK VEM ANTES DO RETORNO CONDICIONAL, porque hook não pode ficar
       atrás de um `if`. Num `type` desconhecido `SEO[type]` é `undefined`, o
       `useSeoMeta` ignora campo vazio, e quem decide o que renderizar é a
       linha seguinte. */
    useSeoMeta({ ...SEO[type], url: `/legal/${type}` })

    /* UM TIPO QUE NÃO EXISTE NÃO É UM 404: é uma URL inventada dentro de uma
       família que existe, e a lista de documentos está no rodapé. Mandar para
       a privacidade seria escolher um documento pelo leitor; a home deixa ele
       escolher. */
    if (!Document) return <Navigate to="/" replace />

    return (
        <Document
            companyName={SITE.name}
            legalEntity={SITE.legalEntity}
            productName={SITE.url.replace('https://', '')}
        />
    )
}
