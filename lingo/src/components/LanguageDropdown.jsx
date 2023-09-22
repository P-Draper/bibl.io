import React, { Component } from 'react';

class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedLanguage: '🇺🇸 | English',
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  selectLanguage = (language) => {
    this.setState({
      selectedLanguage: language,
      isOpen: false,
    });

    this.props.onLanguageChange(language);
  };

  render() {
    const { isOpen, selectedLanguage } = this.state;
    const languages = [
      '🇺🇸 | English',
      '🇪🇸 | Español',
      '🇫🇷 | Français',
      '🇩🇪 | Deutsch',
      '🇯🇵 | 日本語',
      '🇷🇺 | Русский',
      '🇸🇦 | عربى',
      '🇮🇳 | हिंदी',
      '🇵🇹 | Português',
      '🇨🇳 | 中文',
    ];

    return (
      <div className="language-dropdown">
        <div className="dropdown-button-container">
          <button className="dropdown-button" onClick={this.toggleDropdown}>
            {selectedLanguage} &#9660;
          </button>
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            {languages.map((language) => (
              <li
                key={language}
                onClick={() => this.selectLanguage(language)}
                className="language-item"
              >
                {language}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default LanguageDropdown;
