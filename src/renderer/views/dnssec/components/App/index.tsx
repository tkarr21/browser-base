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
  source?: string;
}

const content: IPopupContent[] = [
  {
    label: 'secure',
    icon: ICON_DNSSEC_SECURE,
    description:
      'The address received for this host successfully validated as one of the published addresses for this host.',
    source:
      'https://drive.google.com/uc?export=download&id=1ycU5W-vyixzcg22_3XNI1SIdqKjptioE', //https://drive.google.com/file/d/1ycU5W-vyixzcg22_3XNI1SIdqKjptioE/view?usp=sharing
  },
  {
    label: 'insecure',
    icon: ICON_DNSSEC_INSECURE,
    description:
      'We are unable to validate the address received for this host becuase the host does not offer address validation.',
    source:
      'https://drive.google.com/uc?export=download&id=1dU4mz3AouAwz2jKT1FTE2rlz8-fVeoGP', //https://drive.google.com/file/d/1dU4mz3AouAwz2jKT1FTE2rlz8-fVeoGP/view?usp=sharing
  },
  {
    label: 'bogus',
    icon: ICON_DNSSEC_BOGUS,
    description:
      'The address received for this host failed validation. We advise caution while interacting with this site.',
    source:
      'https://drive.google.com/uc?export=download&id=1OpqpDsKqvYRIc-zHIYtBQ9k05vHSngSe',
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

  // inject different description for different edns_error
  if (store.dnssecStatusInfo.edns_error == 7) {
    statusContent.description =
      "The signatures for securing the host's addresses have expired. This is typically caused by a misconfiguration and does not necessarily indicate an active attack.";
  }

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
          <video
            width="100%"
            height="auto"
            controls
            autoPlay
            muted
            src={statusContent.source}
          />
        </div>
      </StyledApp>
    </ThemeProvider>
  );
});
