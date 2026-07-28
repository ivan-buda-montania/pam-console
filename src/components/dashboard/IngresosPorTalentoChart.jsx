import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatMoney } from "../../utils/formato";
import { useTheme } from "../theme/theme-context";

function Tip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs">
      <p className="font-medium text-primary">{d.nombre}</p>
      <p className="text-secondary">{formatMoney(d.total)}</p>
    </div>
  );
}

export default function IngresosPorTalentoChart({ data }) {
  const { theme } = useTheme();
  const tickFill = theme === "light" ? "#6e6e73" : "#aeaeb4";
  const barColor = theme === "light" ? "#0071e3" : "#0A84FF";
  const cursorFill = theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)";

  const rows = data.filter((d) => d.total > 0);
  if (rows.length === 0) return <p className="py-12 text-center text-sm text-muted">Sin ingresos en el periodo.</p>;

  return (
    <ResponsiveContainer width="100%" height={Math.max(200, rows.length * 42)}>
      <BarChart data={rows} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="nombre" width={130} tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip content={<Tip />} cursor={{ fill: cursorFill }} />
        <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={20} fill={barColor} />
      </BarChart>
    </ResponsiveContainer>
  );
}
