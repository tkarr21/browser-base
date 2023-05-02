import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import {
  StyledApp,
  Spacer,
  Label,
  StatusImage,
  StatusHost,
  Button,
  StatusText,
} from './style';
import store from '../../store';
import { UIStyle } from '~/renderer/mixins/default-styles';

import {
  ICON_DNSSEC_SECURE,
  ICON_DNSSEC_INSECURE,
  ICON_DNSSEC_BOGUS,
  ICON_CLOSE,
} from '~/renderer/constants';

interface IPopupContent {
  label?: string;
  icon?: string;
  description?: string;
}

const content: IPopupContent[] = [
  {
    label: 'secure',
    icon: ICON_DNSSEC_SECURE,
    description:
      'The IP address received for this host successfully validated as one of the published IP addresses for this host.',
  },
  {
    label: 'insecure',
    icon: ICON_DNSSEC_INSECURE,
    description:
      'We are unable to validate the IP address received for this host becuase the host does not have any IP addresses securely published with DNSSEC.',
  },
  {
    label: 'bogus',
    icon: ICON_DNSSEC_BOGUS,
    description:
      'The IP address received for this host did not validate as one of the published IP addresses for this host. We advise extreme caution while interacting with this site.',
  },
];

const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Escape') {
    store.hide();
  }
};

const getPopupContent = (status: string): IPopupContent => {
  return content.find((item) => item.label === status);
};

export const App = observer(() => {
  let statusContent = getPopupContent(store.dnssecStatusInfo.status);

  return (
    <ThemeProvider
      theme={{ ...store.theme, dark: store.theme['dialog.lightForeground'] }}
    >
      <UIStyle />
      <StyledApp onKeyUp={onKeyUp}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <Button onClick={() => store.hide()} icon={ICON_CLOSE} size={16} />
          </div>
          <Label>DNSSEC Status Indicator</Label>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
            }}
          >
            <StatusImage src={statusContent.icon} />
          </div>
          <div>
            <StatusHost>Host:</StatusHost> {store.dnssecStatusInfo.host}
          </div>
          <div>
            <StatusHost>Status:</StatusHost>{' '}
            <StatusText status={store.dnssecStatusInfo.status}>
              {store.dnssecStatusInfo.status}
            </StatusText>
          </div>
          <hr />
          <div>{statusContent.description}</div>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
});
