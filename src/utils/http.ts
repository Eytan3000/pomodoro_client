

const url = 'http://localhost:8090/'

interface Task {
    content: string;
    id: number;
    status: 'active' | 'done';
}


export async function getActiveTasks(signal: AbortSignal, token:string) {
    const response = await fetch(url + 'tasks_active', { 
        signal,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // You may need to adjust this based on your API's requirements
        },
     });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        throw error;
    }
    const data = await response.json();
    return data;
}

export async function getDoneTasks() {
    try {
        const response = await fetch(url + 'tasks_done');
        const data = await response.json();
        return data;
    } catch (err) {
        return err;
    }

}

export async function createTask(content: { content: string }) {
    const response = await fetch(url + 'task_create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
    });
    const data = await response.json();
    return data;

}
export async function deleteTask(id: number) {

    const response = await fetch(url + 'task_delete/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        throw error;
    }
    // const data = await response.json();
    return response;
}

export async function editTask(object: { id: number, textContent: string }) {

    const content = { content: object.textContent };
    const id = object.id;

    const response = await fetch(url + 'task_edit/' + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content)
    });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        throw error;
    }

    return response;

}

export async function switchTaskStatus(object: { task: Task }) {
    const id = object.task.id;
    let response;

    if (object.task.status === 'active') {

        response = await fetch(url + 'task_status_toDone/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
    if (object.task.status === 'done') {

        response = await fetch(url + 'task_status_toActive/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
    if (!response?.ok) {
        const error = new Error('An error occurred while fetching the event');
        throw error;
    }

    return response;
}
// Auth ------------------------------------------------------

export async function insertNewUser(content: { email: string, password:string }) {
    
    const response = await fetch(url + 'users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
    });
    


    return response;
}

export async function login(content: { email: string, password:string }) {
    
    const response = await fetch(url + 'users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
    });
    
    return response;
}