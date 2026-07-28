import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatMoney } from "../../utils/formato";
import Icon from "../ui/Icon";
import { useTheme } from "../theme/theme-context";

// data: [{ nombre, total, porcentaje, color }]
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs">
      <p className="font-medium text-primary">{d.nombre}</p>
      <p className="text-secondary">
        {formatMoney(d.total)} · {d.porcentaje.toFixed(1)}%
      </p>
    </div>
  );
}

export default function CategoryChart({ data }) {
  const [tipo, setTipo] = useState("pastel");
  const { theme } = useTheme();
  const tickFill = theme === "light" ? "#6e6e73" : "#aeaeb4";
  const cursorFill = theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)";

  const toggleBtn = (activa) =>
    `inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
      activa ? "bg-accent text-white" : "text-secondary hover:text-primary"
    }`;

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-primary">Distribución de ingresos por categoría</h2>
        <div className="flex rounded-lg border border-hairline bg-tint p-0.5">
          <button className={toggleBtn(tipo === "pastel")} onClick={() => setTipo("pastel")}>
            <Icon name="pie" size={15} /> Pastel
          </button>
          <button className={toggleBtn(tipo === "barras")} onClick={() => setTipo("barras")}>
            <Icon name="barras" size={15} /> Barras
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">Sin datos en el periodo seleccionado.</p>
      ) : tipo === "pastel" ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="nombre" innerRadius={70} outerRadius={110} paddingAngle={2} stroke="none">
              {data.map((d) => (
                <Cell key={d.nombre} fill={d.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(220, data.length * 46)}>
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="nombre"
              width={150}
              tick={{ fill: tickFill, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: cursorFill }} />
            <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={22}>
              {data.map((d) => (
                <Cell key={d.nombre} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
