import { renderApp, userEvent, screen } from '~/testing/utils';
import { ChangeColorScheme } from '../ChangeColorScheme';

describe('ChangeColorScheme', () => {
  it('renders the correct title and icon based on the color scheme', async () => {
    const user = userEvent.setup();

    renderApp(<ChangeColorScheme />);

    await user.click(screen.getByLabelText('Turn on the light'));
    expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Turn off the light'));
    expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
  });
});
