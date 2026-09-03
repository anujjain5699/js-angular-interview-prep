//  Implement **parallelLimit**

//     Create a function that runs promise-returning tasks with limited concurrency.

//     jsx
//     const tasks = [
//       () => new Promise(resolve => setTimeout(() => resolve(1), 1000)),
//       () => new Promise(resolve => setTimeout(() => resolve(2), 500)),
//       () => new Promise(resolve => setTimeout(() => resolve(3), 100)),
//       () => new Promise(resolve => setTimeout(() => resolve(4), 800))
//     ];

//     const results = await parallelLimit(tasks, 2);
//     console.log(results); // [2, 3, 1, 4]

async function parallelLimit(tasks, limit) {
  const results = [];
  let currrentIndex = 0;

  async function worker() {
    while (currrentIndex < tasks.length) {
      const taskIndex = currrentIndex++;
      const result = await tasks[taskIndex]();
      results.push(result);
    }
  }

  // const workers = [];
  // let workerIndex = 0;

  // while (workerIndex < workerCount) {
  //   workers.push(worker());
  //   workerIndex++;
  // }
  //better we perform below operation 

  const workerCount = Math.min(limit, tasks.length);
  const workers = Array.from({ length: workerCount }).map(() => worker());
  await Promise.all(workers);
  return results;
}

const tasks = [
  () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  () => new Promise((resolve) => setTimeout(() => resolve(2), 500)),
  () => new Promise((resolve) => setTimeout(() => resolve(3), 100)),
  () => new Promise((resolve) => setTimeout(() => resolve(4), 800)),
];

async function main() {
  console.log("Starting tasks with limit = 2...");
  const start = Date.now();
  const results = await parallelLimit(tasks, 2);
  console.log("Results:", results); // Expected: [2, 3, 1, 4]
  console.log(`Finished in ${Date.now() - start}ms`);
}

main();

/*
Explaination:
What is worker()?
Because worker is defined as an async function, calling worker() returns a single Promise representing that worker's entire lifetime (all its loop iterations):

async function worker() {
  while (currentIndex < tasks.length) {
    const res = await tasks[currentIndex++]();
    results.push(res);
  }
  // The worker Promise ONLY resolves when this while loop is COMPLETELY done!
}

2. When does each worker Promise finish?
Let's look at the timeline for both workers:

Worker 1:
0ms: Enters while loop -> starts Task 0.
1000ms: Task 0 finishes. Pushes 1.
1000ms: Checks while (currentIndex < tasks.length). It is false (no tasks left).
1000ms: Exits the while loop -> Worker 1's Promise resolves!

Worker 2:
0ms: Enters while loop (Iteration 1) -> starts Task 1.
500ms: Task 1 finishes. Pushes 2.
500ms: Still in loop (Iteration 2) -> starts Task 2.
600ms: Task 2 finishes. Pushes 3.
600ms: Still in loop (Iteration 3) -> starts Task 3.
1400ms: Task 3 finishes. Pushes 4.
1400ms: Checks while (currentIndex < tasks.length). It is false.
1400ms: Exits the while loop -> Worker 2's Promise resolves!

3. What does Promise.all([worker1, worker2]) do?
Promise.all does not care how many tasks each individual worker did. It simply waits for all given promises in the array to complete.

Timeline:
0ms ------------------------------------------------------------------------>
      Worker 1 is busy (Task 0)
      Worker 2 is busy (Task 1, then Task 2, then Task 3)
1000ms: Worker 1 finishes its entire while loop!
        (Promise.all says: "Worker 1 is done, but Worker 2 is still running. I'll keep waiting...")
1400ms: Worker 2 finishes its entire while loop!
        (Promise.all says: "Both Worker 1 and Worker 2 are done! We can continue!")
*/
