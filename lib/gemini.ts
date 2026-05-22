type GeminiErrorBody = {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

type GeminiSuccess = {
  ok: true;
  data: unknown;
  model: string;
};

type GeminiFailure = {
  ok: false;
  status: number;
  message: string;
  model: string;
};

const DEFAULT_MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

function geminiErrorMessage(status: number, body: GeminiErrorBody | null, model: string) {
  const providerMessage = body?.error?.message?.trim();
  const providerStatus = body?.error?.status;

  if (status === 429) {
    return "Gemini quota or rate limit is reached for now. Please try again later or use a billed API key with higher quota.";
  }
  if (status === 400) {
    return providerMessage || "Gemini rejected the request format. Please adjust the input and try again.";
  }
  if (status === 401 || status === 403) {
    return "Gemini API key is not authorized for this request. Please check the API key, billing, and Gemini API access.";
  }
  if (status === 503 || providerStatus === "UNAVAILABLE") {
    return `${model} is overloaded right now. We tried the fallback model too, but Gemini is still busy. Please try again in a few minutes.`;
  }

  return providerMessage || "Gemini generation failed. Please try again in a few minutes.";
}

async function readJson(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export async function generateGeminiContent(apiKey: string, body: unknown, models = DEFAULT_MODELS): Promise<GeminiSuccess | GeminiFailure> {
  let lastFailure: GeminiFailure | null = null;

  for (const model of models) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    const data = await readJson(response);

    if (response.ok) {
      return { ok: true, data, model };
    }

    const failure = {
      ok: false as const,
      status: response.status,
      message: geminiErrorMessage(response.status, data as GeminiErrorBody | null, model),
      model,
    };
    lastFailure = failure;

    if (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 429) {
      return failure;
    }
  }

  return lastFailure || {
    ok: false,
    status: 502,
    message: "Gemini generation failed. Please try again in a few minutes.",
    model: models[0] || "gemini",
  };
}
