export type HealthResponse = {
  status: string;
  service: string;
  timestamp: string;
};

export type EchoRequest = {
  message: string;
};

export type EchoResponse = {
  echoed: string;
  timestamp: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`API ${response.status}: ${bodyText || response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>("/api/health");
}

export async function postEcho(payload: EchoRequest): Promise<EchoResponse> {
  return request<EchoResponse>("/api/echo", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

/*
  TODO HACKATHON:
  Agrega aqui todos los endpoints nuevos para mantener la integracion en un solo archivo.
  Ejemplo:

  export type Project = { id: string; name: string };

  export async function getProjects(): Promise<Project[]> {
    return request<Project[]>("/api/projects");
  }
*/
