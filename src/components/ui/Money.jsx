import { formatMoney } from "../../utils/formato";

export default function Money({ value, decimales = false, className = "" }) {
  return <span className={`num ${className}`}>{formatMoney(value, decimales)}</span>;
}
