import { ipcRenderer } from 'electron';
import { reaction, observable, computed, makeObservable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';
import { IDnssecStatus } from '~/interfaces/dnssec-status';

export class Store extends DialogStore {
  // Observable
  public tabId = -1;

  public tabsDnssecStatusInfo = new Map<number, IDnssecStatus>();

  public dnssecStatusInfo = {
    status: 'insecure',
    ignored: false,
    host: '',
  } as IDnssecStatus;

  @computed
  public get dohServer() {
    return this.settings.dohServers[this.settings.dohServer];
  }

  public constructor() {
    super();

    makeObservable(this, {
      tabId: observable,
      tabsDnssecStatusInfo: observable,
      dnssecStatusInfo: observable,
    });

    this.init();

    this.onUpdateTabInfo = (tabId, info) => {
      this.tabId = tabId;
      this.dnssecStatusInfo = info;
    };
  }

  public async init() {
    const statusChange = reaction(
      () => this.dnssecStatusInfo,
      () => console.log(`DNSSEC status changed to ${this.dnssecStatusInfo}`),
    );
  }
}

export default new Store();
