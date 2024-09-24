export enum DECRYPTION_WORKER_ACTION_NAME {
  DECRYPT = 'DECRYPT',
  FIND_QMC_MUSICEX_NAME = 'FIND_QMC_MUSICEX_NAME',
  KUWO_PARSE_HEADER = 'KUWO_PARSE_HEADER',
  QINGTING_FM_GET_DEVICE_KEY = 'QINGTING_FM_GET_DEVICE_KEY',
  VERSION = 'VERSION',
}

export interface DecryptionResult {
  decrypted: string; // blob uri
  ext: string;
}
