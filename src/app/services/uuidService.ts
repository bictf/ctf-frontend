function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getUuid(){
    const currentUuid = sessionStorage.getItem("uuid")

    if (currentUuid) return currentUuid;

    const newUuid = generateUuid()
    sessionStorage.setItem("uuid", newUuid)
    return newUuid
}
