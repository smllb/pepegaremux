import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

let amountOfCores = 6;

class WorkerPool {
    constructor(size, workerFile) {
        this.size = size;
        this.workerFile = workerFile;
        this.workers = []
        this.activeWorkers = []
        this.idleWorkers = []

        for (let i=0;i<size;i++) {
            const worker = new Worker(workerFile)
            worker.id = i;
            this.workers.push(worker);
            this.idleWorkers.push(worker)
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

    }


}

class TasksQueue {
    constructor(batch, pool) {
        this.batch = batch;
        this.pool = pool;

    }
    getFirstTaskInLine() {

    }
    sendTaskToPool(task) {
        task = this.getFirstTaskInLine()
        this.pool.assignTaskToIdleWorker(task)

    }
}

