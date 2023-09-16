export const mergeObjects = (obj1: any, obj2: any) => {
    const result:any = { ...obj1 };
    for (const key of Object.keys(obj2)) {
      if (typeof result[key] != "string" && result[key]) {
        result[key] = Number((result[key] + obj2[key]).toFixed(2));
      } else {
        result[key] = obj2[key];
      }
    }
    return result;
}

export const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

