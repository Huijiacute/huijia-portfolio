const AVATAR_SRC = "/jiaa.png"

/**
 * The girl avatar as the hero background. She fills the hero frame and stays
 * still (no mouse tracking / scrub motion). Scoped to the hero section.
 */
export function ScrubAvatar() {
  return (
    <img
      src={AVATAR_SRC}
      alt="Hui Jia avatar"
      draggable={false}
      className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-top"
      style={{
        zIndex: 0,
        objectPosition: "right top",
        transformOrigin: "right top",
        transform: "translateX(17%) scale(0.9)",
      }}
    />
  )
}

export default ScrubAvatar
