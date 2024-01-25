import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
let amountOfCores = 6;

class WorkerPool {
    constructor(size, workerFilePath) {
        this.size = size;
        this.workerFilePath = workerFilePath;
        this.workers = []
        this.activeWorkers = []
        this.idleWorkers = []

        for (let i=0;i<size;i++) {
            const worker = new Worker(workerFilePath)
            worker.id = i;
            this.workers.push(worker);
            this.idleWorkers.push(worker)
            
            worker.on('message', (message) => {
                if (message === 'End of activity') {
                    let workerIndex = this.activeWorkers.findIndex(activeWorker => worker.threadId == activeWorker.threadId)

                    if (workerIndex !== -1) {
                        let [worker] = this.activeWorkers.splice(workerIndex, 1)
                        this.idleWorkers.push(worker)

                    }             
                
              }});

        }
    }

    getIdleWorkers() {
        return this.idleWorkers;
    }

    getActiveWorkers() {
        return this.activeWorkers;
    }

    freeActiveWorker(worker) {
        const index = this.activeWorkers.findIndex(activeWorker => worker.threadId == activeWorker.threadId);
        if (index >= 0) {
            this.idleWorkers.push(activeWorker)
            this.activeWorkers.splice(index, 1)

        } else {
            console.log('No active workers atm.')

        }
        
    }
    assignTaskToIdleWorker(task) {
        
        
        if (this.idleWorkers.length > 0) {
            let selectedWorker = this.idleWorkers.shift()
            this.activeWorkers.push(selectedWorker)
            
            selectedWorker.postMessage({event: 'download', videoMetadata: task.data, targetId: task.targetId})
            console.log(`[assignTaskToIdleWorker] assigned task ${task.data.title} sending to previously idle worker ${selectedWorker.threadId}`)

        } else {
            console.log("[Worker Pool]:  No idle workers available. Trying again in 2.5 seconds.")
            setTimeout(() => { this.assignTaskToIdleWorker(task)}, 2500)

        }

}
}

class TasksQueue {
    constructor(batch, pool, targetId) {
        this.batch = batch;
        this.pool = pool;
        this.targetId = targetId;

    }
    sendTaskToPool() {
        return new Promise((resolve) => {
            if (this.pool.getIdleWorkers().length > 0) {
                let task = this.batch.shift();
                this.pool.assignTaskToIdleWorker({data: task, targetId: this.targetId});
                console.log(`[sendTaskToPool] assigned task ${task.title} to idle worker.`)
                resolve();
                
            } else {
                setTimeout(resolve, 3000);
            }
        });
    }

    async sendAllTasksToPool() {

        console.log(`[TasksQueue] sendAllTasksToPool executed with batch ${this.batch}`)
        console.log(this.batch.length)
        while (this.batch.length > 0) {
            await this.sendTaskToPool();

        }
    }

}

export default { WorkerPool, TasksQueue }

