/*
Create a fetch function with **autoRetry**
    
Automatically retry the request when an error occurs until the maximum retry count is reached.
*/

async function autoRetry(maxRetry = 3) {
  let retryCount = 0;

  while (retryCount <= maxRetry) {
    try {
      const response = await fetch("https://dummyjson.com/productff");

      if (response.ok) {
        return response;
      }

      if (retryCount >= maxRetry) {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      if (retryCount >= maxRetry) {
        throw error;
      }
    }
    retryCount++;
    await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
  }
  throw new Error("Request failed after all retry attempts");
}

const result = await autoRetry();
console.log(result);
