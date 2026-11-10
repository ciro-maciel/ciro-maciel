import { useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import { MIN_LENGTH, searchSite } from './search'

const DEBOUNCE_MS = 120
const EMPTY = { results: [], total: 0, counts: {}, query: null }

/*
 * The index, fetched once per visit and shared by the header and the page.
 * It is fetched the first time a search opens, not with the page: whoever
 * never searches never downloads it. A failed fetch is forgotten, so the next
 * opening tries again.
 */
let indexPromise = null
export function loadIndex() {
    if (!indexPromise) {
        indexPromise = fetch('/search.json')
            .then(response => (response.ok ? response.json() : Promise.reject(new Error(`search.json: ${response.status}`))))
            .catch(error => {
                indexPromise = null
                throw error
            })
    }
    return indexPromise
}

/**
 * The search as the header and the page run it. The index lives in memory, so
 * a search costs a few milliseconds: the debounce only spares the list from
 * redrawing on every key.
 */
export function useSiteSearch(term, { kinds = [], isEnabled = true } = {}) {
    const [docs, setDocs] = useState(null)
    const [hasFailed, setHasFailed] = useState(false)
    const [debounced] = useDebouncedValue(term, DEBOUNCE_MS)

    useEffect(() => {
        if (!isEnabled || docs) return
        let isCurrent = true
        loadIndex()
            .then(data => isCurrent && setDocs(data))
            .catch(() => isCurrent && setHasFailed(true))
        return () => {
            isCurrent = false
        }
    }, [isEnabled, docs])

    const kindKey = kinds.join(',')
    const text = debounced.trim()
    const answer = useMemo(() => (docs && text.length >= MIN_LENGTH ? searchSite(docs, text, { kinds: kindKey ? kindKey.split(',') : [] }) : EMPTY), [docs, text, kindKey])

    const isSearchable = term.trim().length >= MIN_LENGTH
    return { ...answer, isSearchable, isLoading: isSearchable && !hasFailed && (!docs || debounced !== term), hasFailed }
}
