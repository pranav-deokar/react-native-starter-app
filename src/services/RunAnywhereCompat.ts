import { RunAnywhere } from '@runanywhere/core';
import { LlamaCPP } from '@runanywhere/llamacpp';

type TextInferenceParams = {
  modelId: string;
  input: string;
};

type TextInferenceResponse = {
  output?: string;
};

type RunAnywhereWithInference = typeof RunAnywhere & {
  inference?: {
    text: (params: TextInferenceParams) => Promise<TextInferenceResponse>;
  };
};

type LlamaCPPWithHelpers = typeof LlamaCPP & {
  downloadModel?: (modelId: string) => Promise<void>;
  loadModel?: (modelId: string) => Promise<void>;
};

const runAnywhereCompat = RunAnywhere as RunAnywhereWithInference;
const llamaCompat = LlamaCPP as LlamaCPPWithHelpers;

if (!runAnywhereCompat.inference) {
  runAnywhereCompat.inference = {
    async text({ input }: TextInferenceParams): Promise<TextInferenceResponse> {
      const result = await RunAnywhere.generate(input);
      return { output: result.text };
    },
  };
}

if (!llamaCompat.downloadModel) {
  llamaCompat.downloadModel = async (modelId: string): Promise<void> => {
    await RunAnywhere.downloadModel(modelId);
  };
}

if (!llamaCompat.loadModel) {
  llamaCompat.loadModel = async (modelId: string): Promise<void> => {
    await RunAnywhere.loadModel(modelId);
  };
}

export const inferenceText = async (
  params: TextInferenceParams
): Promise<TextInferenceResponse> => {
  return runAnywhereCompat.inference!.text(params);
};

export const downloadLlamaModel = async (modelId: string): Promise<void> => {
  await llamaCompat.downloadModel!(modelId);
};

export const loadLlamaModel = async (modelId: string): Promise<void> => {
  await llamaCompat.loadModel!(modelId);
};
