import { forwardRef, useState } from "react"

import { ArrowRight } from "lucide-react"

const INPUT_CLASS = [
  "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3.5",
  "text-sm text-white placeholder:text-white/35",
  "outline-none transition-colors",
  "focus:border-[#A855F7] focus:bg-white/8",
].join(" ")

const LABEL_CLASS = "cine-ui mb-2 block text-sm font-medium text-white/85"

export const Possibilities = forwardRef<HTMLElement>(function Possibilities(
  _props,
  ref,
) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
    message: "",
  })
  const [agreed, setAgreed] = useState(false)

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No backend — compose a mailto so the message is actually sent.
    const subject = encodeURIComponent(
      `Portfolio enquiry${form.enquiry ? ` — ${form.enquiry}` : ""} from ${form.name}`,
    )
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Enquiry Type: ${form.enquiry}`,
        "",
        form.message,
      ].join("\n"),
    )
    window.location.href = `mailto:limhouykea@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="possibilities"
      ref={ref}
      className="cine-section relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
    >
      {/* Purple gradient glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 0%, rgba(124,58,237,0.35) 0%, rgba(88,28,135,0.18) 40%, rgba(18,16,25,0) 75%)",
        }}
      />

      <div className="cine-eyebrow absolute top-24 left-10 z-10">
        05 — Contact
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        <h2 className="cine-display text-center text-[clamp(2.25rem,6vw,4.5rem)] text-white">
          Get in Touch
        </h2>

        <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-6">
          {/* Row 1: Name + Email */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={LABEL_CLASS}>
                Full Name <span className="text-[#A855F7]">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Name"
                value={form.name}
                onChange={update("name")}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={LABEL_CLASS}>
                Email Address <span className="text-[#A855F7]">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={update("email")}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Row 2: Phone + Enquiry */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="contact-phone" className={LABEL_CLASS}>
                Phone Number <span className="text-[#A855F7]">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                placeholder="Phone"
                value={form.phone}
                onChange={update("phone")}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="contact-enquiry" className={LABEL_CLASS}>
                Enquiry Type <span className="text-[#A855F7]">*</span>
              </label>
              <select
                id="contact-enquiry"
                required
                value={form.enquiry}
                onChange={update("enquiry")}
                className={`${INPUT_CLASS} ${form.enquiry ? "text-white" : "text-white/35"}`}
              >
                <option value="" disabled hidden>
                  Enquiry
                </option>
                <option className="text-black" value="Web Development">
                  Web Development
                </option>
                <option className="text-black" value="AI / Data">
                  AI / Data
                </option>
                <option className="text-black" value="Design">
                  Design
                </option>
                <option className="text-black" value="Collaboration">
                  Collaboration
                </option>
                <option className="text-black" value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className={LABEL_CLASS}>
              Message <span className="text-[#A855F7]">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              placeholder="Message"
              rows={6}
              value={form.message}
              onChange={update("message")}
              className={`${INPUT_CLASS} resize-y`}
            />
          </div>

          {/* Agreement */}
          <label className="cine-ui flex items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 rounded border-white/30 accent-[#7C3AED]"
            />
            I agree to talk about my project with Lim Houykea
          </label>

          {/* Submit */}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              disabled={!agreed}
              className={[
                "cine-ui inline-flex items-center gap-2 rounded-xl border border-[#A855F7]/60 px-10 py-4",
                "text-sm font-medium text-white transition-all",
                "hover:bg-[#7C3AED]/20 hover:-translate-y-0.5",
                "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-transparent",
              ].join(" ")}
            >
              Send Message
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
})

export default Possibilities
