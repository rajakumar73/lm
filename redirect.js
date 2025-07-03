async function fetchRedirectLists() {
  const [link1, link2, link3] = await Promise.all([
    fetch('data/link1.json').then(res => res.json()),
    fetch('data/link2.json').then(res => res.json()),
    fetch('data/link3.json').then(res => res.json())
  ]);

  return { link1, link2, link3 };
}

function getFileIdFromPath() {
  const match = window.location.pathname.match(/\/file\/(\d+)/);
  return match ? match[1] : null;
}

function redirectToHost(host, fileID) {
  window.location.replace(`https://${host}.moviehai.icu/file/${fileID}`);
}

function showMessage(msg) {
  document.querySelector('.container').innerHTML = `<h2>${msg}</h2>`;
}

fetchRedirectLists().then(({ link1, link2, link3 }) => {
  const fileID = getFileIdFromPath();

  if (!fileID) return showMessage("Invalid URL format.");

  if (link1.includes(fileID)) {
    redirectToHost("link1", fileID);
  } else if (link2.includes(fileID)) {
    redirectToHost("link2", fileID);
  } else if (link3.includes(fileID)) {
    redirectToHost("link3", fileID);
  } else {
    showMessage(`No redirect rule found for File ID: ${fileID}`);
  }
}).catch(err => {
  console.error("Error loading JSON data:", err);
  showMessage("Error loading redirection rules.");
});
