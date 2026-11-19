import { useEffect, useState } from 'react'
import { Anchor, Badge, Box, Container, Grid, Group, Image, List, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { CodeBlock, CTAButton, FAQ, SECTION_BACKGROUNDS, SectionHeader } from '@ciromaciel/components-kit'
import { IconArrowRight, IconCheck, IconKey, IconSparkles } from '@tabler/icons-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { NotFound } from './NotFound'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { VSCODE } from '../data/vscode'

/**
 * /vscode (19/11/2026): the VS Code extensions, what each does free, and the Pro plan of the ones
 * on sale (Stack Trace Triage and SQLite Editor since 19/11/2026). In English: the people who install them read English.
 *
 * The price is read from Payments at load time (the catalog of VSCODE.payments.gatewayId), never
 * written here: one source, infrastructure/payments/scripts/specs/vscode-pro.json. While the plans
 * sit on the test gateway, Payments says `isLive: false` and the page says so above the buttons.
 *
 * THE LICENSE KEY is drawn in this browser (`cmvs_` + 32 hex) and sent as the buyer's id to the
 * checkout; the license server checks it against Payments. It is kept in localStorage, so a second
 * purchase adds to the same key, and it comes back in the address fragment after Stripe, so a browser
 * without storage still shows it. The key is also the buyer's id in Payments and in the Stripe
 * session's metadata (how the webhook files the subscription); the browser never sends it in a query
 * string to the site or the analytics.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'
const KEY_STORAGE = 'ciro-maciel.vscode-pro.licenseKey'
const HOW_ICONS = [IconCheck, IconSparkles, IconKey]

const readKey = () => {
    try {
        return window.localStorage.getItem(KEY_STORAGE) || null
    } catch {
        return null
    }
}

const keepKey = key => {
    try {
        window.localStorage.setItem(KEY_STORAGE, key)
    } catch {
        // Private mode: the key still comes back in the address fragment after the checkout.
    }
}

const isLicenseKey = value => /^cmvs_[0-9a-f]{32}$/.test(value ?? '')

function newKey() {
    const bytes = new Uint8Array(16)
    window.crypto.getRandomValues(bytes)
    return `cmvs_${[...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('')}`
}

const formatPrice = plan => {
    const amount = (plan.price / 100).toFixed(plan.price % 100 === 0 ? 0 : 2)
    return String(plan.currency).toUpperCase() === 'USD' ? `$${amount}` : `${amount} ${plan.currency}`
}

/** The Pro plans from Payments, by productId: `{ status, plans, isLive }`. */
function usePlans() {
    const [state, setState] = useState({ status: 'loading', plans: {}, isLive: false })
    useEffect(() => {
        const { apiUrl, publicKey, gatewayId } = VSCODE.payments
        let isCurrent = true
        fetch(`${apiUrl}/sdk/v1/plans?publicKey=${publicKey}&gatewayId=${gatewayId}`)
            .then(response => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
            .then(body => {
                if (!isCurrent) return
                const plans = Object.fromEntries((body.items ?? []).filter(plan => plan.productId?.startsWith('vscode-')).map(plan => [plan.productId, plan]))
                setState({ status: 'ready', plans, isLive: Object.values(plans).some(plan => plan.isLive) })
            })
            .catch(() => isCurrent && setState({ status: 'failed', plans: {}, isLive: false }))
        return () => {
            isCurrent = false
        }
    }, [])
    return state
}

async function startCheckout(extension, plan) {
    const stored = readKey()
    const key = isLicenseKey(stored) ? stored : newKey()
    keepKey(key)
    // Payments refuses a second checkout only for plans with a product, and these have none, so the
    // page asks first: this key already holding this extension's Pro must not be charged twice.
    const { apiUrl, publicKey } = VSCODE.payments
    const held = await fetch(`${apiUrl}/sdk/v1/permissions?publicKey=${publicKey}&userId=${encodeURIComponent(key)}`)
        .then(answer => (answer.ok ? answer.json() : null))
        .catch(() => null)
    if (!held) throw new Error('The checkout could not be reached. Try again in a minute.')
    if ((held.features ?? []).some(feature => feature.slug === `${extension.productId}-pro`)) {
        throw new Error('This browser already holds the Pro of this extension. Your key is the one shown after the purchase; paste it in the editor with "Enter Pro License Key".')
    }
    const origin = window.location.origin
    const response = await fetch(`${apiUrl}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: key,
            planId: plan.id,
            currency: plan.currency,
            success_url: `${origin}${VSCODE.path}?subscribed=${extension.id}#key=${key}`,
            cancel_url: `${origin}${VSCODE.path}#${extension.id}`,
        }),
    })
    const body = await response.json().catch(() => ({}))
    if (response.status === 409) throw new Error('This license key already has the Pro of this extension. Paste it in the editor with "Enter Pro License Key".')
    if (!response.ok || !body.url) throw new Error('The checkout did not open. Try again in a minute.')
    window.location.assign(body.url)
}

function Hero() {
    const { hero } = VSCODE
    return (
        <Box
            component="section"
            bg={SECTION_BACKGROUNDS.gray}
            py={{ base: 80, md: 120 }}
        >
            <Container size="lg">
                <Grid
                    gutter={{ base: 40, md: 64 }}
                    align="center"
                >
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Stack
                            gap="lg"
                            align="flex-start"
                            style={{ minWidth: 0 }}
                        >
                            <Text
                                fz={13}
                                fw={800}
                                tt="uppercase"
                                lts="1.5px"
                                c="gray.5"
                            >
                                {hero.eyebrow}
                            </Text>
                            <Text
                                component="h1"
                                m={0}
                                c="gray.9"
                                fz={{ base: 32, sm: 44, md: 52 }}
                                lh={1.1}
                                fw={900}
                                style={{ letterSpacing: '-0.03em', textWrap: 'balance' }}
                            >
                                {hero.title}
                            </Text>
                            <Text
                                fz={{ base: 16, md: 18 }}
                                c="gray.6"
                                lh={1.6}
                            >
                                {hero.description}
                            </Text>
                            <Stack
                                gap="xs"
                                align="flex-start"
                                mt="xs"
                            >
                                <CTAButton
                                    label="See the extensions"
                                    href="#extensions"
                                    icon={<IconArrowRight size={18} />}
                                />
                                <Text
                                    fz={13}
                                    c="gray.5"
                                >
                                    {hero.note}
                                </Text>
                            </Stack>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Image
                            src={hero.image}
                            alt={hero.alt}
                            radius={0}
                            style={{ border: BORDER }}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}

// Who comes back from Stripe lands here with ?subscribed=<id> and #key=<key>: the first thing
// they see is the key and what to do with it.
function PurchaseReturn() {
    const { search, hash } = useLocation()
    const extensionId = new URLSearchParams(search).get('subscribed')
    const extension = VSCODE.extensions.find(item => item.id === extensionId)
    const [key, setKey] = useState(null)
    const [isCopied, setIsCopied] = useState(false)
    useEffect(() => {
        const fromHash = new URLSearchParams(hash.replace(/^#/, '')).get('key')
        const found = isLicenseKey(fromHash) ? fromHash : readKey()
        if (isLicenseKey(found)) {
            keepKey(found)
            setKey(found)
        }
    }, [hash])
    if (!extension) return null
    const { returned } = VSCODE
    const copy = () => {
        navigator.clipboard?.writeText(key).then(
            () => setIsCopied(true),
            () => setIsCopied(false)
        )
    }
    return (
        <Box
            component="section"
            aria-live="polite"
            bg={SECTION_BACKGROUNDS.white}
            py={{ base: 40, md: 56 }}
            style={{ borderBottom: BORDER }}
        >
            <Container size="lg">
                <Stack
                    gap="md"
                    maw={820}
                >
                    <Title
                        order={2}
                        fz={{ base: 22, md: 28 }}
                        fw={900}
                        c="gray.9"
                    >
                        {returned.title}
                    </Title>
                    <Text
                        fz={15}
                        c="gray.6"
                    >
                        {extension.name} Pro
                    </Text>
                    {key ? (
                        <>
                            <CodeBlock>{key}</CodeBlock>
                            <Group>
                                <CTAButton
                                    size="md"
                                    label={isCopied ? 'Copied' : 'Copy the key'}
                                    onClick={copy}
                                />
                            </Group>
                            <List
                                type="ordered"
                                spacing="xs"
                            >
                                {returned.steps.map(step => (
                                    <List.Item key={step}>
                                        <Text
                                            fz={15}
                                            c="gray.7"
                                        >
                                            {step}
                                        </Text>
                                    </List.Item>
                                ))}
                            </List>
                        </>
                    ) : (
                        <Text
                            fz={15}
                            c="gray.7"
                        >
                            {returned.missing}
                        </Text>
                    )}
                </Stack>
            </Container>
        </Box>
    )
}

function How() {
    const { how } = VSCODE
    return (
        <Box
            component="section"
            bg={SECTION_BACKGROUNDS.white}
            py={{ base: 80, md: 120 }}
        >
            <Container size="lg">
                <Stack gap={48}>
                    <SectionHeader
                        subtitle={how.eyebrow}
                        title={how.title}
                        ta="center"
                    />
                    <SimpleGrid
                        cols={{ base: 1, md: 3 }}
                        spacing="lg"
                    >
                        {how.items.map((item, index) => {
                            const Icon = HOW_ICONS[index]
                            return (
                                <Paper
                                    key={item.title}
                                    p={{ base: 'lg', md: 'xl' }}
                                    radius={0}
                                    style={{ border: BORDER }}
                                >
                                    <Stack gap="sm">
                                        <ThemeIcon
                                            variant="transparent"
                                            color="gray.9"
                                            size={28}
                                        >
                                            <Icon
                                                size={24}
                                                stroke={1.8}
                                            />
                                        </ThemeIcon>
                                        <Title
                                            order={3}
                                            fz={{ base: 19, md: 21 }}
                                            fw={900}
                                            c="gray.9"
                                        >
                                            {item.title}
                                        </Title>
                                        <Text
                                            fz={15}
                                            c="gray.6"
                                            lh={1.6}
                                        >
                                            {item.description}
                                        </Text>
                                    </Stack>
                                </Paper>
                            )
                        })}
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    )
}

function Bullets({ items, isStrong = false }) {
    return (
        <List
            spacing={6}
            center
            icon={
                <ThemeIcon
                    variant="transparent"
                    color={isStrong ? 'gray.9' : 'gray.5'}
                    size={18}
                >
                    <IconCheck
                        size={16}
                        stroke={2}
                    />
                </ThemeIcon>
            }
        >
            {items.map(item => (
                <List.Item key={item}>
                    <Text
                        fz={14}
                        c={isStrong ? 'gray.9' : 'gray.7'}
                        lh={1.5}
                    >
                        {item}
                    </Text>
                </List.Item>
            ))}
        </List>
    )
}

function ProBox({ extension, catalog }) {
    const [error, setError] = useState(null)
    const [isOpening, setIsOpening] = useState(false)
    const plan = catalog.plans[extension.productId]
    const subscribe = async () => {
        setError(null)
        setIsOpening(true)
        try {
            await startCheckout(extension, plan)
        } catch (failure) {
            setError(failure.message)
            setIsOpening(false)
        }
    }
    return (
        <Paper
            p="lg"
            radius={0}
            bg={SECTION_BACKGROUNDS.gray}
            style={{ border: '2px solid var(--mantine-color-gray-9)' }}
        >
            <Stack gap="sm">
                <Group
                    justify="space-between"
                    align="baseline"
                >
                    <Text
                        fz={13}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.9"
                    >
                        Pro
                    </Text>
                    {plan ? (
                        <Text
                            fz={22}
                            fw={900}
                            c="gray.9"
                        >
                            {formatPrice(plan)}
                            <Text
                                span
                                fz={14}
                                fw={500}
                                c="gray.6"
                            >
                                {' '}
                                / month
                            </Text>
                        </Text>
                    ) : null}
                </Group>
                <Bullets
                    items={[...extension.pro, `${VSCODE.model}, up to ${VSCODE.dailyRequests} AI requests a day`]}
                    isStrong
                />
                {plan ? (
                    <CTAButton
                        size="md"
                        fullWidth
                        loading={isOpening}
                        onClick={subscribe}
                        label={`Subscribe to ${extension.name} Pro`}
                    />
                ) : (
                    <Text
                        fz={13}
                        c="gray.6"
                    >
                        {catalog.status === 'loading' ? 'Loading the price…' : 'The checkout could not be reached. Reload the page to try again.'}
                    </Text>
                )}
                {error ? (
                    <Text
                        fz={13}
                        c="gray.9"
                        role="alert"
                    >
                        {error}
                    </Text>
                ) : null}
            </Stack>
        </Paper>
    )
}

function ExtensionRow({ extension, catalog, index, isPage = false }) {
    // The rows start gray below the white band of How, and alternate from there.
    const isGray = index % 2 === 0
    return (
        <Box
            component="article"
            id={extension.id}
            bg={isGray ? SECTION_BACKGROUNDS.gray : SECTION_BACKGROUNDS.white}
            py={{ base: 56, md: 80 }}
            style={{ scrollMarginTop: 96 }}
        >
            <Container size="lg">
                <Grid
                    gutter={{ base: 32, md: 56 }}
                    align="center"
                >
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Stack gap="md">
                            <Title
                                order={isPage ? 1 : 2}
                                fz={isPage ? { base: 34, md: 48 } : { base: 26, md: 34 }}
                                fw={900}
                                c="gray.9"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                {isPage ? extension.name : (
                                    <Anchor
                                        component={Link}
                                        to={extension.path}
                                        c="gray.9"
                                        underline="hover"
                                    >
                                        {extension.name}
                                    </Anchor>
                                )}
                            </Title>
                            <Text
                                fz={{ base: 16, md: 17 }}
                                c="gray.6"
                                lh={1.6}
                            >
                                {extension.summary}
                            </Text>
                            <Stack gap={6}>
                                <Text
                                    fz={13}
                                    fw={800}
                                    tt="uppercase"
                                    lts="1.5px"
                                    c="gray.5"
                                >
                                    Free
                                </Text>
                                <Bullets items={extension.free} />
                            </Stack>
                            <Group gap="md">
                                <Anchor
                                    href={extension.openVsx}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    fz={14}
                                    fw={700}
                                    c="gray.9"
                                >
                                    Install from Open VSX
                                </Anchor>
                                <Anchor
                                    href={extension.marketplace}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    fz={14}
                                    fw={700}
                                    c="gray.9"
                                >
                                    VS Code Marketplace
                                </Anchor>
                            </Group>
                            {extension.pro ? (
                                <ProBox
                                    extension={extension}
                                    catalog={catalog}
                                />
                            ) : null}
                            {isPage && extension.next ? (
                                <Stack gap={6} pt="sm" style={{ borderTop: BORDER }}>
                                    <Text fz={13} fw={800} tt="uppercase" lts="1.5px" c="gray.5">Next step</Text>
                                    <Text fz={15} c="gray.6" lh={1.6}>{extension.next.text}</Text>
                                    <Anchor href={extension.next.href} fz={14} fw={700} c="gray.9">{extension.next.label}</Anchor>
                                </Stack>
                            ) : null}
                            {extension.pro ? null : extension.freeOnly ? (
                                <Text
                                    fz={14}
                                    c="gray.5"
                                >
                                    {extension.freeOnly}
                                </Text>
                            ) : null}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Image
                            src={extension.image}
                            alt={extension.alt}
                            radius={0}
                            loading="lazy"
                            style={{ border: BORDER }}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}

function TestModeNote({ catalog }) {
    if (catalog.status !== 'ready' || catalog.isLive) return null
    return (
        <Box
            bg={SECTION_BACKGROUNDS.white}
            py="md"
            style={{ borderTop: BORDER, borderBottom: BORDER }}
        >
            <Container size="lg">
                <Group gap="sm">
                    <Badge
                        radius={0}
                        color="gray"
                        variant="outline"
                    >
                        Test mode
                    </Badge>
                    <Text
                        fz={14}
                        c="gray.7"
                    >
                        Pro checkout is in test mode: no card is charged yet, and a test license has a small daily allowance.
                    </Text>
                </Group>
            </Container>
        </Box>
    )
}

export function Vscode() {
    const { seo, faq } = VSCODE
    useSeoMeta({ title: seo.title, description: seo.description, url: VSCODE.path })
    const catalog = usePlans()
    useEffect(() => {
        const previous = document.documentElement.lang
        document.documentElement.lang = 'en'
        return () => {
            document.documentElement.lang = previous
        }
    }, [])

    return (
        <>
            <PurchaseReturn />
            <Hero />
            <How />
            <Box
                id="extensions"
                style={{ scrollMarginTop: 96 }}
            >
                <TestModeNote catalog={catalog} />
                {VSCODE.extensions.map((extension, index) => (
                    <ExtensionRow
                        key={extension.id}
                        extension={extension}
                        catalog={catalog}
                        index={index}
                    />
                ))}
            </Box>
            <FAQ
                id="questions"
                subtitle="Questions"
                title="Before you install"
                questions={faq}
                background={(VSCODE.extensions.length - 1) % 2 === 0 ? 'white' : 'gray'}
                ta="center"
            />
        </>
    )
}

/**
 * /vscode/<id> (19/11/2026): one page per extension, so each one has its own address, its own search and its own
 * measure (the product kit of the Manager Dashboard). The same row as the list, with the name as the page title,
 * the Pro box where it is on sale, and the honest next step to the product of the lines that solves the next problem.
 */
export function VscodeExtension() {
    const { id } = useParams()
    const extension = VSCODE.extensions.find((e) => e.id === id)
    const catalog = usePlans()
    useSeoMeta(extension ? { title: `${extension.name} for VS Code`, description: extension.summary, url: extension.path } : { title: VSCODE.seo.title, description: VSCODE.seo.description, url: VSCODE.path })
    useEffect(() => {
        const previous = document.documentElement.lang
        document.documentElement.lang = 'en'
        return () => {
            document.documentElement.lang = previous
        }
    }, [])
    if (!extension) return <NotFound />
    return (
        <>
            <PurchaseReturn />
            <ExtensionRow extension={extension} catalog={catalog} index={1} isPage />
            {extension.pro ? <How /> : null}
            <Box bg={SECTION_BACKGROUNDS.gray} py={{ base: 40, md: 56 }}>
                <Container size="lg">
                    <Anchor component={Link} to={VSCODE.path} fz={14} fw={700} c="gray.9">All {VSCODE.extensions.length} extensions</Anchor>
                </Container>
            </Box>
        </>
    )
}
