export default function AboutSection() {
  return (
    <section className="py-24" id="about">
      <div className="notion-page text-center">
        <h2 className="notion-title font-serif mb-8">
          Built by People Who Needed This
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed font-inter">
            Daksha was born out of necessity — a personal quest to build a tool that understands not just what we store, but why we store it.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed font-inter">
            Our founder used to write diaries in a language he invented to keep them private. That same desire for intelligent, personal privacy and reflection drives Daksha today.
          </p>
        </div>
      </div>
    </section>
  )
}