import {
  ButtonBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tooltip
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import { useLingui } from '@lingui/react/macro';
import { useAtom } from 'jotai';
import {
  usePopupState,
  bindTrigger,
  bindMenu
} from 'material-ui-popup-state/hooks';
import { localeAtom } from '~/atoms/localeAtom';
import { locales } from '~/locales/locales';

export function ChangeLocale() {
  const { t } = useLingui();
  const [currentLocale, setCurrentLocale] = useAtom(localeAtom);
  const menuState = usePopupState({
    variant: 'popover',
    popupId: 'change-locale'
  });

  const handleMenuItemClick = (locale: string) => () => {
    setCurrentLocale(locale);
  };

  return (
    <>
      <Tooltip title={t`Change language`} placement="left">
        <Paper component={ButtonBase} sx={{ p: 1 }} {...bindTrigger(menuState)}>
          <TranslateIcon />
        </Paper>
      </Tooltip>
      <Menu
        {...bindMenu(menuState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {Object.entries(locales).map(([locale, text]) => {
          const checked = currentLocale === locale;
          return (
            <MenuItem key={locale} onClick={handleMenuItemClick(locale)}>
              {checked && (
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
              )}
              <ListItemText inset={!checked}>{text}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
