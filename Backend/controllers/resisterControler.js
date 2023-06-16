const { User, Country, State, City } = require("../models/user");

const resgisterData = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already in use",
      });
    }

    if (!country) {
      return res.json({
        error: "Please select a country",
      });
    }

    if (!state) {
      return res.json({
        error: "Please select a state",
      });
    }

    if (!city) {
      return res.json({
        error: "Please select a city",
      });
    }

    if (age < 14) {
      return res.json({
        error: "Age must be greater than 14",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const data = [
  {
    country: "USA",
    states: [
      {
        state: "California",
        cities: [
          "Los Angeles",
          "San Francisco",
          "San Diego",
          "Sacramento",
          "San Jose",
        ],
      },
      {
        state: "Texas",
        cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
      },
      {
        state: "New York",
        cities: [
          "New York City",
          "Buffalo",
          "Rochester",
          "Yonkers",
          "Syracuse",
        ],
      },
      {
        state: "Florida",
        cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
      },
      {
        state: "Illinois",
        cities: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford"],
      },
    ],
  },
  {
    country: "Canada",
    states: [
      {
        state: "Ontario",
        cities: ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton"],
      },
      {
        state: "Quebec",
        cities: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
      },
      {
        state: "British Columbia",
        cities: ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford"],
      },
      {
        state: "Alberta",
        cities: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert"],
      },
      {
        state: "Manitoba",
        cities: [
          "Winnipeg",
          "Brandon",
          "Steinbach",
          "Portage la Prairie",
          "Thompson",
        ],
      },
    ],
  },
  {
    country: "Mexico",
    states: [
      {
        state: "Jalisco",
        cities: [
          "Guadalajara",
          "Zapopan",
          "Tlaquepaque",
          "Tonalá",
          "Puerto Vallarta",
        ],
      },
      {
        state: "Nuevo León",
        cities: [
          "Monterrey",
          "Guadalupe",
          "Apodaca",
          "San Nicolás de los Garza",
          "General Escobedo",
        ],
      },
      {
        state: "Puebla",
        cities: [
          "Puebla",
          "Tehuacán",
          "San Martín Texmelucan",
          "Atlixco",
          "Cholula",
        ],
      },
      {
        state: "Guanajuato",
        cities: ["León", "Irapuato", "Celaya", "Salamanca", "Guanajuato"],
      },
      {
        state: "Veracruz",
        cities: [
          "Veracruz",
          "Xalapa",
          "Coatzacoalcos",
          "Poza Rica de Hidalgo",
          "Córdoba",
        ],
      },
    ],
  },
  {
    country: "Brazil",
    states: [
      {
        state: "São Paulo",
        cities: [
          "São Paulo",
          "Guarulhos",
          "Campinas",
          "São Bernardo do Campo",
          "Santo André",
        ],
      },
      {
        state: "Rio de Janeiro",
        cities: [
          "Rio de Janeiro",
          "São Gonçalo",
          "Duque de Caxias",
          "Nova Iguaçu",
          "Niterói",
        ],
      },
      {
        state: "Minas Gerais",
        cities: [
          "Belo Horizonte",
          "Uberlândia",
          "Contagem",
          "Juiz de Fora",
          "Betim",
        ],
      },
      {
        state: "Bahia",
        cities: [
          "Salvador",
          "Feira de Santana",
          "Vitória da Conquista",
          "Camaçari",
          "Juazeiro",
        ],
      },
      {
        state: "Paraná",
        cities: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel"],
      },
    ],
  },
  {
    country: "Argentina",
    states: [
      {
        state: "Buenos Aires",
        cities: [
          "La Plata",
          "Mar del Plata",
          "Bahía Blanca",
          "Merlo",
          "Quilmes",
        ],
      },
      {
        state: "Córdoba",
        cities: [
          "Córdoba",
          "Río Cuarto",
          "Villa María",
          "San Francisco",
          "Villa Carlos Paz",
        ],
      },
      {
        state: "Santa Fe",
        cities: [
          "Rosario",
          "Santa Fe",
          "Venado Tuerto",
          "Rafaela",
          "Reconquista",
        ],
      },
      {
        state: "Mendoza",
        cities: [
          "Mendoza",
          "San Rafael",
          "Godoy Cruz",
          "Luján de Cuyo",
          "Maipú",
        ],
      },
      {
        state: "Tucumán",
        cities: [
          "San Miguel de Tucumán",
          "Tafí Viejo",
          "Yerba Buena",
          "Concepción",
          "Banda del Río Salí",
        ],
      },
    ],
  },
];

const setCountriesData = (req, res) => {
  data.forEach(async (countryData) => {
    // insert country
    const country = await Country.create({ name: countryData.country });

    // insert states
    countryData.states.forEach(async (stateData) => {
      const state = await State.create({
        name: stateData.state,
        country: country._id,
      });

      // insert cities
      stateData.cities.forEach(async (cityName) => {
        await City.create({
          name: cityName,
          state: state._id,
        });
      });
    });
  });
  return res.json(data);
};

const getCountry = async (req, res) => {
  const countries = await Country.find().sort({ name: 1 });
  res.json(countries);
};

const getState = async (req, res) => {
  const { country } = req.query;
  const states = await State.find({ country }).sort({ name: 1 });
  res.json(states);
};
const getCity = async (req, res) => {
  const { state } = req.query;
  const cities = await City.find({ state }).sort({ name: 1 });
  res.json(cities);
};

const getUser = async (req, res) => {
  const user = await User.find().sort({ name: 1 });
  res.json(user);
};

const getCountryName = async (req, res) => {
  try {
    const countryId = req.query.countryId;

    const country = await Country.findById(countryId);

    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.json(country.name);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStateName = async (req, res) => {
  try {
    const stateId = req.query.stateId;

    const state = await State.findById(stateId);

    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    res.json(state.name);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getCityName = async (req, res) => {
  try {
    const cityId = req.query.cityId;

    const city = await City.findById(cityId);

    if (!city) {
      return res.status(404).json({ error: "city not found" });
    }

    res.json(city.name);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  resgisterData,
  setCountriesData,
  getCountry,
  getState,
  getCity,
  getUser,
  getCountryName,
  getStateName,
  getCityName,
};
