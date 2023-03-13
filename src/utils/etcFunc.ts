export const dateToString = (data: Date | null) => {
    if (data === null) {
      data = new Date();
    }
  
    const year: number = data.getFullYear();
    const month: number = data.getMonth() + 1;
    const date: number = data.getDate();
  
    return `${year}-${("0" + month).slice(-2)}-${("0" + date).slice(-2)}`;
  }
  
  