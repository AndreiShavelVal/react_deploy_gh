
import { FaLaptop, FaTabletAlt, FaMobileAlt, FaMoon, FaSun } from 'react-icons/fa';
import useWindowSize from './hooks/useWindowSize';

const Header = ({ title, isDarkMode, toggleTheme }) => {
    const { width } = useWindowSize();

    return (
        <header className="Header">
            <h1>{title}</h1>
            <div className="headerActions">
                <div className="themeControl">
                    <span>Dark mode</span>
                    <button
                        className="themeToggle"
                        type="button"
                        role="switch"
                        aria-label="Dark mode"
                        aria-checked={isDarkMode}
                        onClick={toggleTheme}
                    >
                        <span className="themeToggleThumb">
                            {isDarkMode ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
                        </span>
                    </button>
                </div>
                <span className="deviceIcon" aria-hidden="true">
                    {width < 768 ? <FaMobileAlt />
                        : width < 992 ? <FaTabletAlt />
                            : <FaLaptop />}
                </span>
            </div>
        </header>
    )
}

export default Header
