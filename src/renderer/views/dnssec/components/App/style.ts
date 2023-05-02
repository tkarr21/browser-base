import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { DialogStyle } from '~/renderer/mixins/dialogs';

export const StyledApp = styled(DialogStyle)`
  padding: 8px 16px 16px 16px;

  ${({ theme }: { theme?: ITheme }) => css`
    color: ${theme['dialog.lightForeground'] ? '#999' : '#000'};
  `}
  color: #666;
`;

export const Label = styled.div`
  font-size: 22px;
  min-width: 45px;
  text-align: center;
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & .button:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const StatusImage = styled.img`
  max-width: 64px;
`;

export const StatusHost = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const colors: { [status: string]: string } = {
  secure: '#009603',
  insecure: '#0055f8',
  bogus: '#e53330',
};
export const StatusText = styled.span`
  ${({ status }: { status?: string }) => css`
    color: ${colors[status] || '#000'};
  `}
  font-weight: bold;
`;

export const Button = styled.div`
  ${({
    size,
    icon,
    theme,
  }: {
    size: number;
    icon: string;
    theme?: ITheme;
  }) => css`
    ${centerIcon(size)};
    background-image: url(${icon});
    filter: ${theme['dialog.lightForeground'] ? 'invert(100%)' : 'none'};
  `}

  width: 24px;
  height: 24px;
  opacity: 0.54;
  position: relative;

  &:after {
    background-color: rgba(0, 0, 0, 0.08);
    content: '';
    position: absolute;
    border-radius: 50%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: 0.2s opacity;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;
