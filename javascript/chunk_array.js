/**
Implement **chunk array**
   
Split an array into fixed-size subarrays.
    
chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]

 */

function chunk(arr, size){
     // Input validation
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (size <= 0) {
        throw new RangeError('Size must be a positive integer');
    }

    let final=[]
    for(let i=0;i<arr.length;){
        //although it can work without min function but added for better clarity of implementation
        let chunked = arr.slice(i, Math.min(i+size,arr.length))
        final.push(chunked)
        i+=size
    }
    console.log(final)
}

chunk([1, 2, 3, 4, 5,6,7,8,9], 2);