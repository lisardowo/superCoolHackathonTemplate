import { useState } from "react";
import { getHealth, postEcho } from "./lib/api";
import "./styles.css";

function App(): JSX.Element {
  const [healthText, setHealthText] = useState("Sin consultar");
  const [echoText, setEchoText] = useState("Sin consultar");
  const [loading, setLoading] = useState(false);

  async function testApiConnection(): Promise<void> {
    setLoading(true);
    try {
      const health = await getHealth();
      const echo = await postEcho({ message: "Hola desde frontend" });

      setHealthText(`${health.status} - ${health.service} (${health.timestamp})`);
      setEchoText(`${echo.echoed} (${echo.timestamp})`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      setHealthText(`Error: ${message}`);
      setEchoText("No disponible por error de conexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>Hackathon Template</h1>
      <p>React + TypeScript + FastAPI + Render</p>

      <button onClick={testApiConnection} disabled={loading}>
        {loading ? "Probando..." : "Probar conexion API"}
      </button>

      <section className="card">
        <h2>Health</h2>
        <p>{healthText}</p>
      </section>

      <section className="card">
        <h2>Echo</h2>
        <p>{echoText}</p>
      </section>
    </main>
  );
}

export default App;
