import './Header.css';
import BarIcon from './BarIcon';
import logo from './../svg/logo.svg';

function Header({showStats, showRules}) {
    return (
        <div className="Header">
            <img id="logo" src={logo} alt='Logo'></img>
            <p>CountryConnect</p>
            <BarIcon name='stats' description="Results" isFirst={true} onClick={showStats}/>
            <BarIcon name='rules' description="Info & How to play" onClick={showRules} isLast={true}/>
      </div>
    )
}

export default Header;