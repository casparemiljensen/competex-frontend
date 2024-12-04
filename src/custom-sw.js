self.addEventListener("sync", (event) => {
  if (event.tag === "sync-tasks") {
    console.log("Background sync triggered");
    event.waitUntil(syncPendingTasks());
  }
});

async function syncPendingTasks() {
  try {
    const syncTasks = await getSyncTasksFromIndexedDB();

    for (const task of syncTasks) {
      try {
        const response = await fetch(task.url, {
          method: "POST",
          body: JSON.stringify(task.body),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          console.log("Task synced successfully:", task);
          await removeTaskFromIndexedDB(task.id); // Use an ID to identify tasks
        } else {
          console.error("Task sync failed:", response.status, task);
        }
      } catch (err) {
        console.error("Error syncing task:", err);
      }
    }
  } catch (err) {
    console.error("Failed to process sync tasks:", err);
  }
}

// Function to get sync tasks from IndexedDB
function getSyncTasksFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("SyncTasksDB");

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

// Function to remove a synced task from IndexedDB
function removeTaskFromIndexedDB(taskId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("SyncTasksDB");

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

// Initialize IndexedDB when the service worker starts
initializeIndexedDB();

function initializeIndexedDB() {
  const request = indexedDB.open("SyncTasksDB", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("syncTasks")) {
      db.createObjectStore("syncTasks", { keyPath: "id", autoIncrement: true });
    }
  };

  request.onerror = () => {
    console.error("Failed to initialize IndexedDB");
  };
}
