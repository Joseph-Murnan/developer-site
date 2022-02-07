import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Theme, { ThemeProvider } from './theme';
import Palette from '../components/ui/Palette';

describe('Theme context tests.', () => {
    test('Check that the theme context defaults to blueTheme.', () => {
        render(
            <ThemeProvider>
                <Palette />
                <Theme.Consumer>
                    { ctx => <div>{ ctx.theme }</div> }
                </Theme.Consumer>
            </ThemeProvider>
        );
        const defaultOutput = screen.getByText('blueTheme');
        expect(defaultOutput).toBeTruthy();
    });
    test('Check that the redTheme button changes our theme context.', () => {
        render(
            <ThemeProvider>
                <Palette />
                <Theme.Consumer>
                    { ctx => <div>{ ctx.theme }</div> }
                </Theme.Consumer>
            </ThemeProvider>
        );
        const redThemeBtn = screen.getByRole('button', { name: 'redTheme' });
        userEvent.click(redThemeBtn);
        const redOutput = screen.getByText('redTheme');
        expect(redOutput).toBeTruthy();
    });
});
