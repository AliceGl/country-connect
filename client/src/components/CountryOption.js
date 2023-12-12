import './CountryOption.css'

function CountryOption({ name, handleClick }) {
    return (
        <div className='countryOption' onClick={handleClick}>{name}</div>
    )
}

export default CountryOption;