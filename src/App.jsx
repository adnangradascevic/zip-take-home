import { useMemo, useState } from "react";
import { formatUsd } from "./utils/formatUsd.js";


/**
 * Tiny "procurement" style widget:
 * - Choose quantity
 * - Shows subtotal
 * - Used for unit tests + UI realism (still simple)
 */
export default function App() {
  const [qty, setQty] = useState(1);
  const unitPrice = 49;

  const subtotal = useMemo(() => qty * unitPrice, [qty]);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24, maxWidth: 640 }}>
      <h1>Zip QA CI Take-Home</h1>
      <p>This is a tiny frontend page used to demonstrate lint + unit test gates in CI.</p>

      <section
        aria-label="purchase-widget"
        style={{ marginTop: 16, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}
      >
        <h2>Buy Seats</h2>

        <label htmlFor="qty">Quantity</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="decrease">
            -
          </button>

          <input
            id="qty"
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            style={{ width: 96 }}
          />

          <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="increase">
            +
          </button>
        </div>

        <p style={{ marginTop: 12 }}>
          Unit price: <strong>{formatUsd(unitPrice)}</strong>
        </p>
        <p>
          Subtotal: <strong data-testid="subtotal">{formatUsd(subtotal)}</strong>
        </p>
      </section>
    </div>
  );
}
