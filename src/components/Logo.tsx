export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/nexus-logo.svg"
      alt="Nexus"
      className={`h-7 w-auto invert dark:invert-0 ${props.className ?? ''}`}
      {...props}
    />
  )
}
