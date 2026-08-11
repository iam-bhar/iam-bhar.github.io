export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px] opacity-30" />
      <div className="animate-blob-1 absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-indigo/25 blur-[120px]" />
      <div className="animate-blob-2 absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan/20 blur-[120px]" />
      <div className="animate-blob-3 absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-purple/15 blur-[120px]" />
      <div className="animate-blob-2 absolute bottom-1/4 right-1/4 h-[22rem] w-[22rem] rounded-full bg-warning/10 blur-[110px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/60 to-space" />
    </div>
  );
}
