import { useState } from "react";
import { LifeWheel } from "rg-life-wheel-chart";
import type { LifeArea } from "rg-life-wheel-chart";

const DEFAULT_AREAS: LifeArea[] = [
  { label: "Saúde", value: 7 },
  { label: "Família", value: 8 },
  { label: "Carreira", value: 6 },
  { label: "Finanças", value: 5 },
  { label: "Relacionamentos", value: 9 },
  { label: "Desenvolvimento", value: 7 },
  { label: "Lazer", value: 4 },
  { label: "Espiritualidade", value: 6 },
];

export default function App() {
  const [areas, setAreas] = useState<LifeArea[]>(DEFAULT_AREAS);
  const [gridLevels, setGridLevels] = useState(10);
  const [labelFontSize, setLabelFontSize] = useState(9);
  const [strokeWidth, setStrokeWidth] = useState(1.5);
  const [clicked, setClicked] = useState<string | null>(null);

  function handleValueChange(index: number, value: number) {
    setAreas((prev) => prev.map((a, i) => (i === index ? { ...a, value } : a)));
  }

  function handleLabelChange(index: number, label: string) {
    setAreas((prev) => prev.map((a, i) => (i === index ? { ...a, label } : a)));
  }

  function addArea() {
    setAreas((prev) => [
      ...prev,
      { label: `Área ${prev.length + 1}`, value: 5 },
    ]);
  }

  function removeArea(index: number) {
    setAreas((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", gap: 0 }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 320,
          minWidth: 280,
          background: "#fff",
          borderRight: "1px solid #e5e7eb",
          padding: "24px 20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 4,
            }}
          >
            Life Wheel Preview
          </h1>
          <p style={{ fontSize: 13, color: "#6b7280" }}>
            Edite as áreas e ajuste as configurações em tempo real.
          </p>
        </div>

        {/* Global settings */}
        <section>
          <h2 style={sectionTitle}>Configurações</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={labelStyle}>
              Níveis de grade: <strong>{gridLevels}</strong>
              <input
                type="range"
                min={3}
                max={15}
                value={gridLevels}
                onChange={(e) => setGridLevels(Number(e.target.value))}
                style={rangeStyle}
              />
            </label>
            <label style={labelStyle}>
              Tamanho da fonte: <strong>{labelFontSize}</strong>
              <input
                type="range"
                min={6}
                max={16}
                value={labelFontSize}
                onChange={(e) => setLabelFontSize(Number(e.target.value))}
                style={rangeStyle}
              />
            </label>
            <label style={labelStyle}>
              Espessura do traço: <strong>{strokeWidth}</strong>
              <input
                type="range"
                min={0.0}
                max={5}
                step={0.5}
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                style={rangeStyle}
              />
            </label>
          </div>
        </section>

        {/* Areas list */}
        <section style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <h2 style={sectionTitle}>Áreas ({areas.length})</h2>
            <button onClick={addArea} style={addBtnStyle}>
              + Adicionar
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {areas.map((area, i) => (
              <div key={i} style={areaCardStyle}>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <input
                    value={area.label}
                    onChange={(e) => handleLabelChange(i, e.target.value)}
                    style={textInputStyle}
                  />
                  <button
                    onClick={() => removeArea(i)}
                    style={removeBtnStyle}
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
                <label
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ minWidth: 16 }}>{area.value}</span>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={area.value}
                    onChange={(e) =>
                      handleValueChange(i, Number(e.target.value))
                    }
                    style={{ flex: 1, accentColor: "#6366f1" }}
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        {clicked && (
          <div
            style={{
              padding: "10px 12px",
              background: "#f0fdf4",
              borderRadius: 8,
              fontSize: 13,
              color: "#166534",
            }}
          >
            Clicou em: <strong>{clicked}</strong>
          </div>
        )}
      </aside>

      {/* Preview */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          gap: 24,
        }}
      >
        <LifeWheel
          areas={areas}
          gridLevels={gridLevels}
          labelFontSize={labelFontSize}
          strokeWidth={strokeWidth}
          style={{ maxWidth: 520 }}
          onAreaClick={(area) => setClicked(area.label)}
        />

        {/* Code snippet */}
        <details style={{ width: "100%", maxWidth: 520 }}>
          <summary
            style={{
              cursor: "pointer",
              fontSize: 13,
              color: "#6b7280",
              userSelect: "none",
            }}
          >
            Ver código de exemplo
          </summary>
          <pre style={codeStyle}>
            {generateSnippet(areas, { gridLevels, labelFontSize, strokeWidth })}
          </pre>
        </details>
      </main>
    </div>
  );
}

function generateSnippet(
  areas: LifeArea[],
  opts: { gridLevels: number; labelFontSize: number; strokeWidth: number },
) {
  const areasStr = areas
    .map((a) => `  { label: "${a.label}", value: ${a.value} }`)
    .join(",\n");
  return `import { LifeWheel } from "rg-life-wheel-chart";

const areas = [\n${areasStr}\n];

<LifeWheel
  areas={areas}
  gridLevels={${opts.gridLevels}}
  labelFontSize={${opts.labelFontSize}}
  strokeWidth={${opts.strokeWidth}}
/>`;
}

// --- Styles ---
const sectionTitle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: 8,
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#374151",
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const rangeStyle: React.CSSProperties = {
  width: "100%",
  accentColor: "#6366f1",
};

const areaCardStyle: React.CSSProperties = {
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "8px 10px",
};

const textInputStyle: React.CSSProperties = {
  flex: 1,
  fontSize: 13,
  border: "1px solid #d1d5db",
  borderRadius: 6,
  padding: "3px 8px",
  outline: "none",
};

const addBtnStyle: React.CSSProperties = {
  fontSize: 12,
  padding: "4px 10px",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const removeBtnStyle: React.CSSProperties = {
  fontSize: 16,
  width: 24,
  height: 24,
  lineHeight: "22px",
  textAlign: "center",
  background: "transparent",
  border: "1px solid #e5e7eb",
  borderRadius: 4,
  cursor: "pointer",
  color: "#9ca3af",
  flexShrink: 0,
};

const codeStyle: React.CSSProperties = {
  marginTop: 12,
  background: "#1e1e2e",
  color: "#cdd6f4",
  padding: 16,
  borderRadius: 8,
  fontSize: 12,
  overflowX: "auto",
  lineHeight: 1.6,
  whiteSpace: "pre",
};
