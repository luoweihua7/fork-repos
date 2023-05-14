import { ConcurrentQueue } from '~/util/ConcurrentQueue';
import { WorkerClientBus } from '~/util/WorkerEventBus';
import { DECRYPTION_WORKER_ACTION_NAME } from './constants';

// TODO: Worker pool?
export const workerClient = new Worker(new URL('./worker', import.meta.url), { type: 'module' });

// FIXME: report the error so is obvious to the user.
workerClient.onerror = (err) => console.error(err);

class DecryptionQueue extends ConcurrentQueue<{ id: string; blobURI: string }> {
  constructor(private workerClientBus: WorkerClientBus<DECRYPTION_WORKER_ACTION_NAME>, maxQueue?: number) {
    super(maxQueue);
  }

  async handler(item: { id: string; blobURI: string }): Promise<void> {
    return this.workerClientBus.request(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, item.blobURI);
  }
}

export const workerClientBus = new WorkerClientBus<DECRYPTION_WORKER_ACTION_NAME>(workerClient);
export const decryptionQueue = new DecryptionQueue(workerClientBus);
