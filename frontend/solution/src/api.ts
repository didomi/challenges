import { IConsent, IConsentCreate } from './features/consent/contracts';

export interface IApi {
  allConsents(): Promise<IConsent[]>;

  createConsent(payload: IConsentCreate): Promise<{ id: string }>;
}

class LocalStorage implements IApi {
  private static readonly KEY = 'consents';

  async allConsents(): Promise<IConsent[]> {
    await LocalStorage.delay();

    return LocalStorage.load();
  }

  async createConsent(payload: IConsentCreate): Promise<{ id: string }> {
    await LocalStorage.delay();

    const item = {
      ...payload,
      id: Date.now().toString()
    };

    const data = LocalStorage.load();
    data.unshift(item);

    localStorage.setItem(LocalStorage.KEY, JSON.stringify(data));

    return { id: item.id };
  }

  private static load() {
    const data = localStorage.getItem(LocalStorage.KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as IConsent[];
    } catch (e) {
      return [];
    }
  }

  private static delay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new LocalStorage();
