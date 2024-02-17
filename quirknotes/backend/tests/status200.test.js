test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const getNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET"
  });

  const getNoteBody = await getNoteRes.json();

  expect(getNoteRes.status).toBe(200);
  expect(getNoteBody.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  for (let i = 0; i < 2; i++) {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  }

  const getNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET"
  });

  const getNoteBody = await getNoteRes.json();

  expect(getNoteRes.status).toBe(200);
  expect(getNoteBody.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const delNoteRes = await fetch(
    `${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  expect(delNoteRes.status).toBe(200);
});

test("/patchNote - Patch with content and title", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const patchNoteRes = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "title",
        content: "content",
      }),
    },
  );

  expect(patchNoteRes.status).toBe(200);
});

test("/patchNote - Patch with just title", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const patchNoteRes = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "title"
      }),
    },
  );

  expect(patchNoteRes.status).toBe(200);
});

test("/patchNote - Patch with just content", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const patchNoteRes = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "content",
      }),
    },
  );

  expect(patchNoteRes.status).toBe(200);
});

test("/deleteAllNotes - Delete one note", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const delNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const delNoteBody = await delNoteRes.json();
  expect(delNoteRes.status).toBe(200);
  expect(delNoteBody.response).toBe("1 note(s) deleted.");
});

test("/deleteAllNotes - Delete three notes", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  for (let i = 0; i < 3; i++) {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  }

  const delNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const delNoteBody = await delNoteRes.json();
  expect(delNoteRes.status).toBe(200);
  expect(delNoteBody.response).toBe("3 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const patchNoteRes = await fetch(
    `${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: "#FF0000",
      }),
    },
  );

  expect(patchNoteRes.status).toBe(200);
});