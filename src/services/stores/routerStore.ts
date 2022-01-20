import { History, Path, UnregisterCallback } from 'history';
import { action, makeObservable, observable, observe } from 'mobx';

type RouterStoreHistory<T> = History<T> & {
  subscribe: (t1: any, t2: any) => any;
  unsubscribe: UnregisterCallback;
};
export class RouterStore {
  location: string | null = null;

  history: RouterStoreHistory<any>;

  constructor() {
    this.push = this.push.bind(this);
    this.replace = this.replace.bind(this);
    this.go = this.go.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    makeObservable(this, {
      location: observable,
      _updateLocation: action,
    });
  }

  _updateLocation(newState: string) {
    this.location = newState;
  }

  /*
   * History methods
   */
  push = (path: Path, state?: Record<string, any>) => {
    this.history?.push(path, state);
  };
  replace = (location: string, state?: Record<string, any>) => {
    this.history?.replace(location, state);
  };
  go = (n: number) => {
    this.history?.go(n);
  };
  goBack = () => {
    this.history?.goBack();
  };
  goForward = () => {
    this.history?.goForward();
  };
}

const syncHistoryWithStore = (history: History<unknown>, store: any) => {
  // Initialise store
  store.history = history;

  // Handle update from history object
  const handleLocationChange = (location: any) => {
    store._updateLocation(location);
  };

  const unsubscribeFromHistory = history.listen(handleLocationChange);
  handleLocationChange(history.location);

  store.history.subscribe = (listener: (t1: any, t2: any) => any) => {
    const onStoreChange = () => {
      const rawLocation = { ...store.location };
      listener(rawLocation, history.action);
    };

    // Listen for changes to location state in store
    const unsubscribeFromStore = observe(store, 'location', onStoreChange);

    listener(store.location, history.action);

    return unsubscribeFromStore;
  };
  store.history.unsubscribe = unsubscribeFromHistory;

  return store.history;
};

const routerStore = new RouterStore();

export { syncHistoryWithStore };
export default routerStore;
