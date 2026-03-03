import useTheme from '../../context/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  );
}
