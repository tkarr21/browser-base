import { BrowserWindow } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';
import { PersistentDialog } from './dialog';
import { ERROR_PROTOCOL, DNSSEC_BOGUS_HOST } from '~/constants/files';
import { domains } from '~/constants/domains';

const HEIGHT = 256;

export class PreviewDialog extends PersistentDialog {
  public visible = false;
  public tab: { id?: number; x?: number; y?: number } = {};

  constructor() {
    super({
      name: 'preview',
      bounds: {
        height: HEIGHT,
      },
      hideTimeout: 150,
    });
  }

  public rearrange() {
    const { width } = this.browserWindow.getContentBounds();
    super.rearrange({ width, y: this.tab.y });
  }

  public async show(browserWindow: BrowserWindow) {
    super.show(browserWindow, false);

    const { id, url, title, errorURL, dnssecStatusInfo } =
      Application.instance.windows
        .fromBrowserWindow(browserWindow)
        .viewManager.views.get(this.tab.id);

    let url_switch = url;
    if (url_switch.includes(DNSSEC_BOGUS_HOST)) {
      url_switch = dnssecStatusInfo.url;
    }

    if (url_switch.includes('localhost')) {
      if (url_switch.includes('bank')) {
        url_switch = `https://${domains.bank.domain}`;
      } else if (url_switch.includes('downloading')) {
        url_switch = `https://${domains.downloading.domain}`;
      } else if (url_switch.includes('email')) {
        url_switch = `https://${domains.email.domain}`;
      } else if (url_switch.includes('online-shop')) {
        url_switch = `https://${domains['online-shop'].domain}`;
      } else if (url_switch.includes('pay-bill')) {
        url_switch = `https://${domains['pay-bill'].domain}`;
      } else if (url_switch.includes('read-wiki')) {
        url_switch = `https://${domains['read-wiki'].domain}`;
      } else if (url_switch.includes('recipe')) {
        url_switch = `https://${domains.recipe.domain}`;
      } else if (url_switch.includes('trading')) {
        url_switch = `https://${domains.trading.domain}`;
      } else if (url_switch.includes('weather')) {
        url_switch = `https://${domains.weather.domain}`;
      }
    }
    this.send('visible', true, {
      id,
      url: url.startsWith(`${ERROR_PROTOCOL}://`)
        ? errorURL.includes(DNSSEC_BOGUS_HOST)
          ? url_switch
          : errorURL
        : url_switch,
      title,
      x: this.tab.x - 8,
    });
  }

  public hide(bringToTop = true) {
    super.hide(bringToTop);
  }
}
