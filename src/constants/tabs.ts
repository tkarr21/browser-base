import { getWebUIURL } from '~/common/webui';

export const NEWTAB_URL = getWebUIURL('newtab');
//changed from NEWTAB_URL to task page development url
export const defaultTabOptions: chrome.tabs.CreateProperties = {
  url: 'http://localhost:3000/',
  active: true,
};
