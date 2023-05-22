import { ipcRenderer } from 'electron';
import { parse } from 'url';
import store from '../store';
import { IDnssecStatus } from '~/interfaces/dnssec-status';
import { domains } from '~/constants/domains';

export const getDnssecStatus = (url: string): any => {
  let status = 'insecure';
  let error_code = 0;

  let { hostname } = parse(url);

  if (hostname.includes('localhost')) {
    if (url.includes('bank')) {
      hostname = domains.bank.domain;
      status = domains['bank'].status;
    } else if (url.includes('downloading')) {
      hostname = domains.downloading.domain;
      status = domains['downloading'].status;
      error_code = 6;
    } else if (url.includes('email')) {
      hostname = domains.email.domain;
      status = domains['email'].status;
    } else if (url.includes('online-shop')) {
      hostname = domains['online-shop'].domain;
      status = domains['online-shop'].status;
    } else if (url.includes('pay-bill')) {
      hostname = domains['pay-bill'].domain;
      status = domains['pay-bill'].status;
      error_code = 7;
    } else if (url.includes('read-wiki')) {
      hostname = domains['read-wiki'].domain;
      status = domains['read-wiki'].status;
    } else if (url.includes('recipe')) {
      hostname = domains.recipe.domain;
      status = domains.recipe.status;
      error_code = 7;
    } else if (url.includes('trading')) {
      hostname = domains.trading.domain;
      status = domains.trading.status;
    } else if (url.includes('weather')) {
      hostname = domains.weather.domain;
      status = domains.weather.status;
    } else {
      status = 'secure';
    }
  }

  return {
    status,
    ignored: false,
    host: hostname,
    url: url,
    edns_error: error_code,
  } as IDnssecStatus;
};
