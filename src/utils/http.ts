

// const url = 'http://localhost:8090/';
const url = import.meta.env.VITE_URL;

interface Task {
    content: string;
    id: number;
    status: 'active' | 'done';
}




export async function getActiveTasks(signal: AbortSignal, token: string, uid: string) {
console.log(token);

    const response = await fetch(url + 'tasks_active/' + uid, {
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

export async function getDoneTasks(token: string, uid: string) {
    try {
        const response = await fetch(url + 'tasks_done/' + uid, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // You may need to adjust this based on your API's requirements
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return err;
    }

}

export async function createTask(content: { content: string, token: string, uid: string }) {

    const response = await fetch(url + 'task_create', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${content.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content.content, uid: content.uid }),
    });
    const data = await response.json();
    return data;

}
export async function deleteTask(content: { id: number, token: string }) {

    const response = await fetch(url + 'task_delete/' + content.id, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${content.token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        throw error;
    }
    return response;
}

export async function editTask(object: { id: number, textContent: string, token: string }) {

    const content = { content: object.textContent };
    const id = object.id;
    const token = object.token;

    const response = await fetch(url + 'task_edit/' + id, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
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

export async function switchTaskStatus(object: { task: Task, token: string }) {
    const id = object.task.id;
    const token = object.token;
    let response;

    if (object.task.status === 'active') {

        response = await fetch(url + 'task_status_toDone/' + id, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
    }
    if (object.task.status === 'done') {

        response = await fetch(url + 'task_status_toActive/' + id, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
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

export async function insertNewUserIntoDb(uid: string, email: string, token: string) {
    const content = { uid, email };

    const response = await fetch(url + 'new-user', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
    });



    return response;
}
