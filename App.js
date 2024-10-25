import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountryInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const randomCountry = response.data[Math.floor(Math.random() * response.data.length)];
      setInfo(randomCountry);
      setCountry(randomCountry.name.common);
    } catch (err) {
      setError('Não foi possível buscar a informação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryInfo(); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Curiosidades sobre Cidades</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {info && (
        <View style={styles.infoContainer}>
          <Text style={styles.country}>{country}</Text>
          <Text>População: {info.population}</Text>
          <Text>Capital: {info.capital ? info.capital[0] : 'N/A'}</Text>
          <Text>Região: {info.region}</Text>
          <Text>Língua(s): {Object.values(info.languages).join(', ')}</Text>
        </View>
      )}
      <Button title="Outra Curiosidade" onPress={fetchCountryInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  loading: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  country: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;