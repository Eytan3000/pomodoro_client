const url = 'http://localhost:8090/'


export async function getActiveTasks(signal: AbortSignal) {
    const response = await fetch(url + 'tasks_active', { signal, });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        // error.code = response.status;
        // error.info = await response.json();
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