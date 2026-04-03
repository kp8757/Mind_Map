import { templates } from '../utils/templates.js';

export default function Sidebar({ selectedTemplate, onTemplateChange }) {
  return (
    <aside className="w-full space-y-5 border-r border-slate-700/40 bg-slate-900/50 p-4 md:w-72">
      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">Templates</h2>
        <div className="grid gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`rounded-xl border p-3 text-left transition ${
                selectedTemplate === template.id
                  ? 'border-accent-500 bg-accent-500/10'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <p className="font-semibold">{template.label}</p>
              <p className="text-xs text-slate-400">{template.description}</p>
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
