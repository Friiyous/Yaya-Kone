
export interface SyncAction {
  id: string;
  type: 'ATTENDANCE' | 'HOMEWORK' | 'SUBMISSION';
  payload: any;
  timestamp: number;
}

const SYNC_KEY = 'edci_pending_sync';

export const syncManager = {
  // Ajouter une action à la file d'attente de synchronisation
  addToQueue: (type: SyncAction['type'], payload: any) => {
    const queue: SyncAction[] = JSON.parse(localStorage.getItem(SYNC_KEY) || '[]');
    const newAction: SyncAction = {
      id: payload.id || Math.random().toString(36).substr(2, 9),
      type,
      payload,
      timestamp: Date.now()
    };
    queue.push(newAction);
    localStorage.setItem(SYNC_KEY, JSON.stringify(queue));
    console.log(`Action ${type} ajoutée à la file d'attente hors-ligne.`);
  },

  // Récupérer toute la file d'attente
  getQueue: (): SyncAction[] => {
    return JSON.parse(localStorage.getItem(SYNC_KEY) || '[]');
  },

  // Vérifier si un ID spécifique est en attente de synchro
  isPending: (id: string): boolean => {
    const queue = syncManager.getQueue();
    return queue.some(action => action.payload.id === id);
  },

  // Synchroniser les actions en attente avec le "serveur"
  processQueue: async () => {
    const queue: SyncAction[] = JSON.parse(localStorage.getItem(SYNC_KEY) || '[]');
    if (queue.length === 0) return;

    console.log(`Début de la synchronisation de ${queue.length} actions...`);
    
    // Simulation d'appels API pour chaque action
    for (const action of queue) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulation latence
        console.log(`Synchronisé : ${action.type} (${action.id})`);
      } catch (err) {
        console.error(`Échec de synchro pour ${action.id}`, err);
      }
    }

    localStorage.removeItem(SYNC_KEY);
    return queue.length;
  },

  getQueueSize: () => {
    const queue = JSON.parse(localStorage.getItem(SYNC_KEY) || '[]');
    return queue.length;
  }
};
