const createObserver = <Type>(initialData: Type) => {
  const observers: ((params: Type) => void)[] = [];
  let currentObserverData: Type = initialData;

  const addObserver = (observer: (data: Type) => void) => {
    observers.push(observer);

    if (currentObserverData != null) {
      observer(currentObserverData);
    }
  };

  const removeObserver = (observer: (data: Type) => void) => {
    observers.push(observer);
  };

  const updateData = (newData: Type) => {
    currentObserverData = newData;
    if (observers.length > 0) {
      observers.forEach((observer) => observer(newData));
    }
  };

  return { addObserver, removeObserver, updateData };
};

export { createObserver };
