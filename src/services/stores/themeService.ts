const themeKey = 'ac_theme';
const darkThemeKey = 'theme_dark';
const lightThemeKey = 'theme_light';

class ThemeService {
  private _isDarkTheme?: boolean = undefined;

  get isDarkTheme(): boolean {
    return this._isDarkTheme;
  }

  private _themeSelector = document.querySelector('html');

  setIsDarkTheme = (isDark: boolean): void => {
    this._isDarkTheme = isDark;
  };

  changeTheme = (isDark: boolean): void => {
    if (isDark) {
      localStorage[themeKey] = darkThemeKey;
      this._themeSelector.classList.add('dark');
      this._themeSelector.classList.add('bg-dark');
      this.setIsDarkTheme(true);
    } else if (!isDark) {
      localStorage[themeKey] = lightThemeKey;
      this._themeSelector.classList.remove('dark');
      this._themeSelector.classList.remove('bg-dark');
      this.setIsDarkTheme(false);
    }
  };

  constructor() {

    const globalThemeEntity = window.matchMedia('(prefers-color-scheme: dark)');

    if (globalThemeEntity) {
      const isSetDefaultDarkTheme = globalThemeEntity.matches;
      const isDarkTheme = localStorage[themeKey]
        ? localStorage[themeKey] === darkThemeKey
        : isSetDefaultDarkTheme;

      isDarkTheme ? this.setIsDarkTheme(true) : this.setIsDarkTheme(false);

      globalThemeEntity.addEventListener('change', (e) => {
        e.matches ? this.setIsDarkTheme(true) : this.setIsDarkTheme(false);
      });
    }
  }
}

const themeService = new ThemeService();

export { themeService };
