// components/LegalLayout.tsx
interface Section { title: string; content: string; }

function renderSection(content: string) {
  return content
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .split('\n\n')
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p class="text-slate-600 leading-relaxed mb-3 text-sm">${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');
}

export default function LegalLayout({ title, subtitle, sections }: {
  title: string; subtitle: string; sections: Section[];
}) {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-50 to-teal-50/20 border-b border-slate-100 pb-12 mb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl text-slate-900 mb-3">{title}</h1>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* TOC */}
        <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100">
          <h2 className="font-semibold text-slate-900 text-sm mb-3">Table of Contents</h2>
          <ol className="space-y-1">
            {sections.map(({ title }) => (
              <li key={title}>
                <a href={`#${title.replace(/\s+/g, '-').toLowerCase()}`}
                  className="text-sm text-teal-600 hover:underline">
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map(({ title, content }) => (
            <section key={title} id={title.replace(/\s+/g, '-').toLowerCase()}>
              <h2 className="font-display text-2xl text-slate-900 mb-4">{title}</h2>
              <div dangerouslySetInnerHTML={{ __html: renderSection(content) }} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
