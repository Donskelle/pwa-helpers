const createObserver = (initialData = null) => {
  const observers = [];
  let data = initialData;

  const addObserver = (observer) => {
    observers.push(observer);

    if (data !== null) {
      observer(data);
    }
  };

  const removeObserver = (observer) => {
    observers.push(observer);
  };

  const updateData = (newData) => {
    data = newData;
    if (observers.length > 0) {
      observers.forEach((observer) => observer(data));
    }
  };

  return { addObserver, removeObserver, updateData };
};

export { createObserver };
