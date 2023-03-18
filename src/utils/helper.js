const generateRoboHashUrls = (totalCount) => {
    const urls = [];
    for (let i = 0; i < totalCount; i++) {
      const randomNumber = Math.floor(Math.random() * 100);
      urls.push(`https://robohash.org/${randomNumber}`);
    }
    return urls;
  };
  
  export const generateBoxesHelper = async (gameData) => {
    const { mode, type } = gameData;
    let boxCount = 6;
    let min, max;
  
    if (mode === 'medium') boxCount = 8;
    if (mode === 'hard') boxCount = 10;
  
    if (type === 'numbers') {
      min = 1;
      max = 100;
    } else if (type === 'letters') {
      min = 65; // ASCII value for 'A'
      max = 90; // ASCII value for 'Z'
    }
  
    let values = [];
    if (type === 'numbers' || type === 'letters') {
      try {
        const response = await fetch(
          `https://www.random.org/integers/?num=${boxCount}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new&unique=on`
        );
        const data = await response.text();
        type === 'numbers'
          ? (values = await data.trim().split('\n').map((num) => parseInt(num)))
          : (values = await data.trim().split('\n'));
      } catch (error) {
        console.log(error);
      }
    } else if (type === 'images') {
      values = generateRoboHashUrls(boxCount);
    }
  
    const cardValues = [...values, ...values];
    const boxes = cardValues.map((value, index) => ({
      value: type === 'letters' || type === 'alphabets' ? String.fromCharCode(value) : value,
      id: index,
      isFlipped: false,
      isFound: false,
    }));
    return boxes;
  };
  