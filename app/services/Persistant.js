
  Save = async (key, value) => {
	try {
      await AsyncStorage.setItem(key, value);
	} catch (error) {
	  // Error saving data 
	}
  };

  get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      // Error retrieving data
    }
  };