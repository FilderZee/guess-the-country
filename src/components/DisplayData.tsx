import { useEffect, useState } from "react";
import DisplayDataCSS from "./DisplayData.module.css";

const DisplayData = () => {
    const [countryNameInput, setCountryNameInput] = useState<string>(""); 
    const [countryName, setCountryName] = useState<string>("");
    const [countryCapital, setCountryCapital] = useState<string>("");
    const [countryPopulation, setCountryPopulation] = useState<number>(0);
    const [countryCode, setCountryCode] = useState<string>("");
    const [flag, setFlag] = useState<string>("");   

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountryNameInput(event.target.value);
    };

    useEffect(() => {
        if (countryNameInput) {  // Fetchni to jen dyž tam něco je
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://restcountries.com/v3.1/name/${countryNameInput}`);
                    const data = await response.json();
    

                    const matchingCountry = data.find((country: any) =>
                        country.name.common.toLowerCase().startsWith(countryNameInput.toLowerCase())
                    );
    
                    if (matchingCountry) {
                        setCountryName(matchingCountry.name.common);
                        setCountryCapital(matchingCountry.capital ? matchingCountry.capital[0] : "N/A");
                        setCountryPopulation(matchingCountry.population);
                        setCountryCode(matchingCountry.cca2);
                        setFlag(`https://flagcdn.com/${matchingCountry.cca2.toLowerCase()}.svg`);
                    }
                } catch (error) {
                    console.error("Error fetching country data:", error);
                }
            };
            fetchData();
        }
    }, [countryNameInput]);
    

    return (
        <div className={DisplayDataCSS.main__container}>
            <div className={DisplayDataCSS.input__container}>
              <input
                value={countryNameInput}
                onChange={handleInputChange}
                className={DisplayDataCSS.input}
                placeholder="Input a country name"
                type="text"
              />
            </div>
            <div className={DisplayDataCSS.container}>
                <div className={DisplayDataCSS.country__info__container}>
                    <h1 className={DisplayDataCSS.country__name}>{countryName}</h1>
                    <p className={DisplayDataCSS.country__info}><b>Capital city: </b> {countryCapital}</p>
                    <p className={DisplayDataCSS.country__info}><b>Population: </b> {countryPopulation}</p>
                    <p className={DisplayDataCSS.country__info}><b>Country Code: </b> {countryCode}</p>
                </div>
                <div className={DisplayDataCSS.flag__container}>
                {flag && <img src={flag} alt="flag" className={DisplayDataCSS.flag} />}
                </div>
            </div>
        </div>
    );
};

export default DisplayData;
