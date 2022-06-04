const createObserver = (initialData = null) => {
  const observers: ((...params: any) => void)[] = [];
  let data: unknown = initialData;

  const addObserver = (observer: (...params: any[]) => void) => {
    observers.push(observer);

    if (data !== null) {
      observer(data);
    }
  };

  const removeObserver = (observer: (...params: any[]) => void) => {
    observers.push(observer);
  };

  const updateData = (newData: any) => {
    data = newData;
    if (observers.length > 0) {
      observers.forEach((observer) => observer(newData));
    }
  };

  return { addObserver, removeObserver, updateData };
};

export { createObserver };
