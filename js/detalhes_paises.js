const countryName = new URLSearchParams(location.search).get('name');
const flagImage = $('.country-details img');
const countryNameH1 = $('.country-details h1');
const nativeName = $('.native-name');
const population = $('.population');
const region = $('.region');
const subRegion = $('.sub-region');
const capital = $('.capital');
const topLevelDomain = $('.top-level-domain');
const currencies = $('.currencies');
const languages = $('.languages');
const borderCountries = $('.border-countries');

$.ajax({
    url: 'https://restcountries.com/v3.1/all',
    method: 'GET',
    success: function(countries) {
        const country = countries.find(
            (c) => c.translations?.por?.common === countryName || c.name.common === countryName
        );

        if (!country) {
            console.error('País não encontrado!');
            return;
        }

       renderCountryDetails(country);
    },
    error: function(err) {
        console.error('Erro ao buscar países:', err);
    }
});

function renderCountryDetails(country) {
    flagImage.attr('src', country.flags.svg);
    
    const portugueseName = country.translations?.por?.common || country.name.common;
    countryNameH1.text(portugueseName);

    population.text(country.population.toLocaleString('pt-PT'));

    region.text(country.region || 'N/A');
    subRegion.text(country.subregion || 'N/A');

    capital.text(country.capital || 'N/A');

    topLevelDomain.text(country.tld.join(', '));

    // Nome Nativo (em Português, se disponível)
    nativeName.text(country.translations?.por?.official || portugueseName);

    // Moedas 
    currencies.text(country.currencies
        ? Object.values(country.currencies)
            .map((currency) => currency.name)
            .join(', ')
        : 'N/A');

    // Idiomas
    languages.text(country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A');

    // Países Fronteiros
    if (country.borders) {
        country.borders.forEach((border) => {
            $.ajax({
                url: `https://restcountries.com/v3.1/alpha/${border}`,
                method: 'GET',
                success: function(borderCountriesData) {
                    const borderCountry = borderCountriesData[0];
                    const borderCountryName = borderCountry.translations?.por?.common || borderCountry.name.common;
                    const borderCountryLink = `detalhes_paises.html?name=${encodeURIComponent(borderCountryName)}`;
                    borderCountries.append(`<a href="${borderCountryLink}">${borderCountryName}</a> `);
                }
            });
        });
    } else {
        borderCountries.append('Nenhum');
    }
}