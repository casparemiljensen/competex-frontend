self.addEventListener("fetch", (event) => {
  if (event.request.method === "POST") {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Request failed offline" }),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      })()
    );
  }
});

// Syncing tasks when network becomes available
async function syncPendingTasks() {
  console.log("Starting task synchronization...");

  try {
    const syncTasks = await getSyncTasksFromIndexedDB();
    console.log("Tasks retrieved for synchronization:", syncTasks);

    for (const task of syncTasks) {
      console.log("Syncing task:", task);

      try {
        const response = await fetch(task.url, {
          method: "POST",
          body: JSON.stringify(task.body),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          console.log("Task synced successfully:", task);
          await removeTaskFromIndexedDB(task.id);
        } else {
          console.error("Task sync failed:", response.status, task);
        }
      } catch (err) {
        console.error("Error syncing task:", task, err);
      }
    }
  } catch (err) {
    console.error("Failed to process sync tasks:", err);
  }
}

function getSyncTasksFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("SyncTasksDB", 3);

    request.onerror = () => {
      reject("Failed to open IndexedDB");
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("syncTasks", "readonly");
      const store = transaction.objectStore("syncTasks");
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };

      getAllRequest.onerror = () => {
        reject("Failed to retrieve tasks from IndexedDB");
      };
    };
  });
}

function removeTaskFromIndexedDB(taskId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("SyncTasksDB", 3);

    request.onerror = () => {
      reject("Failed to open IndexedDB");
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("syncTasks", "readwrite");
      const store = transaction.objectStore("syncTasks");
      const deleteRequest = store.delete(taskId);

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = () => {
        reject("Failed to remove task from IndexedDB");
      };
    };
  });
}

// Initialize IndexedDB
initializeIndexedDB();

function initializeIndexedDB() {
  const request = indexedDB.open("SyncTasksDB", 3);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("syncTasks")) {
      db.createObjectStore("syncTasks", { keyPath: "id", autoIncrement: true });
    }
  };

  request.onsuccess = () => {
    console.log("IndexedDB initialized successfully.");
  };

  request.onerror = () => {
    console.error("Failed to initialize IndexedDB.");
  };
}
