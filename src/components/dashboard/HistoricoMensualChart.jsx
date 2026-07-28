import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatMoney } from "../../utils/formato";
import { useTheme } from "../theme/theme-context";

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs">
      <p className="font-medium text-primary">{label}</p>
      <p className="text-secondary">{formatMoney(payload[0].value)}</p>
    </div>
  );
}

export default function HistoricoMensualChart({ data }) {
  const { theme } = useTheme();
  const tickFill = theme === "light" ? "#6e6e73" : "#aeaeb4";
  const gridColor = theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";
  const barColor = theme === "light" ? "#0071e3" : "#0A84FF";
  const cursorFill = theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)";

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ left: 4, right: 8, top: 8, bottom: 4 }}>
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis dataKey="label" tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: tickFill, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={64}
          tickFormatter={(v) => (v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`)}
        />
        <Tooltip content={<Tip />} cursor={{ fill: cursorFill }} />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={44} fill={barColor} />
      </BarChart>
    </ResponsiveContainer>
  );
}
