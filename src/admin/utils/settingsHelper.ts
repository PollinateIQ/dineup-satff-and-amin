export const getRestaurantSettings = async () => {
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    name: 'My Restaurant',
    description: 'A great place to eat',
    logo: 'https://example.com/path-to-your-logo.png', // Update this with your actual logo URL
    coverImage: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    fontFamily: 'Arial, sans-serif',
    customCSS: '',
  };
};