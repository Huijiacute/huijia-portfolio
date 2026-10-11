import { useEffect, useState } from "react"

export type UseTypewriterResult = {
  displayed: string
  done: boolean
}

/**
 * Reveals `text` one character at a time.
 *
 * @param text        The full string to type out.
 * @param speed       Milliseconds between characters (default 38ms).
 * @param startDelay  Delay before typing begins (default 600ms).
 */
export function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600,
): UseTypewriterResult {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed("")
    setDone(false)

    let intervalId: ReturnType<typeof setInterval> | undefined
    let index = 0

    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

export default useTypewriter
