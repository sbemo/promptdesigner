import configData from '../../config.yaml';

interface Config {
  api: {
    baseUrl: string;
    key: string;
  };
  prompts: {
    analyzer: {
      role: string;
      content: string;
    };
    generator: {
      role: string;
      content: string;
    };
  };
  model: {
    name: string;
    settings: {
      analyzer: {
        temperature: number;
        top_p: number;
      };
      generator: {
        temperature: number;
        top_p: number;
        max_tokens: number;
      };
    };
  };
}

const config = configData as Config;

export default config; 