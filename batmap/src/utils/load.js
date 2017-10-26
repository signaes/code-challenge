const load = path => {
  const script = document.createElement('script');
  const firstScript = document.getElementsByTagName('script')[0];

  script.src = path;
  firstScript.parentNode.insertBefore(script, firstScript);

  return new Promise((resolve, reject) => {
    script.onload = () => 'google' in window ? resolve(window.google) : reject(new Error('something went wrong'));
    script.onerror = () => reject(new Error('The script could not be loaded'));
  });
};

export default load;
