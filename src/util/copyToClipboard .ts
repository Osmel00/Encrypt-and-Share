export const copyToClipboard = async (str:string) => {
    try {
      await navigator.clipboard.writeText(str);
      console.log("copied");
    } catch (error) {
      console.log(error);
    }
  };