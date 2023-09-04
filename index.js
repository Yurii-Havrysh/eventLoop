console.log('Starting program');
//creating class with scheduling methods
class AsyncOperationManager {
    simulateAsyncOperation(delay) {
        setTimeout(() => {
            console.log('Hello from setTimeout')
        }, delay);
    }

    scheduleImmediate() {
        setImmediate(() => {
            console.log('Hello from setImmediate')
        }) 
    }
}

const example = new AsyncOperationManager();
example.scheduleImmediate(); //executes script after current poll phase completes

process.nextTick(() => {
    console.log('Hello from process.nextTick')
}); //runs callback after the rest of code and before event loop is allowed to continue

example.simulateAsyncOperation(0); //schedules running script after threshold in ms 

console.log('End of the program');

//So, the main thing for me is execution order:
//priority - method
//1 - process.nextTick
//2 - setImmediate
//3 - setTimeout

//In general, setImmediate is designed to have higher priority for immediate execution of code. 
//But some other factors like platform organization, event loop, micro tasks can influence its behavior.
//In this case we have event loop and it is not located within an input/output cycle, 
//so execution order of two timers is non-deterministic. 
//However if we put these two calls in i/o cycle, setImmediate always be first :)

