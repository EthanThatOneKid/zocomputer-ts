import { createClient as createGeneratedClient } from './generated/client/index.js';
import type { Client, Config } from './generated/client/index.js';

const DEFAULT_BASE_URL = 'https://api.zo.computer';

export type ZoClientConfig = Config;

export function createClient(config: ZoClientConfig = {}): Client {
  return createGeneratedClient({
    baseUrl: DEFAULT_BASE_URL,
    ...config,
  });
}
