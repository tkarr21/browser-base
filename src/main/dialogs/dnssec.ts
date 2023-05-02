import { BrowserWindow } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN, VIEW_Y_OFFSET } from '~/constants/design';

export const showDnssecDialog = (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
  info: {
    status: string;
    ignored: boolean;
    host: string;
  },
) => {
  const appWindow =
    Application.instance.windows.fromBrowserWindow(browserWindow);

  const dialog = Application.instance.dialogs.show({
    name: 'dnssec',
    browserWindow,
    getBounds: () => {
      return {
        width: 500,
        height: 305,
        x: x - 500 + DIALOG_MARGIN,
        y: VIEW_Y_OFFSET,
      };
    },
    tabAssociation: {
      tabId: appWindow.viewManager.selectedId,
      getTabInfo: (tabId) => {
        const tab = appWindow.viewManager.views.get(tabId);
        return tab.dnssecStatusInfo;
      },
    },

    onWindowBoundsUpdate: (disposition) => {
      if (disposition === 'resize') dialog.rearrange();
    },
  });

  if (!dialog) return;
};
